-- ============================================
-- Enhanced Sample Data for Zola Platform
-- This file will only run once on first startup
-- ============================================

-- Insert 20 sample users with bcrypt hashed passwords (password: "password123")
-- All users are email verified for testing purposes
INSERT INTO users (id, username, email, password_hash, phone_number, status, role, avatar_url, email_verified, login_attempts) VALUES
-- Active users (ONLINE)
('550e8400-e29b-41d4-a716-446655440001', 'john_doe', 'john.doe@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234567', 'ONLINE', 'USER', 'https://i.pravatar.cc/150?img=1', TRUE, 0),
('550e8400-e29b-41d4-a716-446655440002', 'jane_smith', 'jane.smith@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234568', 'ONLINE', 'USER', 'https://i.pravatar.cc/150?img=2', TRUE, 0),
('550e8400-e29b-41d4-a716-446655440006', 'charlie_davis', 'charlie.davis@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234572', 'ONLINE', 'USER', 'https://i.pravatar.cc/150?img=6', TRUE, 0),
('550e8400-e29b-41d4-a716-446655440009', 'grace_lee', 'grace.lee@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234575', 'ONLINE', 'USER', 'https://i.pravatar.cc/150?img=9', TRUE, 0),
('550e8400-e29b-41d4-a716-446655440011', 'ivan_petrov', 'ivan.petrov@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234577', 'ONLINE', 'USER', 'https://i.pravatar.cc/150?img=11', TRUE, 0),
('550e8400-e29b-41d4-a716-446655440012', 'julia_kim', 'julia.kim@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234578', 'ONLINE', 'USER', 'https://i.pravatar.cc/150?img=12', TRUE, 0),
-- Admin user
('550e8400-e29b-41d4-a716-446655440005', 'admin_user', 'admin@zola.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234571', 'ONLINE', 'ADMIN', 'https://i.pravatar.cc/150?img=5', TRUE, 0),
-- Away users
('550e8400-e29b-41d4-a716-446655440003', 'bob_wilson', 'bob.wilson@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234569', 'AWAY', 'USER', 'https://i.pravatar.cc/150?img=3', TRUE, 0),
('550e8400-e29b-41d4-a716-446655440010', 'henry_nguyen', 'henry.nguyen@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234576', 'AWAY', 'USER', 'https://i.pravatar.cc/150?img=10', TRUE, 0),
('550e8400-e29b-41d4-a716-446655440015', 'oliver_chen', 'oliver.chen@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234581', 'AWAY', 'USER', 'https://i.pravatar.cc/150?img=15', TRUE, 0),
-- Do Not Disturb users
('550e8400-e29b-41d4-a716-446655440007', 'diana_evans', 'diana.evans@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234573', 'DO_NOT_DISTURB', 'USER', 'https://i.pravatar.cc/150?img=7', TRUE, 0),
('550e8400-e29b-41d4-a716-446655440013', 'kevin_tran', 'kevin.tran@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234579', 'DO_NOT_DISTURB', 'USER', 'https://i.pravatar.cc/150?img=13', TRUE, 0),
-- Offline users
('550e8400-e29b-41d4-a716-446655440004', 'alice_brown', 'alice.brown@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234570', 'OFFLINE', 'USER', 'https://i.pravatar.cc/150?img=4', TRUE, 0),
('550e8400-e29b-41d4-a716-446655440008', 'frank_miller', 'frank.miller@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234574', 'OFFLINE', 'USER', 'https://i.pravatar.cc/150?img=8', TRUE, 0),
('550e8400-e29b-41d4-a716-446655440014', 'lisa_wang', 'lisa.wang@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234580', 'OFFLINE', 'USER', 'https://i.pravatar.cc/150?img=14', TRUE, 0),
('550e8400-e29b-41d4-a716-446655440016', 'peter_garcia', 'peter.garcia@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234582', 'OFFLINE', 'USER', 'https://i.pravatar.cc/150?img=16', TRUE, 0),
('550e8400-e29b-41d4-a716-446655440017', 'quinn_lopez', 'quinn.lopez@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234583', 'OFFLINE', 'USER', 'https://i.pravatar.cc/150?img=17', TRUE, 0),
('550e8400-e29b-41d4-a716-446655440018', 'rachel_martinez', 'rachel.martinez@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234584', 'OFFLINE', 'USER', 'https://i.pravatar.cc/150?img=18', TRUE, 0),
('550e8400-e29b-41d4-a716-446655440019', 'steven_rodriguez', 'steven.rodriguez@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234585', 'OFFLINE', 'USER', 'https://i.pravatar.cc/150?img=19', TRUE, 0),
('550e8400-e29b-41d4-a716-446655440020', 'tina_anderson', 'tina.anderson@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', '+84901234586', 'OFFLINE', 'USER', 'https://i.pravatar.cc/150?img=20', TRUE, 0);

