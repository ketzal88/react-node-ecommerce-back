var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
var products = require("./data.json");

const port = 8080;

app.listen(port);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

///// Endpoint All Products ////

app.get("/products", function (req, res) {
  let productosFinal = products.products;

  const currentPage = req.query.page || 0;
  const search = req.query.search || "";
  const categories = req.query.category.split(",") || [];
  const min = req.query.priceMin || 0;
  const max = req.query.priceMax || 1000000;
  const limit = 10;

  /// Search
  if (search) {
    productosFinal = productosFinal.filter(function (el, i) {
      return el.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
  }

  // Category
  if (categories.length > 0) {
    let allCategories = [];
    categories.forEach(function (el) {
      console.log(el);
      allCategories = [
        ...allCategories,
        ...findProductsByCategory(el, productosFinal),
      ];
    });
    productosFinal = [...new Set(allCategories)];
  }

  // Price
  if (min || max) {
    productosFinal = productosFinal.filter(
      (item) => item.precio >= min && item.precio <= max
    );
  }

  // Paginacion

  const productosFinal2 = productosFinal.slice(
    currentPage * limit,
    currentPage * limit + limit
  );

  // Total en base a los productos luego del filtro

  const total = productosFinal.length;

  // Calculo de las paginas luego del filtro
  const pages = Math.round(total / limit) + 1;

  // Respuesta luego de los filtros

  productos = productosFinal2;

  res.status(200).send({ productos, pages });
});

///// Endpoint Product by ID ////
app.get("/product/:id", function (req, res) {
  const id = req.params.id;
  function findProduct(id, products) {
    return products
    .filter((produ) => id.includes(produ.id))
    .map((produ) => produ);
  }
  const product = findProduct(id, products.products);
  res.status(200).send({ product });
});

function findProductsByCategory(category, products) {
  return products.filter(function (el, i) {
    return el.categoria.toLowerCase().indexOf(category.toLowerCase()) > -1;
  });
}

module.exports = app;
