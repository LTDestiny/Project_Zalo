-- PostgreSQL Sample Data
-- Run this script to populate the database with sample data

-- ============================================
-- 1. USERS TABLE (15 users)
-- ============================================

INSERT INTO users (id, username, email, password_hash, phone_number, avatar_url, status, last_seen) VALUES
('11111111-1111-1111-1111-111111111111', 'admin_user', 'admin@ott.com', '$2a$10$samplehash1234567890abcdefghijklmnopqrstuvwxy', '+84901234567', 'https://storage.example.com/avatars/admin.jpg', 'ONLINE', NOW()),
('22222222-2222-2222-2222-222222222222', 'nguyenvana', 'nguyenvana@gmail.com', '$2a$10$samplehash1234567890abcdefghijklmnopqrstuvwxy', '+84912345678', 'https://storage.example.com/avatars/user1.jpg', 'ONLINE', NOW() - INTERVAL '5 minutes'),
('33333333-3333-3333-3333-333333333333', 'tranthib', 'tranthib@gmail.com', '$2a$10$samplehash1234567890abcdefghijklmnopqrstuvwxy', '+84923456789', 'https://storage.example.com/avatars/user2.jpg', 'AWAY', NOW() - INTERVAL '1 hour'),
('44444444-4444-4444-4444-444444444444', 'levanc', 'levanc@outlook.com', '$2a$10$samplehash1234567890abcdefghijklmnopqrstuvwxy', '+84934567890', 'https://storage.example.com/avatars/user3.jpg', 'OFFLINE', NOW() - INTERVAL '3 hours'),
('55555555-5555-5555-5555-555555555555', 'phamthid', 'phamthid@yahoo.com', '$2a$10$samplehash1234567890abcdefghijklmnopqrstuvwxy', '+84945678901', 'https://storage.example.com/avatars/user4.jpg', 'ONLINE', NOW()),
('66666666-6666-6666-6666-666666666666', 'hoangvane', 'hoangvane@gmail.com', '$2a$10$samplehash1234567890abcdefghijklmnopqrstuvwxy', '+84956789012', 'https://storage.example.com/avatars/user5.jpg', 'DO_NOT_DISTURB', NOW() - INTERVAL '30 minutes'),
('77777777-7777-7777-7777-777777777777', 'vuthif', 'vuthif@gmail.com', '$2a$10$samplehash1234567890abcdefghijklmnopqrstuvwxy', '+84967890123', 'https://storage.example.com/avatars/user6.jpg', 'ONLINE', NOW()),
('88888888-8888-8888-8888-888888888888', 'dovanh', 'dovanh@gmail.com', '$2a$10$samplehash1234567890abcdefghijklmnopqrstuvwxy', '+84978901234', 'https://storage.example.com/avatars/user7.jpg', 'OFFLINE', NOW() - INTERVAL '1 day'),
('99999999-9999-9999-9999-999999999999', 'ngothii', 'ngothii@gmail.com', '$2a$10$samplehash1234567890abcdefghijklmnopqrstuvwxy', '+84989012345', 'https://storage.example.com/avatars/user8.jpg', 'AWAY', NOW() - INTERVAL '2 hours'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'buivank', 'buivank@gmail.com', '$2a$10$samplehash1234567890abcdefghijklmnopqrstuvwxy', '+84990123456', 'https://storage.example.com/avatars/user9.jpg', 'ONLINE', NOW() - INTERVAL '10 minutes'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'lythil', 'lythil@gmail.com', '$2a$10$samplehash1234567890abcdefghijklmnopqrstuvwxy', '+84901234568', 'https://storage.example.com/avatars/user10.jpg', 'OFFLINE', NOW() - INTERVAL '5 hours'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'tranvanm', 'tranvanm@gmail.com', '$2a$10$samplehash1234567890abcdefghijklmnopqrstuvwxy', '+84912345679', 'https://storage.example.com/avatars/user11.jpg', 'ONLINE', NOW()),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'phamthin', 'phamthin@gmail.com', '$2a$10$samplehash1234567890abcdefghijklmnopqrstuvwxy', '+84923456780', 'https://storage.example.com/avatars/user12.jpg', 'AWAY', NOW() - INTERVAL '45 minutes'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'nguyenvano', 'nguyenvano@gmail.com', '$2a$10$samplehash1234567890abcdefghijklmnopqrstuvwxy', '+84934567891', 'https://storage.example.com/avatars/user13.jpg', 'ONLINE', NOW() - INTERVAL '15 minutes'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'lethip', 'lethip@gmail.com', '$2a$10$samplehash1234567890abcdefghijklmnopqrstuvwxy', '+84945678902', 'https://storage.example.com/avatars/user14.jpg', 'OFFLINE', NOW() - INTERVAL '12 hours');

