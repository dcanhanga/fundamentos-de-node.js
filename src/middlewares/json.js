/**
 * @param {import('http').IncomingMessage} req - O objeto de requisição HTTP.
 * @param {import('http').ServerResponse} res - O objeto de resposta HTTP.
 * @returns {Promise<void>} - Uma Promise que resolve quando o corpo da requisição é processado.
 */
export async function json(req, res) {
  const buffers = []
  for await (const chunk of req) {
    buffers.push(chunk)
  }
  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString())
  } catch {
    req.body = null
  }
  res.setHeader('Content-type', 'application/json')
}