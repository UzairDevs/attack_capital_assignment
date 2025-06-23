import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 3001,
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/blogdb'
};