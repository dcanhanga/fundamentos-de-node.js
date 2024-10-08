import fs from 'node:fs/promises'
const dataBasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}
  #persist() {
    fs.writeFile(dataBasePath, JSON.stringify(this.#database))
  }
  constructor() {
    fs.readFile(dataBasePath, 'utf-8').then(data => {
      this.#database = JSON.parse(data)
    }).catch(() => {
      this.#persist()
    })
  }
  select(table, filter) {
    let data = this.#database[table] ?? []
    if (!filter) {
      return data
    }
    const {id, ...filterWithoutId} = filter
    if (id) {
      return data.find(item => item.id === id)
    }
    if(filterWithoutId.name || filterWithoutId.email) {
      data = data.filter(row => {
        return Object.entries(filterWithoutId).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }
     return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }
    this.#persist()
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }

    update(table, id,data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)
    if (rowIndex > -1) {
      this.#database[table][rowIndex] = {id, ...data}
      this.#persist()
    }
}

}
