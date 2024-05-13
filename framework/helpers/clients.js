import axios from 'axios'
import { config } from '../config/config'

const clientBookstore = axios.create({
  baseURL: config.baseURL,
  validateStatus: function (status) {
    return status < 500
  },
})

export { clientBookstore }
