### Documentação: Implementando um `Readable` Stream Personalizado no Node.js

#### Introdução

No Node.js, streams são uma abstração poderosa para trabalhar com dados que são lidos ou escritos de forma contínua. Existem quatro tipos de streams em Node.js: `Readable`, `Writable`, `Duplex`, e `Transform`. Nesta documentação, focaremos em `Readable` streams, que são usadas para ler dados em pedaços de forma eficiente. Vamos criar um exemplo de um `Readable` stream personalizado que emite números de 1 a 100, com um intervalo de 1 segundo entre cada número.

#### Importação e Criação de um Stream Personalizado

Para começar, importamos a classe `Readable` do módulo nativo `stream` do Node.js. A classe `Readable` nos permite definir como e quando os dados serão lidos pelo stream.

```javascript
import { Readable } from 'node:stream';
```

#### Definição da Classe `OneToHundredStream`

Criamos uma classe chamada `OneToHundredStream` que herda de `Readable`. Nesta classe, vamos implementar a lógica para gerar números sequenciais de 1 a 100.

```javascript
class OneToHundredStream extends Readable {
  index = 1; // Inicializa o índice em 1

  _read() {
    const i = this.index++; // Incrementa o índice a cada leitura
    setTimeout(() => {
      if (i > 100) {
        this.push(null); // Finaliza o stream quando o índice excede 100
        return;
      }

      const buf = Buffer.from(String(i)); // Converte o número atual para um buffer
      this.push(buf); // Empurra o buffer para o stream
    }, 1000); // Espera 1 segundo entre cada push
  }
}
```

##### Detalhes do Método `_read()`

O método `_read()` é a implementação obrigatória para qualquer classe que estenda `Readable`. Este método é chamado sempre que o stream precisa de mais dados para enviar. A lógica do método acima é:

1. **Incrementação do Índice**: Cada vez que `_read()` é chamado, o índice `i` é incrementado.
2. **Temporizador com `setTimeout`**: O temporizador é usado para adicionar um atraso de 1 segundo antes de enviar o próximo número.
3. **Condicional para Finalizar o Stream**: Se o índice exceder 100, o método `push(null)` é chamado, indicando o fim dos dados.
4. **Conversão e Envio de Dados**: O número atual é convertido para uma string, depois para um `Buffer`, e finalmente é "empurrado" para o stream usando `this.push(buf)`.

#### Uso do Stream

Para usar o nosso stream personalizado, criamos uma nova instância de `OneToHundredStream` e utilizamos o método `.pipe()` para redirecionar a saída do stream para o `process.stdout`, que é o fluxo de saída padrão (o console, neste caso).

```javascript
new OneToHundredStream().pipe(process.stdout);
```

Esta linha de código inicia o processo de leitura, enviando números de 1 a 100 para o console, com um intervalo de 1 segundo entre cada número.

#### Conclusão

Criar um `Readable` stream personalizado no Node.js permite um controle detalhado sobre o fluxo de dados e sua leitura. O exemplo `OneToHundredStream` ilustra como podemos criar streams que leem dados de forma assíncrona, gerenciando eficientemente o fluxo e a quantidade de dados. Esta abordagem é particularmente útil para lidar com grandes conjuntos de dados ou para controlar a taxa de transferência de dados em aplicações de streaming.

Com o conhecimento básico de como criar e manipular streams personalizados, podemos explorar outros tipos de streams (`Writable`, `Duplex`, `Transform`) e suas possíveis aplicações em Node.js para construir soluções de processamento de dados robustas e escaláveis.