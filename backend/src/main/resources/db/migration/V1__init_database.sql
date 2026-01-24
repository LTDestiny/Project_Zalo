-- ============================================
-- Zola Platform - Complete Database Schema
-- ============================================

-- ============================================
-- Users Table
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    avatar_url VARCHAR(500),
    status VARCHAR(20) DEFAULT 'OFFLINE',
    role VARCHAR(20) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_seen TIMESTAMP,
    -- Authentication enhancement fields
    email_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(500),
    verification_token_expiry TIMESTAMP,
    reset_token VARCHAR(500),
    reset_token_expiry TIMESTAMP,
    refresh_token VARCHAR(500),
    refresh_token_expiry TIMESTAMP,
    login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMP,
    CONSTRAINT chk_user_status CHECK (status IN ('ONLINE', 'OFFLINE', 'AWAY', 'DO_NOT_DISTURB')),
    CONSTRAINT chk_user_role CHECK (role IN ('USER', 'ADMIN'))
);

-- Users indexes for optimal query performance
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_users_phone_number ON users(phone_number);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_users_last_seen ON users(last_seen DESC);
-- Authentication indexes
CREATE INDEX IF NOT EXISTS idx_users_reset_token ON users(reset_token) WHERE reset_token IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_users_verification_token ON users(verification_token) WHERE verification_token IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_users_refresh_token ON users(refresh_token) WHERE refresh_token IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_users_locked_until ON users(locked_until) WHERE locked_until IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_users_email_verified ON users(email_verified);

-- ============================================
-- Friendships Table
-- ============================================
CREATE TABLE IF NOT EXISTS friendships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id_1 UUID NOT NULL,
    user_id_2 UUID NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id_1) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id_2) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_friendship_status CHECK (status IN ('PENDING', 'ACCEPTED', 'BLOCKED')),
    CONSTRAINT chk_different_users CHECK (user_id_1 != user_id_2),
    CONSTRAINT unique_friendship UNIQUE (user_id_1, user_id_2)
);

-- Friendships indexes for optimal query performance
CREATE INDEX IF NOT EXISTS idx_friendships_user1 ON friendships(user_id_1);
CREATE INDEX IF NOT EXISTS idx_friendships_user2 ON friendships(user_id_2);
CREATE INDEX IF NOT EXISTS idx_friendships_status ON friendships(status);
CREATE INDEX IF NOT EXISTS idx_friendships_created_at ON friendships(created_at DESC);
-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_friendships_user1_status ON friendships(user_id_1, status);
CREATE INDEX IF NOT EXISTS idx_friendships_user2_status ON friendships(user_id_2, status);

-- ============================================
-- User Activities Table
-- ============================================
CREATE TABLE IF NOT EXISTS user_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    type VARCHAR(50) NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_activity_type CHECK (type IN ('LOGIN', 'LOGOUT', 'MESSAGE_SENT', 'GROUP_CREATED', 'GROUP_JOINED'))
);

-- User Activities indexes for optimal query performance
CREATE INDEX IF NOT EXISTS idx_user_activities_user_id ON user_activities(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activities_created_at ON user_activities(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_activities_type ON user_activities(type);
-- Composite index for filtering by user and type
CREATE INDEX IF NOT EXISTS idx_user_activities_user_type ON user_activities(user_id, type, created_at DESC);
-- GIN index for JSONB metadata queries
CREATE INDEX IF NOT EXISTS idx_user_activities_metadata ON user_activities USING GIN(metadata);

-- ============================================
-- Groups Table
-- ============================================
CREATE TABLE IF NOT EXISTS groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    avatar_url VARCHAR(500),
    created_by UUID NOT NULL,
    type VARCHAR(20) DEFAULT 'PRIVATE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT chk_group_type CHECK (type IN ('PRIVATE', 'PUBLIC'))
);

-- Groups indexes for optimal query performance
CREATE INDEX IF NOT EXISTS idx_groups_created_by ON groups(created_by);
CREATE INDEX IF NOT EXISTS idx_groups_type ON groups(type);
CREATE INDEX IF NOT EXISTS idx_groups_name ON groups(name);
CREATE INDEX IF NOT EXISTS idx_groups_created_at ON groups(created_at DESC);
-- Text search index for group name and description
CREATE INDEX IF NOT EXISTS idx_groups_name_text ON groups USING GIN(to_tsvector('english', name));
CREATE INDEX IF NOT EXISTS idx_groups_description_text ON groups USING GIN(to_tsvector('english', COALESCE(description, '')));

-- ============================================
-- Group Members Table
-- ============================================
CREATE TABLE IF NOT EXISTS group_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    group_id UUID NOT NULL,
    user_id UUID NOT NULL,
    role VARCHAR(20) DEFAULT 'MEMBER',
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_read_at TIMESTAMP,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT unique_group_member UNIQUE(group_id, user_id),
    CONSTRAINT chk_member_role CHECK (role IN ('OWNER', 'ADMIN', 'MEMBER'))
);

-- Group Members indexes for optimal query performance
CREATE INDEX IF NOT EXISTS idx_group_members_group_id ON group_members(group_id);
CREATE INDEX IF NOT EXISTS idx_group_members_user_id ON group_members(user_id);
CREATE INDEX IF NOT EXISTS idx_group_members_role ON group_members(role);
CREATE INDEX IF NOT EXISTS idx_group_members_joined_at ON group_members(joined_at DESC);
CREATE INDEX IF NOT EXISTS idx_group_members_last_read_at ON group_members(last_read_at DESC);
-- Composite indexes for common queries
CREATE INDEX IF NOT EXISTS idx_group_members_group_role ON group_members(group_id, role);
CREATE INDEX IF NOT EXISTS idx_group_members_user_joined ON group_members(user_id, joined_at DESC);
