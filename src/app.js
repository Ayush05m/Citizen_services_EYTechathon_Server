import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from "helmet";
// import cookieParser from "cookie-parser";
import compression from "compression";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

// Regular routes
import authRoutes from './routes/auth.js';
import schemeRoutes from './routes/schemes.js';
import documentRoutes from './routes/documents.js';
import userRoutes from './routes/users.js';

// Admin routes
import adminAuthRoutes from './routes/admin/auth.js';
import adminSchemeRoutes from './routes/admin/schemes.js';
import adminUserRoutes from './routes/admin/users.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// Security middleware
app.use(helmet());
app.use(mongoSanitize());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use("/api", limiter);

// Regular API routes
app.use('/api/auth', authRoutes);
app.use('/api/schemes', schemeRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/users', userRoutes);

// Admin API routes
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/admin/schemes', adminSchemeRoutes);
app.use('/api/admin/users', adminUserRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 