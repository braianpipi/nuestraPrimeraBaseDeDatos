// import { Router } from "express";
// import { options } from "../DB/configDB.js";
// import Contenedor from "../apiClass.js";
// const routes = Router();
// let containerProducts = new Contenedor(options.mysql, "productos");

// routes.get("/", async (req, res) => {
//   const products = await containerProducts.getByAll();
//   res.render("index.ejs", { products: products });
// });
// routes.post("/productos", (req, res) => {
//   const products = req.body;
//   containerProducts.save(products);
//   res.redirect("/");
// });

// export default routes;
