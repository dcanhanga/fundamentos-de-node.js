import http from 'node:http';
import { json } from './middlewares/json.js';
import { Database } from './database/database.js';
const database = new Database()
const server = http.createServer(async (req, res) => {
 await json(req, res)

  const { url, method } = req;

  if (method === 'GET' && url === '/users') {
 const users = database.select('users')
     return res.end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body
const users = {
      id: 1,
      name,
      email
       }
database.insert('users', users)
return res.writeHead(201).end()
  }
 return res.writeHead(404).end()
})

 server.listen(3333,()=> {console.log('listening on port 3333')})