import http from 'node:http';
const users = []
const server = http.createServer(async (req, res) => {
  // Parse do body com

  const buffers = []
  for await (const chunk of req) {
    console.log({chunk})
    buffers.push(chunk)

  }
  try {
req.boy = JSON.parse(Buffer.concat(buffers).toString())

  } catch {
   req.body = null
  }



  const { url, method } = req;

  if (method === 'GET' && url === '/users') {
    console.log(users)
     return res.setHeader('Content-type', 'application/json').end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { name, email } = req.body

    users.push({
      id: 1,
      name,
      email
       })
    console.log(users)
return res.writeHead(201).end()
  }
 return res.writeHead(404).end()
})

 server.listen(3333,()=> {console.log('listening on port 3333')})