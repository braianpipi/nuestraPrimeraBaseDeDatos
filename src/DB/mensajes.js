import knex from "knex";

export default class Chat {
  constructor(options, table) {
    this.knex = knex(options);
    this.table = table;
  }

  async getByAll() {
    try {
      const todos = await this.knex.schema.hasTable(this.table);
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
      const existe = await this.knex.schema.hasTable(this.table);
      if(existe){
        await this.knex(this.table).insert(obj)
        const res= JSON.stringify(await this.knex.from(this.table).select('*').orderBy('id','desc').limit(1))
        const resultado = JSON.parse(res)
        return resultado
    } else {
        await this.knex.schema.createTable('usuarios',table=>{
            table.increments('id').primary().unique()
            table.string('email',100).notNullable()
            table.string('message').notNullable()
          })
        await this.knex(this.table).insert(obj)
        const res= JSON.stringify(await this.knex.from(this.table).select('*').orderBy('id','desc').limit(1))
        const result = JSON.parse(res)
            return result
        }
        
    } catch (error) {
      console.log("error", error);
    }}
  
  // async getById(idBuscado) {
  //   try {
  //     let producto = await this.knex
  //       .from(this.table)
  //       .select('*')
  //       .where('id', idBuscado);
  //     return producto;
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }
  // async deleteById(idEliminar) {
  //   try {
  //     const elementoBorrado = await this.knex
  //       .from(this.table)
  //       .where('id', idEliminar)
  //       .del();
  //     return elementoBorrado;
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }
  // async deleteAll () {
  //   try {
  //     const vaciar = await this.knex.from(this.table).del()

  //       return vaciar
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // }
}
