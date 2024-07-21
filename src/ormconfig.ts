import { DataSource } from 'typeorm';
import { User } from './entity/User';

const dataSource = new DataSource({
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'user',
  password: 'password',
  database: 'mydb',
  entities: [User],
  synchronize: true,
});

export default dataSource;
