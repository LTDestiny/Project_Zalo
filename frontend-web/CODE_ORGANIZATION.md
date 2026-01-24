# Code Organization Guide

Tài liệu này mô tả cách tổ chức code đã được tái cấu trúc để dễ bảo trì và tái sử dụng.

## 📁 Cấu trúc thư mục

```
src/
├── components/         # React components
├── constants/         # Hằng số và cấu hình
├── hooks/            # Custom React hooks
├── services/         # API services
├── store/            # Redux store
├── styles/           # Styles và themes
├── types/            # TypeScript types/interfaces
└── utils/            # Utility functions
```

## 🔧 Utils (Tiện ích)

### `dateFormatter.ts`

Các hàm format ngày tháng và thời gian

```typescript
import {
  formatDate,
  formatTime,
  formatLastSeen,
  formatChatTimestamp,
  getRelativeTime,
} from "@/utils";

// Format ngày
const formattedDate = formatDate("2024-01-24"); // "24 tháng 1, 2024"

// Format thời gian tin nhắn
const time = formatTime(Date.now()); // "14:30"

// Format lần hoạt động cuối
const lastSeen = formatLastSeen("2024-01-24T10:00:00"); // "2 giờ trước"

// Format timestamp cho chat
const chatTime = formatChatTimestamp(Date.now()); // "Vừa xong" hoặc "14:30"

// Lấy thời gian tương đối
const relative = getRelativeTime(Date.now() - 3600000); // "1 giờ trước"
```

### `userUtils.ts`

Các hàm tiện ích liên quan đến user

```typescript
import {
  getStatusColor,
  getStatusText,
  getUserInitials,
  getDisplayName,
  isUserOnline,
} from "@/utils";
import { UserStatus } from "@/types/user.types";

// Lấy màu trạng thái
const color = getStatusColor(UserStatus.ONLINE); // "bg-green-500"

// Lấy text trạng thái
const text = getStatusText(UserStatus.ONLINE); // "Đang hoạt động"

// Lấy chữ cái đầu tiên
const initials = getUserInitials("Nguyen Van A"); // "NA"

// Lấy tên hiển thị
const name = getDisplayName(user); // displayName hoặc username

// Kiểm tra online
const online = isUserOnline(user.status); // true/false
```

### `stringUtils.ts`

Các hàm xử lý chuỗi

```typescript
import {
  truncateText,
  capitalizeFirst,
  matchesSearch,
  getAvatarColor,
  isValidEmail,
  formatFileSize,
} from "@/utils";

// Cắt ngắn text
const short = truncateText("Very long text...", 10); // "Very long..."

// Viết hoa chữ cái đầu
const capitalized = capitalizeFirst("hello"); // "Hello"

// Tìm kiếm (case-insensitive)
const matches = matchesSearch("Hello World", "hello"); // true

// Lấy màu avatar ngẫu nhiên (nhưng consistent)
const color = getAvatarColor(userId); // "from-blue-400 to-blue-600"

// Validate email
const valid = isValidEmail("test@example.com"); // true

// Format kích thước file
const size = formatFileSize(1024); // "1 KB"
```

## 🪝 Custom Hooks

### `useUserStatus`

Quản lý trạng thái online/offline của user

```typescript
import { useUserStatus } from "@/hooks";

function MyComponent() {
  const { updateStatus } = useUserStatus();

  // Tự động set ONLINE khi mount
  // Tự động set OFFLINE khi unmount

  // Thay đổi status thủ công
  const handleAway = () => {
    updateStatus(UserStatus.AWAY);
  };
}
```

### `useDebounce`

Debounce một giá trị

```typescript
import { useDebounce } from "@/hooks";

function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    // API call chỉ chạy sau 500ms user ngừng gõ
    searchAPI(debouncedSearch);
  }, [debouncedSearch]);
}
```

### `useClickOutside`

Phát hiện click bên ngoài element

```typescript
import { useClickOutside } from "@/hooks";
import { useRef } from "react";

function Dropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  return <div ref={dropdownRef}>...</div>;
}
```

### `useLocalStorage`

Lưu trữ state vào localStorage

```typescript
import { useLocalStorage } from "@/hooks";

function ThemeComponent() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  // theme tự động sync với localStorage
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle Theme
    </button>
  );
}
```

