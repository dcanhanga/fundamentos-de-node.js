import fs from 'node:fs/promises'
const dataBasePath = new URL('db.json', import.meta.url)

export class Database {
  /** @type {Object.<string, Array<Object>>} */
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
  /**
   *
   * @param {string} table
   * @param {string} [id]
   * @returns {Object|Array<Object>|undefined}
   */
  select(table, id) {
    const data = this.#database[table] ?? []
    if (!id) {
      return data
    }
    return data.find(item => item.id === id)
  }

  /**
   *
   * @param {string} table
   * @param {Object} data
   * @returns {void}
   */
  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }
    this.#persist()
  }
}
