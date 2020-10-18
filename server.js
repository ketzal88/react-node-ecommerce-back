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
  res.status(200).send({ products });
});

///// Endpoint Product by search param ////
app.get("/products/:search", function (req, res) {
  const search = req.params.search;
  function findProducts(search, products) {
    return products.filter(function (el, i) {
      return el.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }
  const product = findProducts(search, products.products);
  res.status(200).send({ product });
});

///// Endpoint Product by ID ////
app.get("/product/:id", function (req, res) {
  const id = req.params.id;
  function findProduct(id, products) {
    return products.filter(produ => id.includes(produ.id)).map(produ => produ)
  }
  const product = findProduct(id, products.products);
  res.status(200).send({ product });
});

///// Endpoint Products by category ////
app.get("/products/category/:category", function (req, res) {
  const category = req.params.category;
  function findProductsByCategory(category, products) {
    return products.filter(function (el, i) {
      return el.categoria.toLowerCase().indexOf(category.toLowerCase()) > -1;
    });
  }
  const product = findProductsByCategory(category, products.products);
  res.status(200).send({ product });
});

///// Endpoint Products by price min and max ////
app.get("/products/price/:min/:max", function (req, res) {
  const min = req.params.min;
  const max = req.params.max;
  function findMinMax(products, min, max) {
    return products.filter((item) => item.precio >= min && item.precio <= max);
  }
  const product = findMinMax(products.products, min, max);
  res.status(200).send({ product });
});

module.exports = app;
