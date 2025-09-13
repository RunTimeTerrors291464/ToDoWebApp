# 📝 Todo App (Next.js + REST API)

Ứng dụng Todo đơn giản với các chức năng **đăng ký, đăng nhập, đăng xuất, quản lý công việc (CRUD)**.  
Frontend được xây dựng bằng **Next.js 13 App Router** + **TailwindCSS**, backend cung cấp API RESTful.
---

## 🚀 Tính năng

- **Xác thực**
  - Đăng ký, đăng nhập, đăng xuất
  - Cookie httpOnly để duy trì đăng nhập sau khi refresh
- **Quản lý Task**
  - Thêm, sửa, xoá task
  - Trường: `title`, `description`, `priority`, `status`, `createdAt`
- **Dashboard**
  - Bảng hiển thị task
  - Tìm kiếm theo `title`
  - Lọc theo `priority` & `status`
  - Sắp xếp theo `title`, `priority`, `status`, `createdAt`
  - Phân trang
- **UI**
  - Modal form tạo/sửa task
  - Navbar với logo + user info
  - Animation bằng Framer Motion

---

## 🛠️ Tech Stack

- [Next.js 13 (App Router)](https://nextjs.org/)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Zustand](https://zustand-demo.pmnd.rs/) – state management
- [Axios](https://axios-http.com/) – gọi API
- [React Hot Toast](https://react-hot-toast.com/) – thông báo

---

## 📂 Cấu trúc thư mục

```

todo-app-client/
├── public/            # Logo, favicon
├── src/
│   ├── app/           # Next.js app router
│   │   ├── login/     # Trang đăng nhập
│   │   ├── register/  # Trang đăng ký
│   │   └── dashboard/ # Trang dashboard
│   ├── components/    # Navbar, TaskTable, TaskFormModal, UI components
│   └── lib/           # useAuth, useTasks, api.ts, validators
├── tailwind.config.ts
└── README.md

````

---

## ⚙️ Cài đặt

### 1. Clone repo
```bash
git clone https://github.com/RunTimeTerrors291464/ToDoWebApp.git
cd todo-app-client
````

### 2. Cài dependencies

```bash
npm install
# hoặc
yarn install
```

### 3. Tạo file môi trường

Tạo `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### 4. Chạy dev

```bash
npm run dev
```

Truy cập: [http://localhost:3000](http://localhost:3000)

---
## 🚀 Hướng dẫn setup & chạy project với Docker

### 1. Yêu cầu
- [Docker](https://www.docker.com/) đã được cài đặt trên máy.

### 2. Build và chạy container

Chạy các lệnh sau trong thư mục gốc của project:

```bash
# Build image
docker build -t todo-app-client .

# Chạy container
docker run -p 3000:3000 --env-file .env.production todo-app-client
```

Hoặc sử dụng docker-compose:

```bash
docker-compose up -d
```

### 3. Truy cập ứng dụng

Sau khi container chạy thành công, truy cập vào: [http://localhost:3000](http://localhost:3000)

### 4. Một số lệnh Docker hữu ích

- Xem các container đang chạy:
  ```bash
  docker ps
  ```
- Dừng container:
  ```bash
  docker stop <container_id>
  ```
- Xem logs:
  ```bash
  docker logs <container_id>
  ```
---

## 🔑 API Backend

### Login

```
POST /api/auth/login
Cookie: accessToken (httpOnly)
```

### Register

```
POST /api/auth/register
```

### Fetch tasks

```
GET /api/list/pagination?page=1&limit=5&sortBy=title&sortOrder=ASC&priority=2&status=0&search=abc
Cookie: accessToken (httpOnly)
```

### Create task

```
POST /api/list/create
Cookie: accessToken (httpOnly)
```

### Update task

```
PUT /api/list/edit?id=<taskId>
Cookie: accessToken (httpOnly)
```

### Delete task

```
DELETE /api/list/delete?id=<taskId>
Cookie: accessToken (httpOnly)
```

---

## ✅ Ghi chú

* App chỉ lưu session bằng cookie httpOnly → không lưu token ở localStorage.
* Khi deploy production, nhớ bật `secure: true` cho cookie (`SameSite=None; Secure`).

---

## 📜 License

MIT
