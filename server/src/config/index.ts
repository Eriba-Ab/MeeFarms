import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 3001,
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/meefarms',
  jwtSecret: process.env.JWT_SECRET || 'supersecretjwtkey',
};
