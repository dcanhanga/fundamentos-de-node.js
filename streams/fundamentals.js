// process.stdin.pipe(process.stdout)
import {Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
  index = 1
  _read() {
    const i = this.index++
    setTimeout((

    ) => {
          if(i > 100) {
      this.push(null)
      return
    }

      const buf = Buffer.from(String(i))
      this.push(buf)
    }, 1000)

  }
}

class MultiplierByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10)
    callback()
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1
    callback(null, Buffer.from(String(transformed)))
    // primeiro parâmetro é o erro
  }
}

new OneToHundredStream().pipe(new InverseNumberStream()).pipe(new MultiplierByTenStream())

// A stream de leitura, conseguimos ler dados somente quando ela é lida, e não quando ela é escrita. A stream de escrita, conseguimos escrever dados somente quando ela é escrita, e não quando ela é lida. A stream de transformação, conseguimos ler dados, transformá-los e escrever dados. A stream de transformação é utilizado no meio de duas stream