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

///// Endpoints ////

///// Endpoint All Products ////

app.get("/products", function (req, res) {
  res.status(200).send({ products });
});

///// Endpoint Single Product by ID ////
app.get("/products/:id", function (req, res) {
  axios
    .get("https://rapidapi.p.rapidapi.com/catalog/product/" + req.params.id, {
      headers,
    })
    .then((response) => {
      res.send({ product: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
});

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

// function createImgLink(allPokemons) {
//   allPokemons.forEach(function (el, i) {
//     let index = i + 1;
//     el.img =
//       "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
//       index +
//       ".png";
//   });
//   return allPokemons;
// }

// function findPokemons(inputValue, allPokemons) {
//   return allPokemons.filter(function (el, i) {
//     return el.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
//   });
// }

// app.get("/search/:search", function (req, res) {
//   axios
//     .get("https://pokeapi.co/api/v2/pokemon?limit=500")
//     .then((response) => {
//       let allPokemons = response.data.results;
//       let inputValue = req.params.search;

//       let searchResultWithImg = createImgLink(allPokemons);
//       let searchResult = findPokemons(inputValue, searchResultWithImg);
//       res.send({ results: searchResult });
//     })
//     .catch((error) => {
//       return res.status(400).send({
//         error: error.response.data.error,
//       });
//     });
// });

// app.get("/", function (req, res) {
//   axios
//     .then((res) => console.log(productos))
//     .catch((error) => {
//       console.log(error);
//     });
// });

module.exports = app; // for testing