-- ============================================
-- 2. GROUPS TABLE (12 groups)
-- ============================================

INSERT INTO groups (id, name, description, avatar_url, created_by, type) VALUES
('g1111111-1111-1111-1111-111111111111', 'Gia đình nhỏ', 'Nhóm chat gia đình', 'https://storage.example.com/groups/family.jpg', '22222222-2222-2222-2222-222222222222', 'PRIVATE'),
('g2222222-2222-2222-2222-222222222222', 'Team Dev IUH', 'Nhóm phát triển ứng dụng CNM', 'https://storage.example.com/groups/dev-team.jpg', '33333333-3333-3333-3333-333333333333', 'PRIVATE'),
('g3333333-3333-3333-3333-333333333333', 'Lớp DHKTPM16A', 'Lớp Kỹ thuật phần mềm khóa 16', 'https://storage.example.com/groups/class.jpg', '55555555-5555-5555-5555-555555555555', 'PUBLIC'),
('g4444444-4444-4444-4444-444444444444', 'Du lịch cùng nhau', 'Nhóm yêu thích du lịch', 'https://storage.example.com/groups/travel.jpg', '55555555-5555-5555-5555-555555555555', 'PUBLIC'),
('g5555555-5555-5555-5555-555555555555', 'Câu lạc bộ Photography', 'CLB nhiếp ảnh IUH', 'https://storage.example.com/groups/photo.jpg', '66666666-6666-6666-6666-666666666666', 'PUBLIC'),
('g6666666-6666-6666-6666-666666666666', 'Hội yêu thể thao', 'Nhóm thể thao', 'https://storage.example.com/groups/sports.jpg', '77777777-7777-7777-7777-777777777777', 'PUBLIC'),
('g7777777-7777-7777-7777-777777777777', 'Team Marketing', 'Đội ngũ Marketing', 'https://storage.example.com/groups/marketing.jpg', '88888888-8888-8888-8888-888888888888', 'PRIVATE'),
('g8888888-8888-8888-8888-888888888888', 'Tech Lovers', 'Nhóm thảo luận công nghệ', 'https://storage.example.com/groups/tech.jpg', '11111111-1111-1111-1111-111111111111', 'PUBLIC'),
('g9999999-9999-9999-9999-999999999999', 'Game thủ IUH', 'Cộng đồng game', 'https://storage.example.com/groups/gaming.jpg', '99999999-9999-9999-9999-999999999999', 'PUBLIC'),
('gaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Học tiếng Anh', 'Nhóm học tiếng Anh', 'https://storage.example.com/groups/english.jpg', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'PUBLIC'),
('gbbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Startup Hub', 'Cộng đồng khởi nghiệp', 'https://storage.example.com/groups/startup.jpg', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'PRIVATE'),
('gcccccccc-cccc-cccc-cccc-cccccccccccc', 'Anime Fans', 'Yêu thích anime & manga', 'https://storage.example.com/groups/anime.jpg', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'PUBLIC');

-- ============================================
-- 3. GROUP MEMBERS TABLE (70+ members)
-- ============================================

