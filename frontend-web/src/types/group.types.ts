export enum GroupType {
  PRIVATE = 'PRIVATE',
  PUBLIC = 'PUBLIC',
}

export enum MemberRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  avatarUrl?: string;
  createdBy: string;
  type: GroupType;
  createdAt: string;
  memberCount: number;
}

export interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  role: MemberRole;
  joinedAt: string;
  lastReadAt?: string;
}

export interface CreateGroupRequest {
  name: string;
  description?: string;
  type: GroupType;
  memberIds?: string[];
}
