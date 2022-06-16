import knex from "knex";
import { options} from "./configDB.js"
const db = knex(options.sqlite);
const table = "messages";


export default class Chat {
  constructor() {
  }

  async getByAll() {
    try {
      const allMessages = await db(table).select("*");
      res.status(200).json({ messages: allMessages });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async save(obj) {
    try {
      const email = obj.email;
      const date = obj.date;
      const text = obj.text;
      const messageAdd = await db(table).insert({
        email,
        date,
        text
            });
      const new_message = await db(table).select("*").where("id", messageAdd);
      res.status(201).json({
        message: "Message created",
        new_product: new_message,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
    // try {
    //   const existe = await db.schema.hasTable(table);
    //   if(existe){
    //     await db(table).insert(obj)
    //     const res= JSON.stringify(await db.from(table).select('*').orderBy('id','desc').limit(1))
    //     const resultado = JSON.parse(res)
    //     return resultado
    // } else {
    //     await db.schema.createTable('usuarios',table=>{
    //         table.increments('id').primary().unique()
    //         table.string('email',100).notNullable()
    //         table.string('message').notNullable()
    //       })
    //     await db(this.table).insert(obj)
    //     const res= JSON.stringify(await db.from(table).select('*').orderBy('id','desc').limit(1))
    //     const result = JSON.parse(res)
    //         return result
    //     }
        
    // } catch (error) {
    //   console.log("error", error);
    // }}
  
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
