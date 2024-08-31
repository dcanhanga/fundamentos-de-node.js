import { buildRoutePath } from "./utils/build-route-path.js"
import { Database } from "./database.js"
import { randomUUID } from 'node:crypto'

const database = new Database()

export const routes = [
  {
    method: 'GET',
    url: buildRoutePath('/users'),

    handler: (req, res) => {
      const search = req.query.search
      const users = database.select('users', {
        name: search, email: search})
      return res.end(JSON.stringify(users))
    }
  },
    {
    method: 'GET',
    url: buildRoutePath('/users/:id'),

    handler: (req, res) => {
      const users = database.select('users', {id: req.params.id})
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

    handler: (req, res) => {
      database.delete('users', req.params.id)
      return res.writeHead(204).end()
    }
  },
      {
    method: 'PUT',
    url: buildRoutePath('/users/:id'),

        handler: (req, res) => {
      const { name, email } = req.body
      database.update('users',req.params.id, { name, email})
      return res.writeHead(204).end()
    }
  }
]
