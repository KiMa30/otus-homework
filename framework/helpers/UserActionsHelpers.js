import { clientBookstore } from './clients'

const userCreate = async ({ userName, password }) => {
  const response = await clientBookstore.post(`/Account/v1/User`, {
    userName,
    password,
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

const tokenGen = async ({ userName, password }) => {
  const response = await clientBookstore.post(`/Account/v1/GenerateToken`, {
    userName,
    password,
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

const userInfo = async ({ userId, token }) => {
  const response = await clientBookstore.get(`/Account/v1/User/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

const userDelete = async ({ userId, token }) => {
  const response = await clientBookstore.delete(`/Account/v1/User/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

export default {
  create: userCreate,
  post: tokenGen,
  get: userInfo,
  delete: userDelete,
}
