# To-Do List API

Ứng dụng API quản lý danh sách công việc (To-Do List) được xây dựng bằng NestJS và PostgreSQL.

## 📋 Tính năng

### 🔐 Xác thực người dùng (Authentication)
- Đăng ký tài khoản mới
- Đăng nhập với JWT token
- Bảo vệ API endpoints với JWT Guard
- Lưu trữ token trong HTTP-only cookies

### 📝 Quản lý danh sách công việc (To-Do Management)
- Tạo công việc mới
- Chỉnh sửa công việc
- Xem danh sách công việc với phân trang
- Xem chi tiết công việc theo ID
- Xóa công việc
- Phân loại độ ưu tiên: NONE, LOW, MEDIUM, HIGH, URGENT
- Trạng thái công việc: TODO, IN_PROGRESS, COMPLETED, CANCELLED

## 🛠 Công nghệ sử dụng

- **Backend Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Token)
- **Password Hashing**: bcrypt
- **Validation**: class-validator, class-transformer
- **Containerization**: Docker & Docker Compose

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js 20+
- Docker & Docker Compose
- PostgreSQL 

### 1. Clone repository
```bash
git clone <repository-url>
cd <folder-name>
```

### 2. Tạo file .env
Tạo file `.env` từ `.env.example`:
```bash
cp .env.example .env
```

Cập nhật các biến môi trường:
```env
NODE_ENV=<production || development>
HOST_IP=<IP của server>
PORT=3001

# PostgreSQL Database
DB_HOST=your-db-host
DB_PORT=5432
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=your-db-name

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# CORS
ALLOWED_ORIGINS=*
```

### 3. Cài đặt postgreSQL thủ công (Sẽ thay đổi sớm)
- Đọc document ở đây https://docs.google.com/document/d/1T3RD--GT-g5n5NRH2IBii5-O8I11iwXW/edit?usp=drive_link&ouid=116769113173522098529&rtpof=true&sd=true
- Trong phần 2, hãy tạo các table tương ứng.

### 4. Chạy với Docker (Khuyến nghị)
```bash
# Build và chạy container
docker compose up --build

# Chạy trong background
docker compose up -d
```

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/auth/register` | Đăng ký tài khoản mới |
| POST | `/api/auth/login` | Đăng nhập |

### To-Do Lists (Yêu cầu xác thực)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/list/create` | Tạo công việc mới |
| PUT | `/api/list/edit?id={id}` | Chỉnh sửa công việc |
| GET | `/api/list/pagination` | Lấy danh sách công việc với phân trang |
| GET | `/api/list/id?id={id}` | Lấy chi tiết công việc theo ID |
| DELETE | `/api/list/id?id={id}` | Xóa công việc |

### Ví dụ Request/Response

#### Đăng ký tài khoản
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "password": "secure123"
}
```
