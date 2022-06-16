import { options } from "./DB/configDB.js";
import knex from "knex";
const newMessages = [
  {
    id: 1,
    email: "asdasd@ads.com",
    text: "Hola, Como estas?",
    date: 12.13,
  },
];
const products = [
  {
    id: 1,
    title: "Mono Lentes",
    price: 2,
    thumbnail:
      "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/H7W2IQYTJENYXPNKIGA6WE2DYA.jpg",
  },
  {
    id: 2,
    title: "Mono Dorado",
    price: 4,
    thumbnail:
      "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/KA6QZAPJ73GKRERDDS4S552AIE.jpg",
  },
  {
    id: 3,
    title: "Mono Dorado",
    price: 6,
    thumbnail: "https://m.media-amazon.com/images/I/41ICznbO1YL._AC_.jpg",
  },
  {
    id: 4,
    title: "sds",
    price: "123",
    thumbnail:
      "https://www.larazon.es/resizer/qApt0WBVFkIqcI0ruMUBvqbNP8Y=/1800x1200/smart/filters:format(jpg)/cloudfront-eu-central-1.images.arcpublishing.com/larazon/YAY7H5LXJJCZVAJ33ZINW27PDY.jpg",
  },
];
//  UNA VEZ EJECUTADO NO HACE FALTA VOLVERLO A EJECUTAR PORQUE SE PISAN LAS BASES DE DATOS
// (async () => {
//   const db = knex(options.mysql);
//   try {
//     await db.schema.createTableIfNotExists("products", (table) => {
//       table.increments("id").primary().unique();
//       table.string("title", 50).notNullable();
//       table.float("price").notNullable();
//       table.string("thumbnail", 200).notNullable();
//     });
//     await db("products").insert(products);
//     console.log("Datos insertados");
//   } catch (err) {
//     console.log(err);
//   }
// })();
// (async () => {
//   const db = knex(options.sqlite);
//   try {
//     // await db.from('messages').del()
//     await db.schema.createTableIfNotExists("messagess", (table) => {
//       table.increments("id").unique();
//       table.string("email", 100).notNullable();
//       table.string("text").notNullable();
//       table.float("date").notNullable();
//     });
//     await db("messagess").insert(newMessages);
//     console.log("Datos insertados", newMessages);
//   } catch (err) {
//     console.log(err);
//   }
// })();
