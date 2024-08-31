import http from 'node:http';
import { json } from './json.js';
import { routes } from './routes.js';

const server = http.createServer(async (req, res) => {
 await json(req, res)

  const { url, method } = req;
  const route = routes.find((route) => {
    return ( route.url.test(url) && method === route.method)})
  if (route) {
    const routeParams = req.url.match(route.url)

    console.log(routeParams)
    return route.handler(req, res)
  }
 return res.writeHead(404).end()
})

 server.listen(3333,()=> {console.log('listening on port 3333')})