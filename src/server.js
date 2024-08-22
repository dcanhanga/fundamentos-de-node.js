import http from 'node:http';

const server = http.createServer((req, res) => {
  const { url, method } = req;

  if (method === 'GET' && url === '/users') {
    return res.end('Listagem de usuários')
  }
  if(method ==='POST' && url === '/users') {
    return res.end('Criando um novo usuário')
  }
 return res.end('Hello world!!!')
})

server.listen(3333,()=> {console.log('listening on port 3333')})