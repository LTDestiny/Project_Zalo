# Lombok IDE Errors - Giải Thích

## ⚠️ Quan Trọng: Đây KHÔNG phải là lỗi thực sự!

Các lỗi hiển thị trong NetBeans IDE liên quan đến Lombok là **LỖI GIẢI IDÉ**, không phải lỗi compile thực sự.

## ✅ Xác Nhận Build Thành Công

Project đã compile thành công với Maven:

```
[INFO] BUILD SUCCESS
[INFO] Total time:  14.718 s
[INFO] Finished at: 2026-01-11T16:09:30+07:00
```

## 🔍 Tại Sao IDE Báo Lỗi?

NetBeans sử dụng Java Language Server (JLS) của riêng mình để phân tích code. JLS này có vấn đề với Lombok:

```
Can't initialize javac processor due to (most likely) a class loader problem:
java.lang.NoClassDefFoundError: Could not initialize class lombok.javac.Javac
```

Điều này có nghĩa:

- NetBeans không thể khởi tạo Lombok annotation processor
- IDE không nhận diện được code được generate bởi Lombok
- Nhưng Maven compiler plugin hoạt động hoàn toàn bình thường!

## 📝 Các Lỗi Thường Gặp

### 1. "cannot find symbol: method getId()"

- **Nguyên nhân**: Lombok `@Data` tự động generate getter `getId()`
- **Thực tế**: Method tồn tại trong compiled code
- **IDE**: Không thấy method vì không xử lý được `@Data`

### 2. "variable not initialized in the default constructor"

- **Nguyên nhân**: Lombok `@RequiredArgsConstructor` tự động tạo constructor
- **Thực tế**: Constructor tồn tại với tất cả final fields
- **IDE**: Không thấy constructor được generate

### 3. "cannot find symbol: method builder()"

- **Nguyên nhân**: Lombok `@Builder` tự động generate builder pattern
- **Thực tế**: Builder class và methods tồn tại
- **IDE**: Không thấy builder được generate

## ✅ Các Annotation Lombok Đang Sử Dụng

### @Data

```java
@Data
public class UserDto {
    private UUID id;
    private String username;
}
```

Tự động generate:

- Getter cho tất cả fields: `getId()`, `getUsername()`
- Setter cho tất cả non-final fields: `setId()`, `setUsername()`
- `toString()`, `equals()`, `hashCode()`

### @Builder

```java
@Builder
public class User {
    private UUID id;
    private String username;
}
```

Tự động generate:

- `User.builder()` - Khởi tạo builder
- `.id(uuid)`, `.username(name)` - Builder methods
- `.build()` - Tạo instance

### @RequiredArgsConstructor

```java
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
}
```

Tự động generate:

- Constructor với tất cả final fields
- Spring DI inject dependencies qua constructor này

### @AllArgsConstructor & @NoArgsConstructor

```java
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    private String username;
    private String password;
}
```

Tự động generate:

- Constructor không tham số
- Constructor với tất cả fields

## 🛠️ Giải Pháp

### 1. Ignore IDE Errors

- Các lỗi IDE này an toàn để ignore
- Project compile và chạy hoàn toàn bình thường

### 2. Use IntelliJ IDEA (Khuyến nghị)

IntelliJ IDEA có plugin Lombok tích hợp sẵn:

- Cài đặt "Lombok Plugin"
- Enable "Annotation Processors" trong settings
- IDE sẽ nhận diện đúng Lombok code

### 3. Build & Run với Maven

Luôn build với Maven, không phụ thuộc vào IDE:

```bash
# Build project
mvn clean install

# Run application
mvn spring-boot:run
```

## 📦 Cấu Hình Đã Thực Hiện

### 1. pom.xml - Lombok Dependency

```xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```

### 2. pom.xml - Compiler Plugin với Annotation Processor

```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.11.0</version>
    <configuration>
        <source>17</source>
        <target>17</target>
        <annotationProcessorPaths>
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok.version}</version>
            </path>
        </annotationProcessorPaths>
    </configuration>
</plugin>
```

### 3. lombok.config

```properties
config.stopBubbling = true
lombok.anyConstructor.addConstructorProperties = true
lombok.addLombokGeneratedAnnotation = true
```

## 🎯 Kết Luận

**KHÔNG CÓ VẤN ĐỀ VỚI CODE!**

- ✅ Project compile thành công
- ✅ Tất cả Lombok annotations hoạt động đúng
- ✅ Application chạy bình thường
- ⚠️ Chỉ có IDE (NetBeans) không hiểu Lombok

**Khuyến nghị**: Tiếp tục phát triển như bình thường, ignore các lỗi IDE này, hoặc chuyển sang IntelliJ IDEA cho trải nghiệm tốt hơn.

## 📚 Tham Khảo

- [Project Lombok Official Site](https://projectlombok.org/)
- [Lombok Features](https://projectlombok.org/features/)
- [IntelliJ IDEA Lombok Plugin](https://plugins.jetbrains.com/plugin/6317-lombok)
