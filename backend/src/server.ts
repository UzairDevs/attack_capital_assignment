import app from './app';
import config from './config';
import prisma from './models';

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('Database connected');
    
    app.listen(config.port, () => {
      console.log(`Server running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('Failed to connect to database', error);
    process.exit(1);
  }
};

startServer();