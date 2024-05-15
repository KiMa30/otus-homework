import { clientBookstore } from './clients'

const getAllBooks = async () => {
  const response = await clientBookstore.get(`/BookStore/v1/Books`)

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

const addBookList = async ({ token, userId, isbn }) => {
  const response = await clientBookstore.post(
    `/BookStore/v1/Books`,
    {
      userId,
      collectionOfIsbns: [{ isbn }],
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

const replaceBookToAnother = async (oldIsbn, userId, isbn, token) => {
  const response = await clientBookstore.put(
    `/BookStore/v1/Books/${oldIsbn}`,
    {
      userId,
      isbn,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

const getBookinfoByIsnb = async isbn => {
  const response = await clientBookstore.get(`/BookStore/v1/Book`, {
    params: {
      ISBN: isbn,
    },
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

const removeBookFromList = async ({ token, isbn, userId }) => {
  const response = await clientBookstore.delete(`/BookStore/v1/Book`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      isbn,
      userId,
    },
  })

  return {
    headers: response.headers,
    status: response.status,
    data: response.data,
  }
}

export default {
  getAll: getAllBooks,
  addBook: addBookList,
  removeBook: removeBookFromList,
  replaceBook: replaceBookToAnother,
  getBook: getBookinfoByIsnb,
}
