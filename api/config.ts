import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb://localhost/cocktails',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  refreshSecret: process.env.REFRESH_SECRET || 'secret',
  googleClientID: (process.env.CLIENT_ID || '...').trim(),
  googleClientSecret: (process.env.CLIENT_SECRET || '...').trim(),
};

export default config;