// import axios from 'axios';
import { config } from '../frameworks/config/config';
import axios from 'axios';

describe('Auth in bookstore', () => {
  let userUUID;
  let authToken;
  test('Successful user creation', async () => {
    const url = `${config.baseURL}/Account/v1/User`;
    const response = await axios.post(url, {
      userName: config.username,
      password: config.password,
    });

    expect(response.status).toBe(201)
    userUUID = response.data.userID
  })

  test('Token successfuly created', async () => {
    const url = `${config.baseURL}/Account/v1/GenerateToken`
    const response = await axios.post(url, {
      userName: config.username,
      password: config.password,
    });

    authToken = response.data.token
    expect(response.data.result).toBe('User authorized successfully.')
    expect(response.status).toBe(200)
  })

  test('Auth failed', async () => {
    const url = `${config.baseURL}/Account/v1/GenerateToken`
    const response = await axios.post(url, {
      userName: config.username,
      password: '123',
    });
    
    expect(response.data.status).toBe('Failed')
    expect(response.data.result).toBe('User authorization failed.')
    expect(response.status).toBe(200)
  })

  test('User is already exists', async () => {
    const url = `${config.baseURL}/Account/v1/User`;
    const response = await axios.post(url, {
      userName: config.username,
      password: config.password,
    }, {
      validateStatus: function (status) {
        return status < 500;
      }
    });

    expect(response.data.message).toBe('User exists!')
    expect(response.status).toBe(406)
  })

  test('Password does not meet the requirements', async () => {
    const url = `${config.baseURL}/Account/v1/User`
    const response = await axios.post(url, {
      userName: config.username,
      password: '123',
      }, {
          validateStatus: function (status) {
            return status < 500;
          }
      });
    
    expect(response.data.code).toBe('1300')
    expect(response.status).toBe(400)
  })

  test('Get UserInfo by UUID', async () => {
    const url = `${config.baseURL}/Account/v1/User/${userUUID}`
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
    
    expect(response.data.username).toBe(config.username)
    expect(response.status).toBe(200)
  })

  test('Removing user', async () => {
    const url = `${config.baseURL}/Account/v1/User/${userUUID}`
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })

    expect(response.status).toBe(204)
  })

  test('Repeat removing user', async () => {
    const url = `${config.baseURL}/Account/v1/User/${userUUID}`
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })

    expect(response.status).toBe(200)
    expect(response.data.message).toBe('User Id not correct!')
  })
})

  