-- Add authentication enhancement columns to users table

ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token VARCHAR(500);
ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token_expiry TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token VARCHAR(500);
ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token_expiry TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS refresh_token VARCHAR(500);
ALTER TABLE users ADD COLUMN IF NOT EXISTS refresh_token_expiry TIMESTAMP;
ALTER TABLE users ADD COLUMN IF NOT EXISTS login_attempts INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN IF NOT EXISTS locked_until TIMESTAMP;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_reset_token ON users(reset_token);
CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verification_token);
CREATE INDEX IF NOT EXISTS idx_users_refresh_token ON users(refresh_token);
CREATE INDEX IF NOT EXISTS idx_users_locked_until ON users(locked_until);

-- Update existing users to have default values
UPDATE users SET email_verified = FALSE WHERE email_verified IS NULL;
UPDATE users SET login_attempts = 0 WHERE login_attempts IS NULL;
