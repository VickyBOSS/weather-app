const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

const developer = "VickyBOSS";

// define paths for express app
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setting handlebar engine
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// setting views location (=templates) [default (=views)]
app.set("views", viewsPath);

// setup static dir to serve
app.use(express.static(publicDirPath));

// // myapp.com
// app.get("/", (req, res) => {
//   res.send("<h1>Hello express !</h1>");
// });

// myapp.com
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    developer,
    img: "/imgs/andrew.png",
  });
});

// myapp.com/help
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help Me",
    developer,
  });
});

// myapp.com/about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    developer,
  });
});

// app.get("/products", (req, res) => {
//   const search = req.query.search;

//   if (!search) {
//     return res.send({
//       error: "You must provide search",
//     });
//   }

//   res.send({
//     success: `Results found for ${search}`,
//     search,
//     ratings: req.query.ratings,
//     results: [],
//   });
// });

app.get("/weather", (req, res) => {
  const address = req.query.address;

  if (!address) {
    return res.send({
      error: "You must provide proper address !",
    });
  }

  // Make sure to use default arguments while using object
  // destructuring in case we are accepting error

  geocode(address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }

      res.send({
        forecastData,
      });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404-page");
});

// // myapp.com/about
// app.get("/about", (request, response) => {
//   response.send([
//     {
//       name: "Vikas",
//     },
//     {
//       name: "Aman",
//     },
//     {
//       name: "Dinesh",
//     },
//   ]);
// });

app.listen(3000, () => {
  console.log("App is up on port 3000");
});
