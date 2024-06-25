import { faker } from '@faker-js/faker'

function getRandomUserCreds() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  }
}

export { getRandomUserCreds }
