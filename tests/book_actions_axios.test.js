import { config } from '../framework/config/config'
import UserActionsHelpers from '../framework/helpers/UserActionsHelpers'
import BookActionsHelpers from '../framework/helpers/BooksActionsHelpers'
import { getRandomUserCreds } from '../framework/fuxtures/CredsGen'

describe('Books actions', () => {
  let userUUID
  let authToken
  let creds
  let nameOfUser
  let firstIsbn
  let secondIsbn

  beforeAll(async () => {
    creds = getRandomUserCreds()
    nameOfUser = creds.username

    const responseCreate = await UserActionsHelpers.create({
      userName: nameOfUser,
      password: config.password,
    })

    userUUID = responseCreate.data.userID

    const responseToken = await UserActionsHelpers.post({
      userName: nameOfUser,
      password: config.password,
    })

    authToken = responseToken.data.token
  })

  test('Get All books', async () => {
    const responseBooks = await BookActionsHelpers.getAll()

    expect(responseBooks.status).toBe(200)
    firstIsbn = responseBooks.data.books[0].isbn
    secondIsbn = responseBooks.data.books[1].isbn
  })

  test('Add book', async () => {
    const responseAddBook = await BookActionsHelpers.addBook({
      token: authToken,
      userId: userUUID,
      isbn: firstIsbn,
    })

    expect(responseAddBook.status).toBe(201)
  })

  test('Updating book', async () => {
    const responseUpdate = await BookActionsHelpers.replaceBook(
      firstIsbn,
      userUUID,
      secondIsbn,
      authToken,
    )

    expect(responseUpdate.status).toBe(200)
  })

  test('Get bookinfo', async () => {
    const responseGetInfo = await BookActionsHelpers.getBook(secondIsbn)

    expect(responseGetInfo.status).toBe(200)
  })

  test('Removing book', async () => {
    const responseRemoveBook = await BookActionsHelpers.removeBook({
      userId: userUUID,
      isbn: secondIsbn,
      token: authToken,
    })

    expect(responseRemoveBook.status).toBe(204)
  })
})
