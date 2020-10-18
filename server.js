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

function findProducts(search, products) {
  return products.filter(function (el, i) {
    return el.name.toLowerCase().indexOf(search.toLowerCase()) > -1;
  });
}

function findProductsByCategory(category, products) {
  return products.filter(function (el, i) {
    return el.categoria.toLowerCase().indexOf(category.toLowerCase()) > -1;
  });
}

///// Endpoints ////

///// Endpoint All Products ////

app.get("/products", function (req, res) {
  res.status(200).send({ products });
});

///// Endpoint Product by search param ////
app.get("/products/:search", function (req, res) {
  const search = req.params.search;
  const product = findProducts(search, products.products);
  res.status(200).send({ product });
});

///// Endpoint Products by category ////
app.get("/products/category/:category", function (req, res) {
    const category = req.params.category;
    const product = findProductsByCategory(category, products.products);
    res.status(200).send({ product });
  });

module.exports = app;
