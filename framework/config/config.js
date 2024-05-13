import 'dotenv/config'
// import dotenv from 'dotenv';

// dotenv.config();

const config = {
  baseURL: process.env.TEST_BASE_API_URL,
  username: process.env.TEST_USERNAME,
  password: process.env.TEST_PASSWORD,
}

export { config }
