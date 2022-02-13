const functions = require("firebase-functions");
const express = require("express");
const axios = require("axios").default;


const app = express();

const createURL = (url, params) => {
  const newURL = new URL(url);
  const urlParams = newURL.searchParams;

  Object.keys(params).forEach((key) => {
    urlParams.append(key, params[key]);
  });

  return newURL.toString();
};

const searchProduct = async (product) => {
  const url = createURL("https://www.bestbuy.ca/api/v2/json/search",
      {
        "lang": "en-CA",
        "query": product,
        "sortBy": "relevance",
        "sortDir": "desc",
      });

  try {
    const resp = await axios.get(url);
    const searchRes = await resp.data;
    const searchResString = JSON.stringify(searchRes);
    return JSON.parse(searchResString);
  } catch (error) {
    throw new Error(error);
  }
};

app.get("/search/:product", async (req, res) => {
  const product = String(req.params["product"]);
  try {
    const searchRes = await searchProduct(product);
    const products = searchRes.products;
    const ret = {
      "products": products,
    };
    res.send(JSON.stringify(ret));
  } catch (error) {
    console.log(error);
    const errorString = "Could not search product: \"" + product + "\". Problem with fetching external API";
    throw new Error(errorString);
  }
});

app.get("/admin", (req, res) => {
  res.send("This is from the admin");
});

exports.api = functions.https.onRequest(app);