-- Insert extensive friendships network
INSERT INTO friendships (user_id_1, user_id_2, status) VALUES
-- John's friends (ACCEPTED)
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440006', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440009', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440011', 'ACCEPTED'),
-- Jane's friends (ACCEPTED)
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440007', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440012', 'ACCEPTED'),
-- Bob's friends (ACCEPTED)
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440007', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440010', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440013', 'ACCEPTED'),
-- Charlie's friends (ACCEPTED)
('550e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440009', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440011', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440015', 'ACCEPTED'),
-- More connections (ACCEPTED)
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440008', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440012', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440014', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440011', '550e8400-e29b-41d4-a716-446655440016', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440012', '550e8400-e29b-41d4-a716-446655440017', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440013', '550e8400-e29b-41d4-a716-446655440018', 'ACCEPTED'),
('550e8400-e29b-41d4-a716-446655440015', '550e8400-e29b-41d4-a716-446655440019', 'ACCEPTED'),
-- Pending friend requests
('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005', 'PENDING'),
('550e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440009', 'PENDING'),
('550e8400-e29b-41d4-a716-446655440014', '550e8400-e29b-41d4-a716-446655440015', 'PENDING'),
('550e8400-e29b-41d4-a716-446655440016', '550e8400-e29b-41d4-a716-446655440017', 'PENDING'),
('550e8400-e29b-41d4-a716-446655440018', '550e8400-e29b-41d4-a716-446655440020', 'PENDING'),
-- Blocked relationships
('550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440020', 'BLOCKED');

-- Insert diverse groups
INSERT INTO groups (id, name, description, created_by, type, avatar_url) VALUES
('650e8400-e29b-41d4-a716-446655440001', 'Project Team', 'Discussion group for our main project', '550e8400-e29b-41d4-a716-446655440001', 'PRIVATE', 'https://ui-avatars.com/api/?name=Project+Team&background=4F46E5&color=fff'),
('650e8400-e29b-41d4-a716-446655440002', 'Coffee Lovers', 'For all coffee enthusiasts', '550e8400-e29b-41d4-a716-446655440002', 'PUBLIC', 'https://ui-avatars.com/api/?name=Coffee+Lovers&background=10B981&color=fff'),
('650e8400-e29b-41d4-a716-446655440003', 'Tech Discussion', 'Latest tech trends and news', '550e8400-e29b-41d4-a716-446655440005', 'PUBLIC', 'https://ui-avatars.com/api/?name=Tech+Discussion&background=F59E0B&color=fff'),
('650e8400-e29b-41d4-a716-446655440004', 'Gaming Squad', 'Gaming friends group', '550e8400-e29b-41d4-a716-446655440006', 'PRIVATE', 'https://ui-avatars.com/api/?name=Gaming+Squad&background=EF4444&color=fff'),
('650e8400-e29b-41d4-a716-446655440005', 'Study Group', 'Academic discussion and help', '550e8400-e29b-41d4-a716-446655440003', 'PRIVATE', 'https://ui-avatars.com/api/?name=Study+Group&background=8B5CF6&color=fff'),
('650e8400-e29b-41d4-a716-446655440006', 'Fitness Enthusiasts', 'Health and fitness tips', '550e8400-e29b-41d4-a716-446655440011', 'PUBLIC', 'https://ui-avatars.com/api/?name=Fitness+Enthusiasts&background=EC4899&color=fff'),
('650e8400-e29b-41d4-a716-446655440007', 'Book Club', 'Monthly book discussions', '550e8400-e29b-41d4-a716-446655440007', 'PUBLIC', 'https://ui-avatars.com/api/?name=Book+Club&background=14B8A6&color=fff'),
('650e8400-e29b-41d4-a716-446655440008', 'Movie Night', 'Plan movie nights together', '550e8400-e29b-41d4-a716-446655440012', 'PRIVATE', 'https://ui-avatars.com/api/?name=Movie+Night&background=F97316&color=fff'),
('650e8400-e29b-41d4-a716-446655440009', 'Travel Buddies', 'Share travel experiences', '550e8400-e29b-41d4-a716-446655440015', 'PUBLIC', 'https://ui-avatars.com/api/?name=Travel+Buddies&background=06B6D4&color=fff'),
('650e8400-e29b-41d4-a716-446655440010', 'Music Lovers', 'Discover and share music', '550e8400-e29b-41d4-a716-446655440009', 'PUBLIC', 'https://ui-avatars.com/api/?name=Music+Lovers&background=A855F7&color=fff');

