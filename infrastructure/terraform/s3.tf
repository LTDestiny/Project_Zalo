# S3 Buckets for Zola Platform Microservices

locals {
  s3_buckets = {
    avatars = {
      name        = "${var.project_name}-avatars-${var.environment}"
      versioning  = true
      lifecycle_days = 365
      purpose     = "User and group avatars"
    }
    messages = {
      name        = "${var.project_name}-messages-${var.environment}"
      versioning  = false
      lifecycle_days = 90
      purpose     = "Message attachments (images, videos, documents)"
    }
    shared_files = {
      name        = "${var.project_name}-shared-files-${var.environment}"
      versioning  = true
      lifecycle_days = null
      purpose     = "Group shared files"
    }
    analytics = {
      name        = "${var.project_name}-analytics-${var.environment}"
      versioning  = false
      lifecycle_days = 30
      purpose     = "Analytics data and reports"
    }
    backups = {
      name        = "${var.project_name}-backups-${var.environment}"
      versioning  = true
      lifecycle_days = 90
      purpose     = "Database and media backups"
    }
  }
}

# S3 Buckets
resource "aws_s3_bucket" "storage_buckets" {
  for_each = local.s3_buckets
  
  bucket = each.value.name
  
  tags = {
    Name        = each.value.name
    Environment = var.environment
    Purpose     = each.value.purpose
    ManagedBy   = "Terraform"
  }
}

# Enable versioning for selected buckets
resource "aws_s3_bucket_versioning" "bucket_versioning" {
  for_each = { for k, v in local.s3_buckets : k => v if v.versioning }
  
  bucket = aws_s3_bucket.storage_buckets[each.key].id
  
  versioning_configuration {
    status = "Enabled"
  }
}

# Server-side encryption
resource "aws_s3_bucket_server_side_encryption_configuration" "bucket_encryption" {
  for_each = local.s3_buckets
  
  bucket = aws_s3_bucket.storage_buckets[each.key].id
  
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
    bucket_key_enabled = true
  }
}

# Block public access
resource "aws_s3_bucket_public_access_block" "bucket_public_access_block" {
  for_each = local.s3_buckets
  
  bucket = aws_s3_bucket.storage_buckets[each.key].id
  
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Lifecycle rules
resource "aws_s3_bucket_lifecycle_configuration" "bucket_lifecycle" {
  for_each = { for k, v in local.s3_buckets : k => v if v.lifecycle_days != null }
  
  bucket = aws_s3_bucket.storage_buckets[each.key].id
  
  rule {
    id     = "transition-to-ia"
    status = "Enabled"
    
    transition {
      days          = each.value.lifecycle_days
      storage_class = "STANDARD_IA"
    }
    
    transition {
      days          = each.value.lifecycle_days + 90
      storage_class = "GLACIER"
    }
  }
  
  # Delete old versions after 90 days (if versioning enabled)
  dynamic "noncurrent_version_transition" {
    for_each = each.value.versioning ? [1] : []
    content {
      noncurrent_days = 30
      storage_class   = "GLACIER"
    }
  }
  
  dynamic "noncurrent_version_expiration" {
    for_each = each.value.versioning ? [1] : []
    content {
      noncurrent_days = 90
    }
  }
}

# CORS configuration for avatars and messages buckets
resource "aws_s3_bucket_cors_configuration" "bucket_cors" {
  for_each = toset(["avatars", "messages", "shared_files"])
  
  bucket = aws_s3_bucket.storage_buckets[each.key].id
  
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD", "PUT", "POST"]
    allowed_origins = [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://*.zola-platform.com"
    ]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

# IAM policy for media service to access S3
resource "aws_iam_policy" "media_service_s3_policy" {
  name        = "${var.project_name}-media-service-s3-policy"
  description = "Policy for Media Service to access S3 buckets"
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:PutObject",
          "s3:DeleteObject",
          "s3:ListBucket"
        ]
        Resource = [
          for bucket in local.s3_buckets : 
          "${aws_s3_bucket.storage_buckets[bucket.name].arn}/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "s3:ListBucket"
        ]
        Resource = [
          for bucket in local.s3_buckets : 
          aws_s3_bucket.storage_buckets[bucket.name].arn
        ]
      }
    ]
  })
}

# IAM role for Media Service
resource "aws_iam_role" "media_service_role" {
  name = "${var.project_name}-media-service-role"
  
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      },
      {
        Effect = "Allow"
        Principal = {
          Service = "ecs-tasks.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })
}

# Attach policy to role
resource "aws_iam_role_policy_attachment" "media_service_s3_policy_attachment" {
  role       = aws_iam_role.media_service_role.name
  policy_arn = aws_iam_policy.media_service_s3_policy.arn
}

# CloudFront distribution for avatars
resource "aws_cloudfront_origin_access_identity" "avatars_oai" {
  comment = "OAI for avatars bucket"
}

resource "aws_cloudfront_distribution" "avatars_cdn" {
  enabled             = true
  is_ipv6_enabled     = true
  comment             = "CDN for user and group avatars"
  default_root_object = "index.html"
  
  origin {
    domain_name = aws_s3_bucket.storage_buckets["avatars"].bucket_regional_domain_name
    origin_id   = "S3-${local.s3_buckets.avatars.name}"
    
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.avatars_oai.cloudfront_access_identity_path
    }
  }
  
  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "S3-${local.s3_buckets.avatars.name}"
    
    forwarded_values {
      query_string = false
      cookies {
        forward = "none"
      }
    }
    
    viewer_protocol_policy = "redirect-to-https"
    min_ttl                = 0
    default_ttl            = 86400   # 24 hours
    max_ttl                = 604800  # 7 days
    compress               = true
  }
  
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  
  viewer_certificate {
    cloudfront_default_certificate = true
  }
  
  tags = {
    Name        = "${var.project_name}-avatars-cdn"
    Environment = var.environment
  }
}

# S3 bucket policy to allow CloudFront access
resource "aws_s3_bucket_policy" "avatars_cloudfront_policy" {
  bucket = aws_s3_bucket.storage_buckets["avatars"].id
  
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "CloudFrontReadGetObject"
        Effect = "Allow"
        Principal = {
          AWS = aws_cloudfront_origin_access_identity.avatars_oai.iam_arn
        }
        Action   = "s3:GetObject"
        Resource = "${aws_s3_bucket.storage_buckets["avatars"].arn}/*"
      }
    ]
  })
}

# Outputs
output "s3_bucket_names" {
  description = "Names of all S3 buckets"
  value       = { for k, v in aws_s3_bucket.storage_buckets : k => v.id }
}

output "s3_bucket_arns" {
  description = "ARNs of all S3 buckets"
  value       = { for k, v in aws_s3_bucket.storage_buckets : k => v.arn }
}

output "cloudfront_domain_name" {
  description = "CloudFront domain name for avatars"
  value       = aws_cloudfront_distribution.avatars_cdn.domain_name
}

output "media_service_role_arn" {
  description = "IAM role ARN for Media Service"
  value       = aws_iam_role.media_service_role.arn
}
