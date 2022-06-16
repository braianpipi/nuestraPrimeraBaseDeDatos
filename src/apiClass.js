import knex from "knex";
import { options } from "./DB/configDB.js";
const db = knex(options.mysql);
const table = "products";
export default class Contenedor {
  constructor() {}

  async getByAll(req, res) {
    try {
      const products = await db(table).select("*");
      res.status(200).json({ products: products });
      res.render('index.ejs', { products : products});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    // try {
    //   const todos = await db(table).select("*");
    //   if(todos){
    //     const res = JSON.stringify(await db.from(table).select('*'));
    //     const resultado = JSON.parse(res)
    //     return resultado
    //   }
    //   return todos;
    // } catch (error) {
    //   res.status(500).json({message: error.message})
    // }
  }
  async save(req, res) {
    try {
      const { title, price, thumbnail} = req.body;
      const product = await db(table).insert({
        title,
        price,
        thumbnail
      });
      const new_product = await db(table).select("*").where("id", product);
      res.status(201).json({
        message: "Product created",
        new_product: new_product,
      });
      res.redirect('/')
    } catch (error) {
      res.status(500).json({ message: error.message });
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
  //     await db.schema.createTable('productos',table=>{
  //         table.increments('id').primary().unique()
  //         table.string('title',50).notNullable()
  //         table.float('price').notNullable()
  //         table.string('thumbnail',200).notNullable()
  //       })
  //     await (table).insert(obj)
  //     const res= JSON.stringify(await db.from(table).select('*').orderBy('id','desc').limit(1))
  //     const result = JSON.parse(res)
  //         return result
  //     }

  // } catch (error) {
  //   res.status(500).json({message: error.message})
  // }}
  async getById(req, res) {
    try{
      const { id } = req.params;
      const product = await db(table).select('*').where('id', id);
      !product.length ? res.status(404).json({message: 'Product not found'}) : res.status(200).json({product: product});
  }
  catch(error){
      res.status(500).json({message: error.message});
  }
    // try {
    //   let producto = await db.from(table).select("*").where("id", idBuscado);
    //   return producto;
    // } catch (error) {
    //   console.log("error", error);
    // }
  }
  async deleteById(req, res) {
    try{
      const { id } = req.params;
      const product = await db(table).where('id', id).del();
      res.status(200).json({
          message: 'Product deleted',
          product_id: product
      });
  }
  catch(error){
      res.status(500).json({message: error.message});
  }    
    // try {
    //   const elementoBorrado = await db
    //     .from(table)
    //     .where("id", idEliminar)
    //     .del();
    //   return elementoBorrado;
    // } catch (error) {
    //   res.status(500).json({ message: error.message });
    // }
  }
  async deleteAll() {
    try {
      return await db.from(table).del();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async updateProductById(req, res) {
    try{
        const { id } = req.params;
        const { title, price, thumbnail} = req.body;
        await db(table).where('id', id).update({
            title,
            price,
            thumbnail
        });
        const product_updated = await db(table).select('*').where('id', id);
        res.status(200).json({
            message: 'Product updated',
            product: product_updated
        });
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}
}
