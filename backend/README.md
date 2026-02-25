# Blog Backend (NestJS + TypeORM)

## Setup

1. Install dependencies:
   npm install
2. Copy environment file:
   copy .env.example .env
3. Ensure MySQL database exists (default: `gohar_blog` on `127.0.0.1:3306`)
4. Start dev server:
   npm run start:dev
5. Optional sample content:
   npm run seed:posts

API base URL: `http://localhost:5000`

## Endpoints

- `POST /auth/signup`
- `POST /auth/login`
- `GET /posts?page=1&limit=9`
- `GET /posts?page=1&limit=9&q=physics`
- `GET /posts/slug/:slug`
- `GET /posts/admin/all?limit=100` (admin JWT)
- `GET /posts/admin/:id` (admin JWT)
- `POST /posts` (admin JWT)
- `POST /posts/admin/upload-image` (admin JWT, multipart `file`)
- `PATCH /posts/:id` (admin JWT)
- `DELETE /posts/:id` (admin JWT)
- `POST /student-articles` (public student submission)
- `POST /student-articles/upload-image` (public image upload, multipart `file`)
- `GET /student-articles?page=1&limit=9&q=math` (approved list)
- `GET /student-articles/admin/all?status=pending&page=1&limit=20&q=student` (admin JWT)
- `PATCH /student-articles/admin/:id/approve` (admin JWT)
- `PATCH /student-articles/admin/:id/reject` (admin JWT)

Use `Authorization: Bearer <token>` for admin routes.
