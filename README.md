# Contact Manager

A full-stack contact management application built with Next.js and Express.js, featuring secure authentication and CRUD operations for managing personal contacts.

## Features

- **User Authentication**: Secure registration and login system with JWT tokens
- **Contact Management**: Create, read, update, and delete contacts
- **Protected Routes**: Authentication middleware securing all contact endpoints
- **Modern UI**: Clean, responsive dark-themed interface built with Tailwind CSS
- **Real-time Validation**: Client and server-side form validation
- **Secure Password Hashing**: bcrypt integration for password security

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library with hooks and modern features
- **Tailwind CSS 4** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **React Compiler** - Optimized rendering performance

### Backend
- **Express.js 5** - Web framework for Node.js
- **MongoDB** - NoSQL database via Mongoose ODM
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing and comparison
- **CORS** - Cross-origin resource sharing middleware

## Project Structure

```
contact-manager/
├── backend/
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Auth middleware
│   ├── models/           # Mongoose schemas
│   ├── routes/           # API routes
│   ├── .env              # Environment variables
│   └── server.js         # Entry point
└── frontend/
    ├── app/
    │   ├── dashboard/    # Contact dashboard page
    │   ├── login/        # Login page
    │   ├── register/     # Registration page
    │   └── layout.js     # Root layout
    └── utils/
        └── api.js        # Axios instance with interceptors
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account or local MongoDB instance
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd contact-manager
```

2. **Setup Backend**
```bash
cd backend
npm install
```

3. **Configure Backend Environment**

Create `backend/.env`:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret
PORT=5000
```

4. **Start Backend Server**
```bash
npm start
# Or for development with nodemon:
nodemon server.js
```

5. **Setup Frontend**
```bash
cd ../frontend
npm install
```

6. **Configure Frontend API URL**

Edit `frontend/utils/api.js` and update the `baseURL`:
```javascript
baseURL: 'http://localhost:5000/api'  // For local development
```

7. **Start Frontend Development Server**
```bash
npm run dev
```

8. **Access the Application**

Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Contacts (Protected)
- `GET /api/contacts` - Get all user contacts
- `POST /api/contacts` - Create new contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact

All contact endpoints require JWT token in Authorization header.

## Deployment

### Backend (Render/Railway)
1. Push code to GitHub
2. Create new Web Service on Render
3. Set environment variables (MONGODB_URI, JWT_SECRET, PORT)
4. Deploy from GitHub repository

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Update `frontend/utils/api.js` with production backend URL
4. Deploy

### Database (MongoDB Atlas)
1. Create free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Add database user and whitelist IP (0.0.0.0/0 for all IPs)
3. Copy connection string to `MONGODB_URI`

## Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key_here
PORT=5000
```

### Frontend (Vercel)
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
```

## Security Features

- Password hashing with bcrypt (salt rounds: 10)
- JWT token expiration (7 days)
- Protected API routes with authentication middleware
- CORS configuration for trusted origins
- Input validation on client and server
- Secure MongoDB connection with credentials

## Common Issues & Solutions

### Issue: Vercel frontend can't connect to backend
**Solution**: Ensure `baseURL` in `frontend/utils/api.js` includes `/api` path and matches your deployed backend URL.

### Issue: CORS errors
**Solution**: Update CORS origin in `backend/server.js` to include your Vercel domain.

### Issue: Render free tier backend sleeping
**Solution**: Use a cron service like [cron-job.org](https://cron-job.org) to ping `/api/test` every 10 minutes.

### Issue: MongoDB connection timeout
**Solution**: Whitelist all IPs (0.0.0.0/0) in MongoDB Atlas Network Access settings.

## License

ISC

## Author

Built as a full-stack learning project demonstrating modern web development practices.