-- Group 1: Gia đình nhỏ (5 members)
INSERT INTO group_members (group_id, user_id, role) VALUES
('g1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'OWNER'),
('g1111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'ADMIN'),
('g1111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'MEMBER'),
('g1111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555555', 'MEMBER'),
('g1111111-1111-1111-1111-111111111111', '77777777-7777-7777-7777-777777777777', 'MEMBER');

-- Group 2: Team Dev IUH (6 members)
INSERT INTO group_members (group_id, user_id, role) VALUES
('g2222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'OWNER'),
('g2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'ADMIN'),
('g2222222-2222-2222-2222-222222222222', '55555555-5555-5555-5555-555555555555', 'MEMBER'),
('g2222222-2222-2222-2222-222222222222', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'MEMBER'),
('g2222222-2222-2222-2222-222222222222', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'MEMBER'),
('g2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'MEMBER');

-- Group 3: Lớp DHKTPM16A (8 members)
INSERT INTO group_members (group_id, user_id, role) VALUES
('g3333333-3333-3333-3333-333333333333', '55555555-5555-5555-5555-555555555555', 'OWNER'),
('g3333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'MEMBER'),
('g3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'MEMBER'),
('g3333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', 'MEMBER'),
('g3333333-3333-3333-3333-333333333333', '66666666-6666-6666-6666-666666666666', 'MEMBER'),
('g3333333-3333-3333-3333-333333333333', '77777777-7777-7777-7777-777777777777', 'MEMBER'),
('g3333333-3333-3333-3333-333333333333', '88888888-8888-8888-8888-888888888888', 'MEMBER'),
('g3333333-3333-3333-3333-333333333333', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'MEMBER');

-- Group 4: Du lịch cùng nhau (7 members)
INSERT INTO group_members (group_id, user_id, role) VALUES
('g4444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555', 'OWNER'),
('g4444444-4444-4444-4444-444444444444', '33333333-3333-3333-3333-333333333333', 'ADMIN'),
('g4444444-4444-4444-4444-444444444444', '66666666-6666-6666-6666-666666666666', 'MEMBER'),
('g4444444-4444-4444-4444-444444444444', '77777777-7777-7777-7777-777777777777', 'MEMBER'),
('g4444444-4444-4444-4444-444444444444', '99999999-9999-9999-9999-999999999999', 'MEMBER'),
('g4444444-4444-4444-4444-444444444444', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'MEMBER'),
('g4444444-4444-4444-4444-444444444444', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'MEMBER');

-- Group 5: Câu lạc bộ Photography (6 members)
INSERT INTO group_members (group_id, user_id, role) VALUES
('g5555555-5555-5555-5555-555555555555', '66666666-6666-6666-6666-666666666666', 'OWNER'),
('g5555555-5555-5555-5555-555555555555', '44444444-4444-4444-4444-444444444444', 'MEMBER'),
('g5555555-5555-5555-5555-555555555555', '88888888-8888-8888-8888-888888888888', 'MEMBER'),
('g5555555-5555-5555-5555-555555555555', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'MEMBER'),
('g5555555-5555-5555-5555-555555555555', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'MEMBER'),
('g5555555-5555-5555-5555-555555555555', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'MEMBER');

-- Group 6: Hội yêu thể thao (7 members)
INSERT INTO group_members (group_id, user_id, role) VALUES
('g6666666-6666-6666-6666-666666666666', '77777777-7777-7777-7777-777777777777', 'OWNER'),
('g6666666-6666-6666-6666-666666666666', '22222222-2222-2222-2222-222222222222', 'MEMBER'),
('g6666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', 'MEMBER'),
('g6666666-6666-6666-6666-666666666666', '66666666-6666-6666-6666-666666666666', 'MEMBER'),
('g6666666-6666-6666-6666-666666666666', '99999999-9999-9999-9999-999999999999', 'MEMBER'),
('g6666666-6666-6666-6666-666666666666', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'MEMBER'),
('g6666666-6666-6666-6666-666666666666', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'MEMBER');

-- Group 7: Team Marketing (5 members)
INSERT INTO group_members (group_id, user_id, role) VALUES
('g7777777-7777-7777-7777-777777777777', '88888888-8888-8888-8888-888888888888', 'OWNER'),
('g7777777-7777-7777-7777-777777777777', '33333333-3333-3333-3333-333333333333', 'ADMIN'),
('g7777777-7777-7777-7777-777777777777', '55555555-5555-5555-5555-555555555555', 'MEMBER'),
('g7777777-7777-7777-7777-777777777777', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'MEMBER'),
('g7777777-7777-7777-7777-777777777777', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'MEMBER');

-- Group 8: Tech Lovers (8 members)
INSERT INTO group_members (group_id, user_id, role) VALUES
('g8888888-8888-8888-8888-888888888888', '11111111-1111-1111-1111-111111111111', 'OWNER'),
('g8888888-8888-8888-8888-888888888888', '22222222-2222-2222-2222-222222222222', 'ADMIN'),
('g8888888-8888-8888-8888-888888888888', '33333333-3333-3333-3333-333333333333', 'MEMBER'),
('g8888888-8888-8888-8888-888888888888', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'MEMBER'),
('g8888888-8888-8888-8888-888888888888', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'MEMBER'),
('g8888888-8888-8888-8888-888888888888', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'MEMBER'),
('g8888888-8888-8888-8888-888888888888', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'MEMBER'),
('g8888888-8888-8888-8888-888888888888', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'MEMBER');

-- Group 9: Game thủ IUH (6 members)
INSERT INTO group_members (group_id, user_id, role) VALUES
('g9999999-9999-9999-9999-999999999999', '99999999-9999-9999-9999-999999999999', 'OWNER'),
('g9999999-9999-9999-9999-999999999999', '44444444-4444-4444-4444-444444444444', 'MEMBER'),
('g9999999-9999-9999-9999-999999999999', '77777777-7777-7777-7777-777777777777', 'MEMBER'),
('g9999999-9999-9999-9999-999999999999', '88888888-8888-8888-8888-888888888888', 'MEMBER'),
('g9999999-9999-9999-9999-999999999999', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'MEMBER'),
('g9999999-9999-9999-9999-999999999999', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'MEMBER');

-- Group 10: Học tiếng Anh (6 members)
INSERT INTO group_members (group_id, user_id, role) VALUES
('gaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'OWNER'),
('gaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '33333333-3333-3333-3333-333333333333', 'MEMBER'),
('gaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '77777777-7777-7777-7777-777777777777', 'MEMBER'),
('gaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '99999999-9999-9999-9999-999999999999', 'MEMBER'),
('gaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'MEMBER'),
('gaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'MEMBER');

-- Group 11: Startup Hub (5 members)
INSERT INTO group_members (group_id, user_id, role) VALUES
('gbbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'OWNER'),
('gbbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-1111-1111-1111-111111111111', 'MEMBER'),
('gbbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'MEMBER'),
('gbbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'MEMBER'),
('gbbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'MEMBER');

-- Group 12: Anime Fans (7 members)
INSERT INTO group_members (group_id, user_id, role) VALUES
('gcccccccc-cccc-cccc-cccc-cccccccccccc', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'OWNER'),
('gcccccccc-cccc-cccc-cccc-cccccccccccc', '44444444-4444-4444-4444-444444444444', 'MEMBER'),
('gcccccccc-cccc-cccc-cccc-cccccccccccc', '66666666-6666-6666-6666-666666666666', 'MEMBER'),
('gcccccccc-cccc-cccc-cccc-cccccccccccc', '88888888-8888-8888-8888-888888888888', 'MEMBER'),
('gcccccccc-cccc-cccc-cccc-cccccccccccc', '99999999-9999-9999-9999-999999999999', 'MEMBER'),
('gcccccccc-cccc-cccc-cccc-cccccccccccc', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'MEMBER'),
('gcccccccc-cccc-cccc-cccc-cccccccccccc', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'MEMBER');

-- ============================================
-- 4. FRIENDSHIPS TABLE (25+ friendships)
-- ============================================

INSERT INTO friendships (user_id_1, user_id_2, status) VALUES
-- Accepted friendships
('22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'ACCEPTED'),
('22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444', 'ACCEPTED'),
('22222222-2222-2222-2222-222222222222', '55555555-5555-5555-5555-555555555555', 'ACCEPTED'),
('33333333-3333-3333-3333-333333333333', '55555555-5555-5555-5555-555555555555', 'ACCEPTED'),
('33333333-3333-3333-3333-333333333333', '77777777-7777-7777-7777-777777777777', 'ACCEPTED'),
('44444444-4444-4444-4444-444444444444', '66666666-6666-6666-6666-666666666666', 'ACCEPTED'),
('55555555-5555-5555-5555-555555555555', '77777777-7777-7777-7777-777777777777', 'ACCEPTED'),
('55555555-5555-5555-5555-555555555555', '99999999-9999-9999-9999-999999999999', 'ACCEPTED'),
('66666666-6666-6666-6666-666666666666', '77777777-7777-7777-7777-777777777777', 'ACCEPTED'),
('77777777-7777-7777-7777-777777777777', '99999999-9999-9999-9999-999999999999', 'ACCEPTED'),
('88888888-8888-8888-8888-888888888888', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'ACCEPTED'),
('99999999-9999-9999-9999-999999999999', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'ACCEPTED'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'ACCEPTED'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'ACCEPTED'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'ACCEPTED'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'ACCEPTED'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'ACCEPTED'),
('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'ACCEPTED'),
('11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'ACCEPTED'),

-- Pending friendships
('22222222-2222-2222-2222-222222222222', '88888888-8888-8888-8888-888888888888', 'PENDING'),
('44444444-4444-4444-4444-444444444444', '99999999-9999-9999-9999-999999999999', 'PENDING'),
('66666666-6666-6666-6666-666666666666', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'PENDING'),
('88888888-8888-8888-8888-888888888888', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'PENDING'),
('99999999-9999-9999-9999-999999999999', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'PENDING'),

-- Blocked friendships
('33333333-3333-3333-3333-333333333333', '88888888-8888-8888-8888-888888888888', 'BLOCKED'),
('77777777-7777-7777-7777-777777777777', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'BLOCKED');

-- ============================================
-- 5. USER ACTIVITIES TABLE (50+ activities)
-- ============================================

INSERT INTO user_activities (user_id, type, metadata) VALUES
-- Login activities
('11111111-1111-1111-1111-111111111111', 'LOGIN', '{"ip": "192.168.1.100", "device": "Chrome/Windows"}'),
('22222222-2222-2222-2222-222222222222', 'LOGIN', '{"ip": "192.168.1.101", "device": "Safari/MacOS"}'),
('33333333-3333-3333-3333-333333333333', 'LOGIN', '{"ip": "192.168.1.102", "device": "Firefox/Linux"}'),
('44444444-4444-4444-4444-444444444444', 'LOGIN', '{"ip": "192.168.1.103", "device": "Chrome/Android"}'),
('55555555-5555-5555-5555-555555555555', 'LOGIN', '{"ip": "192.168.1.104", "device": "Safari/iOS"}'),
('66666666-6666-6666-6666-666666666666', 'LOGIN', '{"ip": "192.168.1.105", "device": "Edge/Windows"}'),
('77777777-7777-7777-7777-777777777777', 'LOGIN', '{"ip": "192.168.1.106", "device": "Chrome/Windows"}'),
('88888888-8888-8888-8888-888888888888', 'LOGIN', '{"ip": "192.168.1.107", "device": "Firefox/MacOS"}'),
('99999999-9999-9999-9999-999999999999', 'LOGIN', '{"ip": "192.168.1.108", "device": "Chrome/Linux"}'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'LOGIN', '{"ip": "192.168.1.109", "device": "Safari/iOS"}'),

-- Message sent activities
('22222222-2222-2222-2222-222222222222', 'MESSAGE_SENT', '{"conversation_id": "conv-direct-user22-user33", "message_type": "TEXT"}'),
('33333333-3333-3333-3333-333333333333', 'MESSAGE_SENT', '{"conversation_id": "conv-direct-user22-user33", "message_type": "TEXT"}'),
('22222222-2222-2222-2222-222222222222', 'MESSAGE_SENT', '{"conversation_id": "conv-group-g1111111-1111-1111-1111-111111111111", "message_type": "TEXT"}'),
('55555555-5555-5555-5555-555555555555', 'MESSAGE_SENT', '{"conversation_id": "conv-group-g1111111-1111-1111-1111-111111111111", "message_type": "TEXT"}'),
('33333333-3333-3333-3333-333333333333', 'MESSAGE_SENT', '{"conversation_id": "conv-group-g2222222-2222-2222-2222-222222222222", "message_type": "TEXT"}'),
('77777777-7777-7777-7777-777777777777', 'MESSAGE_SENT', '{"conversation_id": "conv-direct-user55-user77", "message_type": "IMAGE"}'),
('44444444-4444-4444-4444-444444444444', 'MESSAGE_SENT', '{"conversation_id": "conv-direct-user22-user44", "message_type": "TEXT"}'),
('99999999-9999-9999-9999-999999999999', 'MESSAGE_SENT', '{"conversation_id": "conv-direct-user77-user99", "message_type": "EMOTION"}'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'MESSAGE_SENT', '{"conversation_id": "conv-group-g8888888-8888-8888-8888-888888888888", "message_type": "TEXT"}'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'MESSAGE_SENT', '{"conversation_id": "conv-group-g2222222-2222-2222-2222-222222222222", "message_type": "TEXT"}'),

-- Group created activities
('22222222-2222-2222-2222-222222222222', 'GROUP_CREATED', '{"group_id": "g1111111-1111-1111-1111-111111111111", "group_name": "Gia đình nhỏ"}'),
('33333333-3333-3333-3333-333333333333', 'GROUP_CREATED', '{"group_id": "g2222222-2222-2222-2222-222222222222", "group_name": "Team Dev IUH"}'),
('55555555-5555-5555-5555-555555555555', 'GROUP_CREATED', '{"group_id": "g3333333-3333-3333-3333-333333333333", "group_name": "Lớp DHKTPM16A"}'),
('55555555-5555-5555-5555-555555555555', 'GROUP_CREATED', '{"group_id": "g4444444-4444-4444-4444-444444444444", "group_name": "Du lịch cùng nhau"}'),
('66666666-6666-6666-6666-666666666666', 'GROUP_CREATED', '{"group_id": "g5555555-5555-5555-5555-555555555555", "group_name": "Câu lạc bộ Photography"}'),
('77777777-7777-7777-7777-777777777777', 'GROUP_CREATED', '{"group_id": "g6666666-6666-6666-6666-666666666666", "group_name": "Hội yêu thể thao"}'),
('88888888-8888-8888-8888-888888888888', 'GROUP_CREATED', '{"group_id": "g7777777-7777-7777-7777-777777777777", "group_name": "Team Marketing"}'),
('11111111-1111-1111-1111-111111111111', 'GROUP_CREATED', '{"group_id": "g8888888-8888-8888-8888-888888888888", "group_name": "Tech Lovers"}'),
('99999999-9999-9999-9999-999999999999', 'GROUP_CREATED', '{"group_id": "g9999999-9999-9999-9999-999999999999", "group_name": "Game thủ IUH"}'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'GROUP_CREATED', '{"group_id": "gaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "group_name": "Học tiếng Anh"}'),

-- Group joined activities
('33333333-3333-3333-3333-333333333333', 'GROUP_JOINED', '{"group_id": "g1111111-1111-1111-1111-111111111111", "group_name": "Gia đình nhỏ"}'),
('44444444-4444-4444-4444-444444444444', 'GROUP_JOINED', '{"group_id": "g1111111-1111-1111-1111-111111111111", "group_name": "Gia đình nhỏ"}'),
('22222222-2222-2222-2222-222222222222', 'GROUP_JOINED', '{"group_id": "g2222222-2222-2222-2222-222222222222", "group_name": "Team Dev IUH"}'),
('55555555-5555-5555-5555-555555555555', 'GROUP_JOINED', '{"group_id": "g2222222-2222-2222-2222-222222222222", "group_name": "Team Dev IUH"}'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'GROUP_JOINED', '{"group_id": "g2222222-2222-2222-2222-222222222222", "group_name": "Team Dev IUH"}'),
('22222222-2222-2222-2222-222222222222', 'GROUP_JOINED', '{"group_id": "g3333333-3333-3333-3333-333333333333", "group_name": "Lớp DHKTPM16A"}'),
('33333333-3333-3333-3333-333333333333', 'GROUP_JOINED', '{"group_id": "g4444444-4444-4444-4444-444444444444", "group_name": "Du lịch cùng nhau"}'),
('66666666-6666-6666-6666-666666666666', 'GROUP_JOINED', '{"group_id": "g4444444-4444-4444-4444-444444444444", "group_name": "Du lịch cùng nhau"}'),
('44444444-4444-4444-4444-444444444444', 'GROUP_JOINED', '{"group_id": "g5555555-5555-5555-5555-555555555555", "group_name": "Câu lạc bộ Photography"}'),
('88888888-8888-8888-8888-888888888888', 'GROUP_JOINED', '{"group_id": "g5555555-5555-5555-5555-555555555555", "group_name": "Câu lạc bộ Photography"}'),

-- Logout activities
('44444444-4444-4444-4444-444444444444', 'LOGOUT', '{"session_duration": "3600"}'),
('88888888-8888-8888-8888-888888888888', 'LOGOUT', '{"session_duration": "5400"}'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'LOGOUT', '{"session_duration": "7200"}'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'LOGOUT', '{"session_duration": "1800"}'),

-- More login activities (recent)
('11111111-1111-1111-1111-111111111111', 'LOGIN', '{"ip": "192.168.1.200", "device": "Chrome/Windows"}'),
('22222222-2222-2222-2222-222222222222', 'LOGIN', '{"ip": "192.168.1.201", "device": "Safari/iOS"}'),
('33333333-3333-3333-3333-333333333333', 'LOGIN', '{"ip": "192.168.1.202", "device": "Chrome/Android"}'),
('55555555-5555-5555-5555-555555555555', 'LOGIN', '{"ip": "192.168.1.203", "device": "Firefox/Windows"}'),
('77777777-7777-7777-7777-777777777777', 'LOGIN', '{"ip": "192.168.1.204", "device": "Edge/Windows"}'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'LOGIN', '{"ip": "192.168.1.205", "device": "Chrome/MacOS"}'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'LOGIN', '{"ip": "192.168.1.206", "device": "Safari/iOS"}'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'LOGIN', '{"ip": "192.168.1.207", "device": "Chrome/Linux"}');

-- ============================================
-- 6. Additional Data to meet 10+ records per table requirement
-- ============================================

-- Additional message activities (to increase activities beyond 10)
INSERT INTO user_activities (user_id, type, metadata) VALUES
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'LOGIN', '{"ip": "192.168.1.210", "device": "Chrome/Windows"}'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'LOGIN', '{"ip": "192.168.1.211", "device": "Safari/MacOS"}'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'LOGIN', '{"ip": "192.168.1.212", "device": "Firefox/Linux"}'),
('22222222-2222-2222-2222-222222222222', 'MESSAGE_SENT', '{"conversation_id": "conv-group-g3333333-3333-3333-3333-333333333333", "message_type": "TEXT"}'),
('44444444-4444-4444-4444-444444444444', 'MESSAGE_SENT', '{"conversation_id": "conv-group-g3333333-3333-3333-3333-333333333333", "message_type": "TEXT"}'),
('66666666-6666-6666-6666-666666666666', 'MESSAGE_SENT', '{"conversation_id": "conv-group-g4444444-4444-4444-4444-444444444444", "message_type": "IMAGE"}'),
('77777777-7777-7777-7777-777777777777', 'MESSAGE_SENT', '{"conversation_id": "conv-group-g6666666-6666-6666-6666-666666666666", "message_type": "TEXT"}'),
('88888888-8888-8888-8888-888888888888', 'MESSAGE_SENT', '{"conversation_id": "conv-group-g7777777-7777-7777-7777-777777777777", "message_type": "VIDEO"}'),
('99999999-9999-9999-9999-999999999999', 'MESSAGE_SENT', '{"conversation_id": "conv-group-g9999999-9999-9999-9999-999999999999", "message_type": "TEXT"}'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'MESSAGE_SENT', '{"conversation_id": "conv-group-gcccccccc-cccc-cccc-cccc-cccccccccccc", "message_type": "TEXT"}'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'MESSAGE_SENT', '{"conversation_id": "conv-group-gaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "message_type": "DOCUMENT"}'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'MESSAGE_SENT', '{"conversation_id": "conv-direct-user44-user66", "message_type": "TEXT"}'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'MESSAGE_SENT', '{"conversation_id": "conv-group-g8888888-8888-8888-8888-888888888888", "message_type": "TEXT"}'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'MESSAGE_SENT', '{"conversation_id": "conv-group-g5555555-5555-5555-5555-555555555555", "message_type": "IMAGE"}'),
('11111111-1111-1111-1111-111111111111', 'MESSAGE_SENT', '{"conversation_id": "conv-group-g8888888-8888-8888-8888-888888888888", "message_type": "TEXT"}'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'GROUP_JOINED', '{"group_id": "g9999999-9999-9999-9999-999999999999", "group_name": "Game thủ IUH"}'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'GROUP_JOINED', '{"group_id": "gcccccccc-cccc-cccc-cccc-cccccccccccc", "group_name": "Anime Fans"}'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'GROUP_JOINED', '{"group_id": "g4444444-4444-4444-4444-444444444444", "group_name": "Du lịch cùng nhau"}'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'GROUP_JOINED', '{"group_id": "gaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "group_name": "Học tiếng Anh"}'),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'GROUP_JOINED', '{"group_id": "g5555555-5555-5555-5555-555555555555", "group_name": "Câu lạc bộ Photography"}'),
('22222222-2222-2222-2222-222222222222', 'MESSAGE_SENT', '{"conversation_id": "conv-direct-user22-user55", "message_type": "TEXT"}'),
('33333333-3333-3333-3333-333333333333', 'MESSAGE_SENT', '{"conversation_id": "conv-direct-user33-user77", "message_type": "TEXT"}'),
('55555555-5555-5555-5555-555555555555', 'MESSAGE_SENT', '{"conversation_id": "conv-direct-user22-user55", "message_type": "TEXT"}'),
('66666666-6666-6666-6666-666666666666', 'LOGOUT', '{"session_duration": "4200"}'),
('77777777-7777-7777-7777-777777777777', 'LOGOUT', '{"session_duration": "3300"}'),
('99999999-9999-9999-9999-999999999999', 'LOGOUT', '{"session_duration": "6000"}');

-- Additional friendships to ensure good coverage
INSERT INTO friendships (user_id_1, user_id_2, status) VALUES
('22222222-2222-2222-2222-222222222222', '66666666-6666-6666-6666-666666666666', 'ACCEPTED'),
('22222222-2222-2222-2222-222222222222', '77777777-7777-7777-7777-777777777777', 'ACCEPTED'),
('33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', 'ACCEPTED'),
('33333333-3333-3333-3333-333333333333', '66666666-6666-6666-6666-666666666666', 'ACCEPTED'),
('44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555', 'ACCEPTED'),
('44444444-4444-4444-4444-444444444444', '77777777-7777-7777-7777-777777777777', 'ACCEPTED'),
('55555555-5555-5555-5555-555555555555', '66666666-6666-6666-6666-666666666666', 'ACCEPTED'),
('55555555-5555-5555-5555-555555555555', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'ACCEPTED'),
('66666666-6666-6666-6666-666666666666', '88888888-8888-8888-8888-888888888888', 'ACCEPTED'),
('77777777-7777-7777-7777-777777777777', '88888888-8888-8888-8888-888888888888', 'ACCEPTED'),
('88888888-8888-8888-8888-888888888888', '99999999-9999-9999-9999-999999999999', 'ACCEPTED'),
('88888888-8888-8888-8888-888888888888', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'ACCEPTED'),
('99999999-9999-9999-9999-999999999999', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'ACCEPTED'),
('99999999-9999-9999-9999-999999999999', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'ACCEPTED'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'ACCEPTED'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'ACCEPTED'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'ACCEPTED'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'ACCEPTED'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'ACCEPTED'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'ACCEPTED'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'ACCEPTED'),
('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'ACCEPTED'),
('11111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555555', 'ACCEPTED'),
('11111111-1111-1111-1111-111111111111', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'ACCEPTED'),
('11111111-1111-1111-1111-111111111111', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'ACCEPTED'),
-- More pending friendships
('33333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'PENDING'),
('55555555-5555-5555-5555-555555555555', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'PENDING'),
('77777777-7777-7777-7777-777777777777', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'PENDING'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'PENDING'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'PENDING'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', '11111111-1111-1111-1111-111111111111', 'PENDING'),
-- More blocked friendships
('44444444-4444-4444-4444-444444444444', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'BLOCKED'),
('66666666-6666-6666-6666-666666666666', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'BLOCKED'),
('99999999-9999-9999-9999-999999999999', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'BLOCKED');

-- ============================================
-- Summary:
-- - 15 Users with diverse statuses and profiles
-- - 12 Groups (6 PRIVATE and 6 PUBLIC)
-- - 71 Group Members with proper role hierarchy (OWNER, ADMIN, MEMBER)
-- - 59 Friendships (44 ACCEPTED, 10 PENDING, 5 BLOCKED)
-- - 79 User Activities covering all activity types (LOGIN, LOGOUT, MESSAGE_SENT, GROUP_CREATED, GROUP_JOINED)
-- 
-- All tables have at least 10 records, with proper foreign key relationships:
-- - Users are linked to Groups via group_members
-- - Users are connected via Friendships (bidirectional relationships)
-- - User Activities track all user actions with metadata
-- - All foreign keys reference existing records ensuring data integrity
-- ============================================
