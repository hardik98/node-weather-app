const express = require("express");
const path = require("path");
const hbs = require("hbs");
const getGeoCode = require("./utils/geoCode");
const getForcast = require("./utils/forcast");

const app = express();

const pathToPublicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");
hbs.registerPartials(partialPath);

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(express.static(pathToPublicDir));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    footerTitle: "Hardik Thakkar",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    footerTitle: "Hardik Thakkar",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    footerTitle: "Hardik Thakkar",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({ error: "Please provide address" });
  }

  getGeoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    getForcast(latitude, longitude, (error, forcastData) => {
      if (error) {
        return res.send({ error });
      }
      console.log("forcast Data", forcastData);
      res.send({
        foreCast: forcastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({ products: [] });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "My 404 page",
    footerTitle: "Hardik Thakkar",
    errorMessage: "Help artical not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "My 404 page",
    footerTitle: "Hardik Thakkar",
    errorMessage: "Page not Found",
  });
});

app.listen(3000, () => {
  console.log("Server is up...");
});