-- Insert group members with diverse roles
INSERT INTO group_members (group_id, user_id, role) VALUES
-- Project Team (5 members)
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'OWNER'),
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'ADMIN'),
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440006', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440011', 'MEMBER'),
-- Coffee Lovers (6 members)
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'OWNER'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440004', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440007', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440009', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440012', 'ADMIN'),
('650e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440014', 'MEMBER'),
-- Tech Discussion (8 members)
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440005', 'OWNER'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'ADMIN'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440008', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440010', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440013', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440016', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440019', 'MEMBER'),
-- Gaming Squad (4 members)
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440006', 'OWNER'),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440009', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440015', 'ADMIN'),
-- Study Group (5 members)
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440003', 'OWNER'),
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440002', 'ADMIN'),
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440004', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440010', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440017', 'MEMBER'),
-- Fitness Enthusiasts (7 members)
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440011', 'OWNER'),
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440001', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440006', 'ADMIN'),
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440012', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440015', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440018', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440020', 'MEMBER'),
-- Book Club (6 members)
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440007', 'OWNER'),
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440004', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440013', 'ADMIN'),
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440016', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440019', 'MEMBER'),
-- Movie Night (5 members)
('650e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440012', 'OWNER'),
('650e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440007', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440009', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440014', 'ADMIN'),
('650e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440017', 'MEMBER'),
-- Travel Buddies (8 members)
('650e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440015', 'OWNER'),
('650e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440003', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440006', 'ADMIN'),
('650e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440010', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440011', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440013', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440018', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440020', 'MEMBER'),
-- Music Lovers (9 members)
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440009', 'OWNER'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440001', 'ADMIN'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440008', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440011', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440014', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440016', 'ADMIN'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440019', 'MEMBER'),
('650e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440020', 'MEMBER');

-- Insert diverse user activities
INSERT INTO user_activities (user_id, type, metadata) VALUES
-- Recent logins
('550e8400-e29b-41d4-a716-446655440001', 'LOGIN', '{"ip": "192.168.1.100", "device": "Chrome on Windows", "location": "Hanoi"}'),
('550e8400-e29b-41d4-a716-446655440002', 'LOGIN', '{"ip": "192.168.1.101", "device": "Safari on MacOS", "location": "Ho Chi Minh City"}'),
('550e8400-e29b-41d4-a716-446655440006', 'LOGIN', '{"ip": "192.168.1.102", "device": "Firefox on Linux", "location": "Da Nang"}'),
('550e8400-e29b-41d4-a716-446655440009', 'LOGIN', '{"ip": "192.168.1.103", "device": "Edge on Windows", "location": "Hanoi"}'),
('550e8400-e29b-41d4-a716-446655440011', 'LOGIN', '{"ip": "192.168.1.104", "device": "Chrome on Android", "location": "Can Tho"}'),
('550e8400-e29b-41d4-a716-446655440012', 'LOGIN', '{"ip": "192.168.1.105", "device": "Safari on iOS", "location": "Hue"}'),
-- Group activities
('550e8400-e29b-41d4-a716-446655440001', 'GROUP_CREATED', '{"group_id": "650e8400-e29b-41d4-a716-446655440001", "group_name": "Project Team"}'),
('550e8400-e29b-41d4-a716-446655440002', 'GROUP_CREATED', '{"group_id": "650e8400-e29b-41d4-a716-446655440002", "group_name": "Coffee Lovers"}'),
('550e8400-e29b-41d4-a716-446655440003', 'GROUP_JOINED', '{"group_id": "650e8400-e29b-41d4-a716-446655440001", "group_name": "Project Team"}'),
('550e8400-e29b-41d4-a716-446655440006', 'GROUP_JOINED', '{"group_id": "650e8400-e29b-41d4-a716-446655440001", "group_name": "Project Team"}'),
('550e8400-e29b-41d4-a716-446655440011', 'GROUP_CREATED', '{"group_id": "650e8400-e29b-41d4-a716-446655440006", "group_name": "Fitness Enthusiasts"}'),
('550e8400-e29b-41d4-a716-446655440015', 'GROUP_CREATED', '{"group_id": "650e8400-e29b-41d4-a716-446655440009", "group_name": "Travel Buddies"}'),
-- Message activities
('550e8400-e29b-41d4-a716-446655440001', 'MESSAGE_SENT', '{"recipient_id": "550e8400-e29b-41d4-a716-446655440002", "message_type": "text"}'),
('550e8400-e29b-41d4-a716-446655440002', 'MESSAGE_SENT', '{"recipient_id": "550e8400-e29b-41d4-a716-446655440001", "message_type": "text"}'),
('550e8400-e29b-41d4-a716-446655440006', 'MESSAGE_SENT', '{"group_id": "650e8400-e29b-41d4-a716-446655440001", "message_type": "text"}'),
('550e8400-e29b-41d4-a716-446655440009', 'MESSAGE_SENT', '{"recipient_id": "550e8400-e29b-41d4-a716-446655440001", "message_type": "image"}'),
('550e8400-e29b-41d4-a716-446655440012', 'MESSAGE_SENT', '{"group_id": "650e8400-e29b-41d4-a716-446655440002", "message_type": "text"}'),
-- Logout activities
('550e8400-e29b-41d4-a716-446655440004', 'LOGOUT', '{"device": "Chrome on Windows"}'),
('550e8400-e29b-41d4-a716-446655440008', 'LOGOUT', '{"device": "Safari on MacOS"}'),
('550e8400-e29b-41d4-a716-446655440014', 'LOGOUT', '{"device": "Firefox on Windows"}');

-- Note: Messages are stored in DynamoDB, so we don't insert them here
-- Note: Statistics are stored in DynamoDB, so we don't insert them here

COMMIT;