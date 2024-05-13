import { config } from '../framework/config/config'
import { faker } from '@faker-js/faker'
import UserActionsHelpers from '../framework/helpers/UserActionsHelpers'

describe('Auth in bookstore', () => {
  let userUUID
  let authToken
  let creds
  let nameOfUser

  beforeAll(async () => {
    function getRandomUsername() {
      return {
        username: faker.internet.userName(),
        password: faker.internet.password(),
      }
    }

    creds = getRandomUsername()
    nameOfUser = creds.username
  })

  test('Successful user creation', async () => {
    // const url = `${config.baseURL}/Account/v1/User`; // Обращение к API вынесено в хелперы, оставил в комментах для понимания принципа работы
    // const response = await axios.post(url, {
    //   userName: config.username,
    //   password: config.password,
    // });

    const responseCreate = await UserActionsHelpers.create({
      userName: nameOfUser,
      password: config.password,
    })

    expect(responseCreate.status).toBe(201)
    userUUID = responseCreate.data.userID
  })

  test('Token successfuly created', async () => {
    const responseToken = await UserActionsHelpers.post({
      userName: nameOfUser,
      password: config.password,
    })

    authToken = responseToken.data.token
    expect(responseToken.data.result).toBe('User authorized successfully.')
    expect(responseToken.status).toBe(200)
  })

  test('Token creation failed', async () => {
    const responseToken = await UserActionsHelpers.post({
      userName: nameOfUser,
      password: '123',
    })
    expect(responseToken.data.status).toBe('Failed')
    expect(responseToken.data.result).toBe('User authorization failed.')
    expect(responseToken.status).toBe(200)
  })

  test('User is already exists', async () => {
    const responseCreate = await UserActionsHelpers.create({
      userName: nameOfUser,
      password: config.password,
    })

    expect(responseCreate.data.message).toBe('User exists!')
    expect(responseCreate.status).toBe(406)
  })

  test('Password does not meet the requirements', async () => {
    const responseCreate = await UserActionsHelpers.create({
      userName: nameOfUser,
      password: '123',
    })

    expect(responseCreate.data.code).toBe('1300')
    expect(responseCreate.status).toBe(400)
  })

  test('Get UserInfo by UUID', async () => {
    const responseUserInfo = await UserActionsHelpers.get({
      userId: userUUID,
      token: authToken,
    })

    expect(responseUserInfo.data.username).toBe(nameOfUser)
    expect(responseUserInfo.status).toBe(200)
  })

  test('Removing user', async () => {
    const responseDelete = await UserActionsHelpers.delete({
      userId: userUUID,
      token: authToken,
    })

    expect(responseDelete.status).toBe(204)
  })

  test('User is not exists anymore', async () => {
    const responseUserInfo = await UserActionsHelpers.get({
      userId: userUUID,
      token: authToken,
    })

    expect(responseUserInfo.data.message).toBe('User not found!')
    expect(responseUserInfo.status).toBe(401)
  })
})
