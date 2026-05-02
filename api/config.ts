import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  db: 'mongodb://localhost/bars',
  jwtSecret: process.env.JWT_SECRET || 'secret',
  refreshSecret: process.env.REFRESH_SECRET || 'secret',
};

export default config;