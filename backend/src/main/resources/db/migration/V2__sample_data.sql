-- ============================================
-- Sample Data for Zola Platform
-- This file will only run once on first startup
-- ============================================

-- Insert sample users with bcrypt hashed passwords (password: "password123")
INSERT INTO users (id, username, email, password_hash, phone_number, status, role, avatar_url) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'john_doe', 'john.doe@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234567', 'ONLINE', 'USER', 'https://i.pravatar.cc/150?img=1'),
('550e8400-e29b-41d4-a716-446655440002', 'jane_smith', 'jane.smith@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234568', 'ONLINE', 'USER', 'https://i.pravatar.cc/150?img=2'),
('550e8400-e29b-41d4-a716-446655440003', 'bob_wilson', 'bob.wilson@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234569', 'AWAY', 'USER', 'https://i.pravatar.cc/150?img=3'),
('550e8400-e29b-41d4-a716-446655440004', 'alice_brown', 'alice.brown@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234570', 'OFFLINE', 'USER', 'https://i.pravatar.cc/150?img=4'),
('550e8400-e29b-41d4-a716-446655440005', 'admin_user', 'admin@zola.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234571', 'ONLINE', 'ADMIN', 'https://i.pravatar.cc/150?img=5'),
('550e8400-e29b-41d4-a716-446655440006', 'charlie_davis', 'charlie.davis@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234572', 'ONLINE', 'USER', 'https://i.pravatar.cc/150?img=6'),
('550e8400-e29b-41d4-a716-446655440007', 'diana_evans', 'diana.evans@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234573', 'DO_NOT_DISTURB', 'USER', 'https://i.pravatar.cc/150?img=7'),
('550e8400-e29b-41d4-a716-446655440008', 'frank_miller', 'frank.miller@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234574', 'OFFLINE', 'USER', 'https://i.pravatar.cc/150?img=8'),
('550e8400-e29b-41d4-a716-446655440009', 'grace_lee', 'grace.lee@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234575', 'ONLINE', 'USER', 'https://i.pravatar.cc/150?img=9'),
('550e8400-e29b-41d4-a716-446655440010', 'henry_nguyen', 'henry.nguyen@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234576', 'AWAY', 'USER', 'https://i.pravatar.cc/150?img=10');

-- Insert sample friendships
INSERT INTO friendships (user_id_1, user_id_2, status) VALUES
-- Accepted friendships
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440006', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440007', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440009', 'ACCEPTED'),
-- Pending friendships
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005', 'PENDING'),
('550e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440009', 'PENDING');

-- Insert sample groups
INSERT INTO groups (id, name, description, created_by, type, avatar_url) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'Project Team', 'Discussion group for our main project', '550e8400-e29b-41d4-a716-446655440001', 'PRIVATE', 'https://ui-avatars.com/api/?name=Project+Team&background=4F46E5&color=fff'),
('650e8400-e29b-41d4-a716-446655440002', 'Coffee Lovers', 'For all coffee enthusiasts', '550e8400-e29b-41d4-a716-446655440002', 'PUBLIC', 'https://ui-avatars.com/api/?name=Coffee+Lovers&background=10B981&color=fff'),
('650e8400-e29b-41d4-a716-446655440003', 'Tech Discussion', 'Latest tech trends and news', '550e8400-e29b-41d4-a716-446655440005', 'PUBLIC', 'https://ui-avatars.com/api/?name=Tech+Discussion&background=F59E0B&color=fff'),
('650e8400-e29b-41d4-a716-446655440004', 'Gaming Squad', 'Gaming friends group', '550e8400-e29b-41d4-a716-446655440006', 'PRIVATE', 'https://ui-avatars.com/api/?name=Gaming+Squad&background=EF4444&color=fff'),
('650e8400-e29b-41d4-a716-446655440005', 'Study Group', 'Academic discussion and help', '550e8400-e29b-41d4-a716-446655440003', 'PRIVATE', 'https://ui-avatars.com/api/?name=Study+Group&background=8B5CF6&color=fff');

-- Insert group members
INSERT INTO group_members (group_id, user_id, role) VALUES
-- Project Team members
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'OWNER'),
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'ADMIN'),
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440006', 'MEMBER'),
-- Coffee Lovers members
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'OWNER'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440007', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440009', 'MEMBER'),
-- Tech Discussion members
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440005', 'OWNER'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440008', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440010', 'MEMBER'),
-- Gaming Squad members
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440006', 'OWNER'),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440009', 'MEMBER'),
-- Study Group members
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003', 'OWNER'),
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'ADMIN'),
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440004', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440010', 'MEMBER');

-- Insert sample user activities
INSERT INTO user_activities (user_id, type, metadata) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'LOGIN', '{"ip": "192.168.1.100", "device": "Chrome on Windows"}'),
('550e8400-e29b-41d4-a716-446655440002', 'LOGIN', '{"ip": "192.168.1.101", "device": "Safari on MacOS"}'),
('550e8400-e29b-41d4-a716-446655440001', 'GROUP_CREATED', '{"group_id": "650e8400-e29b-41d4-a716-446655440001", "group_name": "Project Team"}'),
('550e8400-e29b-41d4-a716-446655440003', 'GROUP_JOINED', '{"group_id": "650e8400-e29b-41d4-a716-446655440001", "group_name": "Project Team"}'),
('550e8400-e29b-41d4-a716-446655440001', 'MESSAGE_SENT', '{"recipient_id": "550e8400-e29b-41d4-a716-446655440002", "message_type": "text"}');

-- Note: Messages are stored in DynamoDB, so we don't insert them here
-- Note: Statistics are stored in DynamoDB, so we don't insert them here

COMMIT;