import { Router } from "express";
import { options } from "../DB/configDB";
import Contenedor from "../apiClass";
const routes = Router();
let containerProducts = new Contenedor(options.mysql, "productos");

routes.get("/", async (req, res) => {
  const products = await containerProducts.getByAll();
  res.render("index.ejs", { products: products });
});
routes.post("/productos", (req, res) => {
  const products = req.body;
  containerProducts.save(products);
  res.redirect("/");
});

module.exports = routes;
