import 'reflect-metadata';
import express from 'express';
import dataSource from './ormconfig';
import { User } from './entity/User';

const app = express();
const PORT = 3000;

const attemptConnection = async (retries = 5, delay = 5000) => {
  while (retries) {
    try {
      await dataSource.initialize();
      console.log('Connected to the database');

      app.use(express.json());

      app.get('/', async (req, res) => {
        const users = await dataSource.getRepository(User).find();
        res.json(users);
      });

      app.post('/users', async (req, res) => {
        const userRepository = dataSource.getRepository(User);
        const user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        await userRepository.save(user);
        res.status(201).json(user);
      });

      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
      break;
    } catch (error) {
      console.error('Error connecting to the database:', error);
      retries -= 1;
      console.log(`Retries left: ${retries}`);
      if (!retries) throw error;
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

attemptConnection();