### `useInterval`

Chạy callback theo interval

```typescript
import { useInterval } from "@/hooks";

function AutoRefresh() {
  useInterval(() => {
    fetchData();
  }, 30000); // Refresh mỗi 30 giây

  // Pass null để dừng interval
  useInterval(
    () => {
      fetchData();
    },
    isActive ? 30000 : null,
  );
}
```

## 📝 Types

### `chat.types.ts`

Types cho chat và conversation

```typescript
import { ChatItem, ChatType } from "@/types/chat.types";

const chat: ChatItem = {
  id: "user-123",
  name: "Nguyen Van A",
  avatar: "https://...",
  lastMessage: "Hello",
  timestamp: "2024-01-24T10:00:00",
  unreadCount: 3,
  isOnline: true,
  isFriend: true,
};
```

### `user.types.ts`

Types cho user (đã có sẵn, được mở rộng)

```typescript
import { User, UserStatus, UserRole } from "@/types/user.types";
```

### `message.types.ts`

Types cho message (đã có sẵn)

```typescript
import {
  Message,
  MessageType,
  MessageStatus,
  Conversation,
} from "@/types/message.types";
```

## 🔢 Constants

### API Endpoints

```typescript
import { API_ENDPOINTS } from "@/constants";

// Sử dụng
fetch(API_ENDPOINTS.AUTH.LOGIN);
fetch(API_ENDPOINTS.USER.PROFILE);
```

### Storage Keys

```typescript
import { STORAGE_KEYS } from "@/constants";

localStorage.getItem(STORAGE_KEYS.TOKEN);
localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
```

### Intervals

```typescript
import { REFRESH_INTERVALS } from "@/constants";

setInterval(fetchUsers, REFRESH_INTERVALS.USER_LIST);
```

## 📖 Ví dụ sử dụng

### Component với utils và hooks

```typescript
import React, { useState } from "react";
import { useUserStatus, useDebounce } from "@/hooks";
import { formatChatTimestamp, getUserInitials, getStatusColor } from "@/utils";
import { ChatItem } from "@/types/chat.types";

export const ChatComponent = () => {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const { updateStatus } = useUserStatus();

  const renderChat = (chat: ChatItem) => (
    <div key={chat.id}>
      <div className="avatar">
        {getUserInitials(chat.name)}
      </div>
      <div className={getStatusColor(chat.isOnline ? "ONLINE" : "OFFLINE")} />
      <span>{formatChatTimestamp(chat.timestamp)}</span>
    </div>
  );

  return <div>...</div>;
};
```

## 🎯 Lợi ích

1. **Tái sử dụng code**: Các function và hook có thể dùng ở nhiều nơi
2. **Dễ bảo trì**: Logic tập trung ở một nơi, dễ update
3. **Type-safe**: TypeScript đảm bảo type safety
4. **Consistent**: Format và behavior nhất quán trong toàn app
5. **Testable**: Dễ viết unit test cho utils và hooks

## 📚 Best Practices

1. **Luôn import từ barrel file**: `import { formatDate } from "@/utils"` thay vì `import { formatDate } from "@/utils/dateFormatter"`
2. **Sử dụng types**: Import types từ `@/types` để đảm bảo consistency
3. **Tái sử dụng hooks**: Ưu tiên sử dụng custom hooks có sẵn trước khi tạo mới
4. **Constants**: Sử dụng constants thay vì hard-code values
5. **Documentation**: Thêm JSDoc comments cho functions phức tạp

## 🔄 Migration Guide

### Trước khi refactor:

```typescript
// ❌ Duplicate code
const formatTime = (timestamp: number) => {
  // Same logic in multiple files
};

// ❌ Inline logic
const initials = user.name.charAt(0).toUpperCase();

// ❌ Hard-coded values
setInterval(fetchData, 30000);
```

### Sau khi refactor:

```typescript
// ✅ Sử dụng utils
import { formatTime, getUserInitials } from "@/utils";
import { REFRESH_INTERVALS } from "@/constants";

const time = formatTime(timestamp);
const initials = getUserInitials(user.name);
setInterval(fetchData, REFRESH_INTERVALS.USER_LIST);
```
