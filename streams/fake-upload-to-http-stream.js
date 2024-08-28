import { Readable } from 'stream'

class OneToHundredStream extends Readable {
  index = 1
  _read() {
    const i = this.index++
    setTimeout((

    ) => {
          if(i > 5) {
      this.push(null)
      return
    }

      const buf = Buffer.from(String(i))
      this.push(buf)
    }, 1000)

  }
}

fetch('http://localhost:3334', {

  method: 'POST',
  body: new OneToHundredStream(),
  duplex: 'half' // Necessário para lidar com streams duplex em Node.js v18+
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data)
}).catch(error => {
   console.error('Erro ao fazer requisição:', error);
})