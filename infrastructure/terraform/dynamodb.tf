# DynamoDB Tables for OTT Platform

resource "aws_dynamodb_table" "messages" {
  name           = "${var.project_name}-messages-${var.environment}"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "message_id"
  range_key      = "conversation_id"

  attribute {
    name = "message_id"
    type = "S"
  }

  attribute {
    name = "conversation_id"
    type = "S"
  }

  attribute {
    name = "sender_id"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "N"
  }

  global_secondary_index {
    name            = "conversation-timestamp-index"
    hash_key        = "conversation_id"
    range_key       = "timestamp"
    projection_type = "ALL"
  }

  global_secondary_index {
    name            = "sender-timestamp-index"
    hash_key        = "sender_id"
    range_key       = "timestamp"
    projection_type = "ALL"
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = {
    Name        = "${var.project_name}-messages"
    Environment = var.environment
  }
}

resource "aws_dynamodb_table" "conversations" {
  name         = "${var.project_name}-conversations-${var.environment}"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "conversation_id"
  range_key    = "type"

  attribute {
    name = "conversation_id"
    type = "S"
  }

  attribute {
    name = "type"
    type = "S"
  }

  point_in_time_recovery {
    enabled = true
  }

  tags = {
    Name        = "${var.project_name}-conversations"
    Environment = var.environment
  }
}

resource "aws_dynamodb_table" "chatbot_sessions" {
  name         = "${var.project_name}-chatbot-sessions-${var.environment}"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "session_id"

  attribute {
    name = "session_id"
    type = "S"
  }

  attribute {
    name = "user_id"
    type = "S"
  }

  attribute {
    name = "created_at"
    type = "N"
  }

  global_secondary_index {
    name            = "user-created-index"
    hash_key        = "user_id"
    range_key       = "created_at"
    projection_type = "ALL"
  }

  ttl {
    attribute_name = "expires_at"
    enabled        = true
  }

  tags = {
    Name        = "${var.project_name}-chatbot-sessions"
    Environment = var.environment
  }
}

resource "aws_dynamodb_table" "user_statistics" {
  name         = "${var.project_name}-user-statistics-${var.environment}"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "user_id"
  range_key    = "period"

  attribute {
    name = "user_id"
    type = "S"
  }

  attribute {
    name = "period"
    type = "S"
  }

  tags = {
    Name        = "${var.project_name}-user-statistics"
    Environment = var.environment
  }
}

resource "aws_dynamodb_table" "notification_queue" {
  name         = "${var.project_name}-notifications-${var.environment}"
  billing_mode = "PAY_PER_REQUEST"
  hash_key     = "notification_id"

  attribute {
    name = "notification_id"
    type = "S"
  }

  attribute {
    name = "user_id"
    type = "S"
  }

  attribute {
    name = "created_at"
    type = "N"
  }

  global_secondary_index {
    name            = "user-created-index"
    hash_key        = "user_id"
    range_key       = "created_at"
    projection_type = "ALL"
  }

  ttl {
    attribute_name = "ttl"
    enabled        = true
  }

  tags = {
    Name        = "${var.project_name}-notifications"
    Environment = var.environment
  }
}

variable "project_name" {
  type = string
}

variable "environment" {
  type = string
}
