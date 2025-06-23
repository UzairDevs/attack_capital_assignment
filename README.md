# attack_capital_assignment

# Personal Blog Platform

A full-stack personal blogging platform built with:

- **Backend**: Node.js, Express, Prisma, PostgreSQL, JWT  
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS

---

## 🗂️ Repository Structure

blog-platform/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── index.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   └── post.controller.ts
│   │   ├── middleware/
│   │   │   └── auth.middleware.ts
│   │   ├── models/
│   │   │   └── index.ts
│   │   ├── routes/
│   │   │   ├── auth.route.ts
│   │   │   └── post.route.ts
│   │   ├── utils/
│   │   │   └── apiError.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── signup/
│   │   │       └── page.tsx
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── SignupForm.tsx
│   │   │   ├── layout/
│   │   │   │   ├── Footer.tsx
│   │   │   │   ├── Header.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── post/
│   │   │   │   ├── CreatePostForm.tsx
│   │   │   │   ├── PostCard.tsx
│   │   │   │   └── PostList.tsx
│   │   │   └── ui/
│   │   │       └── Button.tsx
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   └── utils.ts
│   │   ├── page.tsx
│   │   └── layout.tsx
│   ├── public/
│   │   └── logo.svg
│   ├── styles/
│   │   └── globals.css
│   ├── tailwind.config.js
│   ├── next.config.js
│   ├── package.json
│   └── tsconfig.json
└── README.md
yaml
Copy
Edit

---

##  Getting Started

### Prerequisites

- Node.js v18+  
- PostgreSQL  

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd root
Backend
bash
Copy
Edit
cd backend
npm install
npx prisma generate
Frontend
bash
Copy
Edit
cd ../frontend
npm install
2. Environment Variables
Create a .env in backend/ with:

env
Copy
Edit
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
JWT_SECRET="a_strong_random_secret"
PORT=4000
Make sure your PostgreSQL database is running and the connection string is correct.

3. Database Setup & Migrate
bash
Copy
Edit
cd backend
npx prisma migrate dev --name init
This will apply the schema and spin up the database tables.

4. Run Locally
Start Backend
bash
Copy
Edit
cd backend
npm run dev
By default, your API will be on http://localhost:4000/api.

Start Frontend
bash
Copy
Edit
cd frontend
npm run dev
Browse to http://localhost:3000.

🔧 Scripts
Package	Script	Description
backend	npm run dev	Start dev server (ts-node-dev)
npm run build	Compile TypeScript to JS
npm run start	Run the compiled JS (production)
npx prisma	Prisma CLI (migrate, studio, etc.)
frontend	npm run dev	Start Next.js dev server
npm run build	Build for production
npm run start	Start Next.js in production mode

API Endpoints
Auth
POST /api/auth/signup
Request body: { email: string, password: string }
→ Creates a new user.

POST /api/auth/login
Request body: { email: string, password: string }
→ Returns { token: string }.

Posts
GET /api/posts
→ Returns all posts, newest first.

GET /api/posts?author=<userId>
→ Returns only posts by that author.

POST /api/posts
Headers: Authorization: Bearer <token>
Body: { title: string, content: string }
→ Creates a new post for the authenticated user.

 Technologies & Choices
Express + Prisma
Prisma’s type-safe client makes DB queries easier and safer.

JWT Auth
Stateless sessions stored in client-side tokens.

Next.js App Router
SSR on the homepage, client-side navigation, and static generation for individual post pages (if you extend).

Tailwind CSS
Utility-first styling for a clean, responsive SAAS look.

TypeScript
End-to-end type safety on both client and server.

🛡Security Considerations
Passwords are hashed with bcrypt.

JWTs are signed with a strong secret.

Protected routes verify the token on every request.
