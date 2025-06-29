# Authentication System Design

A full-stack authentication system built with Next.js 13+ (App Router), MongoDB, and TypeScript.  
Features include user registration, login, logout, email verification, password reset, protected routes, and a modern dark-themed UI.

---

## Features

- User Signup & Login with JWT authentication
- Email verification on registration
- Forgot password & secure password reset via email
- Protected profile routes
- Responsive dark theme UI (Tailwind CSS)
- Toast notifications for user feedback
- Secure server-side API routes
- Environment variable support for secrets and SMTP

---

## Tech Stack

- **Frontend:** Next.js 13+ (App Router), React, Tailwind CSS, TypeScript
- **Backend:** Next.js API routes, MongoDB, Mongoose, JWT, Nodemailer
- **Deployment:** Vercel (recommended)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <GITHUB_LINK>
cd auth-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory and add:

```env
MONGO_URI=your_mongodb_connection_string
TOKEN_SECRET=your_jwt_secret
MAILTRAP_USERID=your_mailtrap_user
MAILTRAP_PASSWORD=your_mailtrap_pass
EMAIL_FROM=your_from_email@example.com
DOMAIN=http://localhost:3000
```

### 4. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deployment

Deploy easily on [Vercel](https://auth-app-nextjs-zeta.vercel.app/login):

- Push your code to GitHub.
- Import your repo on Vercel.
- Add the same environment variables in Vercel dashboard.
- Done!

**Live Demo:**  
[https://auth-app-nextjs-zeta.vercel.app/login]

---

## Screenshots

![Login Page](./public/Screenshot%202025-06-29%20210437.png)

---

## License

MIT

---

## Links

- **GitHub:** [https://github.com/Javed1301/auth-app-Nextjs-]
- **Live Deployment:** [https://auth-app-nextjs-zeta.vercel.app/login]