import { buildRoutePath } from "./build-route-path.js"
import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'

const database = new Database()

/**
 * @type {Array<{method: string, url: string, handler: (req: import('http').IncomingMessage, res: import('http').ServerResponse) => void}>}
 */
export const routes = [
  {
    method: 'GET',
    url: buildRoutePath('/users'),
    /**
     * @param {import('http').IncomingMessage}
     * @param {import('http').ServerResponse} HTTP.
     * @returns {void}
     */
    handler: (req, res) => {
      const users = database.select('users')
      return res.end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    url: buildRoutePath('/users'),
    /**
     * @param {import('http').IncomingMessage}
     * @param {import('http').ServerResponse}
     * @returns {void}
     */
    handler: (req, res) => {
      const { name, email } = req.body
      const user = {
        id: randomUUID(),
        name,
        email
      }
      database.insert('users', user)
      return res.writeHead(201).end()
    }
  },
   {
    method: 'DELETE',
    url: buildRoutePath('/users/:id'),
    /**
     * @param {import('http').IncomingMessage}
     * @param {import('http').ServerResponse}
     * @returns {void}
     */
    handler: (req, res) => {

      return res.writeHead(201).end()
    }
  }
]
