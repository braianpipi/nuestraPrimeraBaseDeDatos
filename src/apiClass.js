import knex from "knex";

export default class Contenedor {
  constructor(options, table) {
    this.knex = knex(options);
    this.table = table;
  }

  async getByAll() {
    try {
      const todos = await this.knex.from(this.table).select("*");
      if(todos){
        const res = JSON.stringify(await this.knex.from(this.table).select('*'));
        const resultado = JSON.parse(res)
        return resultado
      }
      return todos;
    } catch (error) {
      console.log("error", error);
    }
  }
  async save(obj) {
    try {
      const nuevoProducto = this.knex(this.table).insert(obj);
      return nuevoProducto;
    } catch (error) {
      console.log("error", error);
    }
  }
  async getById(idBuscado) {
    try {
      let producto = await this.knex
        .from(this.table)
        .select('*')
        .where('id', idBuscado);
      return producto;
    } catch (error) {
      console.log("error", error);
    }
  }
  async deleteById(idEliminar) {
    try {
      const elementoBorrado = await this.knex
        .from(this.table)
        .where('id', idEliminar)
        .del();
      return elementoBorrado;
    } catch (error) {
      console.log("error", error);
    }
  }
  deleteAll() {
    try {
        return await this.knex.from(this.table).del()
    } catch (error) {
      console.log("error", error);
    }
  }
}
