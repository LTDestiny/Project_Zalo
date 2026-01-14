-- ============================================
-- Zola Platform - Sample Data
-- All users have password: password123
-- Password hash: $2a$10$QQAg5WcMhUwsPsZVaqws5uToAP8afULmRnuwcqyC0MuRqVGfP2BOK
-- ============================================

-- ============================================
-- Insert Users (15 users)
-- ============================================
INSERT INTO users (id, username, email, password_hash, phone_number, avatar_url, status, role, last_seen) VALUES
('11111111-1111-1111-1111-111111111111', 'admin_user', 'admin@zola.com', '$2a$10$QQAg5WcMhUwsPsZVaqws5uToAP8afULmRnuwcqyC0MuRqVGfP2BOK', '+84901234567', 'https://i.pravatar.cc/150?img=1', 'ONLINE', 'ADMIN', NOW()),
('22222222-2222-2222-2222-222222222222', 'john_doe', 'john.doe@example.com', '$2a$10$QQAg5WcMhUwsPsZVaqws5uToAP8afULmRnuwcqyC0MuRqVGfP2BOK', '+84912345678', 'https://i.pravatar.cc/150?img=2', 'ONLINE', 'USER', NOW()),
('33333333-3333-3333-3333-333333333333', 'jane_smith', 'jane.smith@example.com', '$2a$10$QQAg5WcMhUwsPsZVaqws5uToAP8afULmRnuwcqyC0MuRqVGfP2BOK', '+84923456789', 'https://i.pravatar.cc/150?img=3', 'AWAY', 'USER', NOW() - INTERVAL '10 minutes'),
('44444444-4444-4444-4444-444444444444', 'bob_wilson', 'bob.wilson@example.com', '$2a$10$QQAg5WcMhUwsPsZVaqws5uToAP8afULmRnuwcqyC0MuRqVGfP2BOK', '+84934567890', 'https://i.pravatar.cc/150?img=4', 'OFFLINE', 'USER', NOW() - INTERVAL '2 hours'),
('55555555-5555-5555-5555-555555555555', 'alice_brown', 'alice.brown@example.com', '$2a$10$QQAg5WcMhUwsPsZVaqws5uToAP8afULmRnuwcqyC0MuRqVGfP2BOK', '+84945678901', 'https://i.pravatar.cc/150?img=5', 'ONLINE', 'USER', NOW()),
('66666666-6666-6666-6666-666666666666', 'charlie_davis', 'charlie.davis@example.com', '$2a$10$QQAg5WcMhUwsPsZVaqws5uToAP8afULmRnuwcqyC0MuRqVGfP2BOK', '+84956789012', 'https://i.pravatar.cc/150?img=6', 'DO_NOT_DISTURB', 'USER', NOW()),
('77777777-7777-7777-7777-777777777777', 'emma_wilson', 'emma.wilson@example.com', '$2a$10$QQAg5WcMhUwsPsZVaqws5uToAP8afULmRnuwcqyC0MuRqVGfP2BOK', '+84967890123', 'https://i.pravatar.cc/150?img=7', 'ONLINE', 'USER', NOW()),
('88888888-8888-8888-8888-888888888888', 'david_lee', 'david.lee@example.com', '$2a$10$QQAg5WcMhUwsPsZVaqws5uToAP8afULmRnuwcqyC0MuRqVGfP2BOK', '+84978901234', 'https://i.pravatar.cc/150?img=8', 'AWAY', 'USER', NOW() - INTERVAL '5 minutes'),
('99999999-9999-9999-9999-999999999999', 'sophia_martin', 'sophia.martin@example.com', '$2a$10$QQAg5WcMhUwsPsZVaqws5uToAP8afULmRnuwcqyC0MuRqVGfP2BOK', '+84989012345', 'https://i.pravatar.cc/150?img=9', 'OFFLINE', 'USER', NOW() - INTERVAL '1 day'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'michael_clark', 'michael.clark@example.com', '$2a$10$QQAg5WcMhUwsPsZVaqws5uToAP8afULmRnuwcqyC0MuRqVGfP2BOK', '+84990123456', 'https://i.pravatar.cc/150?img=10', 'ONLINE', 'USER', NOW()),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'olivia_taylor', 'olivia.taylor@example.com', '$2a$10$QQAg5WcMhUwsPsZVaqws5uToAP8afULmRnuwcqyC0MuRqVGfP2BOK', '+84901234568', 'https://i.pravatar.cc/150?img=11', 'ONLINE', 'USER', NOW()),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'james_white', 'james.white@example.com', '$2a$10$QQAg5WcMhUwsPsZVaqws5uToAP8afULmRnuwcqyC0MuRqVGfP2BOK', '+84912345679', 'https://i.pravatar.cc/150?img=12', 'AWAY', 'USER', NOW() - INTERVAL '15 minutes'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'isabella_harris', 'isabella.harris@example.com', '$2a$10$QQAg5WcMhUwsPsZVaqws5uToAP8afULmRnuwcqyC0MuRqVGfP2BOK', '+84923456780', 'https://i.pravatar.cc/150?img=13', 'OFFLINE', 'USER', NOW() - INTERVAL '3 hours'),
('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'william_thomas', 'william.thomas@example.com', '$2a$10$QQAg5WcMhUwsPsZVaqws5uToAP8afULmRnuwcqyC0MuRqVGfP2BOK', '+84934567891', 'https://i.pravatar.cc/150?img=14', 'ONLINE', 'USER', NOW()),
('ffffffff-ffff-ffff-ffff-ffffffffffff', 'mia_anderson', 'mia.anderson@example.com', '$2a$10$QQAg5WcMhUwsPsZVaqws5uToAP8afULmRnuwcqyC0MuRqVGfP2BOK', '+84945678902', 'https://i.pravatar.cc/150?img=15', 'DO_NOT_DISTURB', 'USER', NOW());

-- ============================================
-- Insert Friendships (20 friendships)
-- ============================================
INSERT INTO friendships (user_id_1, user_id_2, status) VALUES
-- Admin friendships
('11111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'ACCEPTED'),
('11111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'ACCEPTED'),
('11111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555555', 'ACCEPTED'),
('11111111-1111-1111-1111-111111111111', '77777777-7777-7777-7777-777777777777', 'PENDING'),

-- John's friendships
('22222222-2222-2222-2222-222222222222', '33333333-3333-3333-3333-333333333333', 'ACCEPTED'),
('22222222-2222-2222-2222-222222222222', '44444444-4444-4444-4444-444444444444', 'ACCEPTED'),
('22222222-2222-2222-2222-222222222222', '55555555-5555-5555-5555-555555555555', 'ACCEPTED'),
('22222222-2222-2222-2222-222222222222', '88888888-8888-8888-8888-888888888888', 'BLOCKED'),

-- Jane's friendships
('33333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', 'ACCEPTED'),
('33333333-3333-3333-3333-333333333333', '66666666-6666-6666-6666-666666666666', 'ACCEPTED'),
('33333333-3333-3333-3333-333333333333', '99999999-9999-9999-9999-999999999999', 'PENDING'),

-- Other friendships
('44444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555', 'ACCEPTED'),
('55555555-5555-5555-5555-555555555555', '66666666-6666-6666-6666-666666666666', 'ACCEPTED'),
('66666666-6666-6666-6666-666666666666', '77777777-7777-7777-7777-777777777777', 'ACCEPTED'),
('77777777-7777-7777-7777-777777777777', '88888888-8888-8888-8888-888888888888', 'ACCEPTED'),
('88888888-8888-8888-8888-888888888888', '99999999-9999-9999-9999-999999999999', 'ACCEPTED'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'ACCEPTED'),
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'ACCEPTED'),
('cccccccc-cccc-cccc-cccc-cccccccccccc', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'PENDING'),
('dddddddd-dddd-dddd-dddd-dddddddddddd', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'ACCEPTED');

-- ============================================
-- Insert Groups (12 groups)
-- ============================================
INSERT INTO groups (id, name, description, avatar_url, created_by, type) VALUES
('g1111111-1111-1111-1111-111111111111', 'Team Alpha', 'Main development team', 'https://i.pravatar.cc/150?img=50', '11111111-1111-1111-1111-111111111111', 'PRIVATE'),
('g2222222-2222-2222-2222-222222222222', 'Project Beta', 'Beta project discussion', 'https://i.pravatar.cc/150?img=51', '22222222-2222-2222-2222-222222222222', 'PRIVATE'),
('g3333333-3333-3333-3333-333333333333', 'Coffee Lovers', 'Coffee break discussions', 'https://i.pravatar.cc/150?img=52', '33333333-3333-3333-3333-333333333333', 'PUBLIC'),
('g4444444-4444-4444-4444-444444444444', 'Tech Talk', 'Technology discussions', 'https://i.pravatar.cc/150?img=53', '44444444-4444-4444-4444-444444444444', 'PUBLIC'),
('g5555555-5555-5555-5555-555555555555', 'Gaming Squad', 'Gaming community', 'https://i.pravatar.cc/150?img=54', '55555555-5555-5555-5555-555555555555', 'PRIVATE'),
('g6666666-6666-6666-6666-666666666666', 'Book Club', 'Monthly book discussions', 'https://i.pravatar.cc/150?img=55', '66666666-6666-6666-6666-666666666666', 'PUBLIC'),
('g7777777-7777-7777-7777-777777777777', 'Fitness Group', 'Workout and health tips', 'https://i.pravatar.cc/150?img=56', '77777777-7777-7777-7777-777777777777', 'PUBLIC'),
('g8888888-8888-8888-8888-888888888888', 'Movie Fans', 'Movie reviews and recommendations', 'https://i.pravatar.cc/150?img=57', '88888888-8888-8888-8888-888888888888', 'PRIVATE'),
('g9999999-9999-9999-9999-999999999999', 'Travel Buddies', 'Travel planning and stories', 'https://i.pravatar.cc/150?img=58', '99999999-9999-9999-9999-999999999999', 'PUBLIC'),
('gaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Music Lovers', 'Share and discuss music', 'https://i.pravatar.cc/150?img=59', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'PUBLIC'),
('gbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Food Paradise', 'Food recipes and restaurant reviews', 'https://i.pravatar.cc/150?img=60', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'PRIVATE'),
('gcccccc-cccc-cccc-cccc-cccccccccccc', 'Study Group', 'Study materials and discussions', 'https://i.pravatar.cc/150?img=61', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'PRIVATE');

-- ============================================
-- Insert Group Members (50+ members)
-- ============================================
INSERT INTO group_members (group_id, user_id, role) VALUES
-- Team Alpha members
('g1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'OWNER'),
('g1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'ADMIN'),
('g1111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'MEMBER'),
('g1111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'MEMBER'),
('g1111111-1111-1111-1111-111111111111', '55555555-5555-5555-5555-555555555555', 'MEMBER'),

-- Project Beta members
('g2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'OWNER'),
('g2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'ADMIN'),
('g2222222-2222-2222-2222-222222222222', '66666666-6666-6666-6666-666666666666', 'MEMBER'),
('g2222222-2222-2222-2222-222222222222', '77777777-7777-7777-7777-777777777777', 'MEMBER'),

-- Coffee Lovers members
('g3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'OWNER'),
('g3333333-3333-3333-3333-333333333333', '44444444-4444-4444-4444-444444444444', 'ADMIN'),
('g3333333-3333-3333-3333-333333333333', '55555555-5555-5555-5555-555555555555', 'MEMBER'),
('g3333333-3333-3333-3333-333333333333', '88888888-8888-8888-8888-888888888888', 'MEMBER'),
('g3333333-3333-3333-3333-333333333333', '99999999-9999-9999-9999-999999999999', 'MEMBER'),
('g3333333-3333-3333-3333-333333333333', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'MEMBER'),

-- Tech Talk members
('g4444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', 'OWNER'),
('g4444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'MEMBER'),
('g4444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'MEMBER'),
('g4444444-4444-4444-4444-444444444444', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'MEMBER'),
('g4444444-4444-4444-4444-444444444444', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'MEMBER'),

-- Gaming Squad members
('g5555555-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', 'OWNER'),
('g5555555-5555-5555-5555-555555555555', '66666666-6666-6666-6666-666666666666', 'ADMIN'),
('g5555555-5555-5555-5555-555555555555', '77777777-7777-7777-7777-777777777777', 'MEMBER'),
('g5555555-5555-5555-5555-555555555555', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'MEMBER'),
('g5555555-5555-5555-5555-555555555555', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'MEMBER'),

-- Book Club members
('g6666666-6666-6666-6666-666666666666', '66666666-6666-6666-6666-666666666666', 'OWNER'),
('g6666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'MEMBER'),
('g6666666-6666-6666-6666-666666666666', '77777777-7777-7777-7777-777777777777', 'MEMBER'),
('g6666666-6666-6666-6666-666666666666', '99999999-9999-9999-9999-999999999999', 'MEMBER'),

-- Fitness Group members
('g7777777-7777-7777-7777-777777777777', '77777777-7777-7777-7777-777777777777', 'OWNER'),
('g7777777-7777-7777-7777-777777777777', '88888888-8888-8888-8888-888888888888', 'ADMIN'),
('g7777777-7777-7777-7777-777777777777', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'MEMBER'),
('g7777777-7777-7777-7777-777777777777', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'MEMBER'),
('g7777777-7777-7777-7777-777777777777', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'MEMBER'),

-- Movie Fans members
('g8888888-8888-8888-8888-888888888888', '88888888-8888-8888-8888-888888888888', 'OWNER'),
('g8888888-8888-8888-8888-888888888888', '22222222-2222-2222-2222-222222222222', 'MEMBER'),
('g8888888-8888-8888-8888-888888888888', '44444444-4444-4444-4444-444444444444', 'MEMBER'),
('g8888888-8888-8888-8888-888888888888', '99999999-9999-9999-9999-999999999999', 'MEMBER'),

-- Travel Buddies members
('g9999999-9999-9999-9999-999999999999', '99999999-9999-9999-9999-999999999999', 'OWNER'),
('g9999999-9999-9999-9999-999999999999', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'ADMIN'),
('g9999999-9999-9999-9999-999999999999', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'MEMBER'),
('g9999999-9999-9999-9999-999999999999', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'MEMBER'),

-- Music Lovers members
('gaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'OWNER'),
('gaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '11111111-1111-1111-1111-111111111111', 'MEMBER'),
('gaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '55555555-5555-5555-5555-555555555555', 'MEMBER'),
('gaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'MEMBER'),

-- Food Paradise members
('gbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'OWNER'),
('gbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'ADMIN'),
('gbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'MEMBER'),
('gbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'ffffffff-ffff-ffff-ffff-ffffffffffff', 'MEMBER'),

-- Study Group members
('gcccccc-cccc-cccc-cccc-cccccccccccc', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'OWNER'),
('gcccccc-cccc-cccc-cccc-cccccccccccc', 'dddddddd-dddd-dddd-dddd-dddddddddddd', 'ADMIN'),
('gcccccc-cccc-cccc-cccc-cccccccccccc', '33333333-3333-3333-3333-333333333333', 'MEMBER'),
('gcccccc-cccc-cccc-cccc-cccccccccccc', '66666666-6666-6666-6666-666666666666', 'MEMBER');

-- ============================================
-- Insert User Activities (30+ activities)
-- ============================================
INSERT INTO user_activities (user_id, type, metadata) VALUES
-- Admin activities
('11111111-1111-1111-1111-111111111111', 'LOGIN', '{"ip": "192.168.1.1", "device": "Chrome/Windows"}'),
('11111111-1111-1111-1111-111111111111', 'GROUP_CREATED', '{"group_id": "g1111111-1111-1111-1111-111111111111", "group_name": "Team Alpha"}'),
('11111111-1111-1111-1111-111111111111', 'MESSAGE_SENT', '{"group_id": "g1111111-1111-1111-1111-111111111111", "message_count": 5}'),

-- John's activities
('22222222-2222-2222-2222-222222222222', 'LOGIN', '{"ip": "192.168.1.2", "device": "Safari/MacOS"}'),
('22222222-2222-2222-2222-222222222222', 'GROUP_CREATED', '{"group_id": "g2222222-2222-2222-2222-222222222222", "group_name": "Project Beta"}'),
('22222222-2222-2222-2222-222222222222', 'GROUP_JOINED', '{"group_id": "g1111111-1111-1111-1111-111111111111", "group_name": "Team Alpha"}'),
('22222222-2222-2222-2222-222222222222', 'MESSAGE_SENT', '{"group_id": "g2222222-2222-2222-2222-222222222222", "message_count": 3}'),
('22222222-2222-2222-2222-222222222222', 'LOGOUT', '{"duration_minutes": 120}'),

-- Jane's activities
('33333333-3333-3333-3333-333333333333', 'LOGIN', '{"ip": "192.168.1.3", "device": "Firefox/Linux"}'),
('33333333-3333-3333-3333-333333333333', 'GROUP_CREATED', '{"group_id": "g3333333-3333-3333-3333-333333333333", "group_name": "Coffee Lovers"}'),
('33333333-3333-3333-3333-333333333333', 'MESSAGE_SENT', '{"group_id": "g3333333-3333-3333-3333-333333333333", "message_count": 8}'),

-- Bob's activities
('44444444-4444-4444-4444-444444444444', 'LOGIN', '{"ip": "192.168.1.4", "device": "Chrome/Android"}'),
('44444444-4444-4444-4444-444444444444', 'GROUP_CREATED', '{"group_id": "g4444444-4444-4444-4444-444444444444", "group_name": "Tech Talk"}'),
('44444444-4444-4444-4444-444444444444', 'GROUP_JOINED', '{"group_id": "g1111111-1111-1111-1111-111111111111", "group_name": "Team Alpha"}'),
('44444444-4444-4444-4444-444444444444', 'LOGOUT', '{"duration_minutes": 45}'),

-- Alice's activities
('55555555-5555-5555-5555-555555555555', 'LOGIN', '{"ip": "192.168.1.5", "device": "Safari/iOS"}'),
('55555555-5555-5555-5555-555555555555', 'GROUP_CREATED', '{"group_id": "g5555555-5555-5555-5555-555555555555", "group_name": "Gaming Squad"}'),
('55555555-5555-5555-5555-555555555555', 'MESSAGE_SENT', '{"group_id": "g5555555-5555-5555-5555-555555555555", "message_count": 12}'),

-- Charlie's activities
('66666666-6666-6666-6666-666666666666', 'LOGIN', '{"ip": "192.168.1.6", "device": "Chrome/Windows"}'),
('66666666-6666-6666-6666-666666666666', 'GROUP_CREATED', '{"group_id": "g6666666-6666-6666-6666-666666666666", "group_name": "Book Club"}'),
('66666666-6666-6666-6666-666666666666', 'GROUP_JOINED', '{"group_id": "g2222222-2222-2222-2222-222222222222", "group_name": "Project Beta"}'),

-- Emma's activities
('77777777-7777-7777-7777-777777777777', 'LOGIN', '{"ip": "192.168.1.7", "device": "Firefox/Windows"}'),
('77777777-7777-7777-7777-777777777777', 'GROUP_CREATED', '{"group_id": "g7777777-7777-7777-7777-777777777777", "group_name": "Fitness Group"}'),
('77777777-7777-7777-7777-777777777777', 'MESSAGE_SENT', '{"group_id": "g7777777-7777-7777-7777-777777777777", "message_count": 6}'),

-- David's activities
('88888888-8888-8888-8888-888888888888', 'LOGIN', '{"ip": "192.168.1.8", "device": "Chrome/MacOS"}'),
('88888888-8888-8888-8888-888888888888', 'GROUP_CREATED', '{"group_id": "g8888888-8888-8888-8888-888888888888", "group_name": "Movie Fans"}'),
('88888888-8888-8888-8888-888888888888', 'LOGOUT', '{"duration_minutes": 90}'),

-- Sophia's activities
('99999999-9999-9999-9999-999999999999', 'LOGIN', '{"ip": "192.168.1.9", "device": "Safari/iPad"}'),
('99999999-9999-9999-9999-999999999999', 'GROUP_CREATED', '{"group_id": "g9999999-9999-9999-9999-999999999999", "group_name": "Travel Buddies"}'),
('99999999-9999-9999-9999-999999999999', 'GROUP_JOINED', '{"group_id": "g3333333-3333-3333-3333-333333333333", "group_name": "Coffee Lovers"}'),

-- Michael's activities
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'LOGIN', '{"ip": "192.168.1.10", "device": "Chrome/Android"}'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'GROUP_CREATED', '{"group_id": "gaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "group_name": "Music Lovers"}'),
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'MESSAGE_SENT', '{"group_id": "gaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "message_count": 7}');
