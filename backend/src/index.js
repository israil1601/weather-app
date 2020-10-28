const debug = require("debug")("weathermap");

const Koa = require("koa");
const router = require("koa-router")();
const fetch = require("node-fetch");
const cors = require("kcors");

// Set your API key here
const appId = process.env.APPID || "41f00d2daf5309fb6dc08a01df8c388c";
const mapURI =
  process.env.MAP_ENDPOINT || "http://api.openweathermap.org/data/2.5";

// Helsinki coordinates, default city
const defaultLatitude = "60.1699";
const defaultLongtitude = "24.9384";

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async (lat, lon) => {
  const endpoint = `${mapURI}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts,daily&units=metric&appid=${appId}`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

const fetchLocation = async (lat, lon) => {
  const endpoint = `${mapURI}/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

router.get("/api/weather", async (ctx) => {
  const lat = ctx.query && ctx.query.lat ? ctx.query.lat : defaultLatitude;
  const lon = ctx.query && ctx.query.lon ? ctx.query.lon : defaultLongtitude;
  const weatherData = await fetchWeather(lat, lon);
  const { name, sys } = await fetchLocation(lat, lon);

  weatherData.location = `${name}, ${sys ? sys.country : ""}`;

  if (weatherData.hourly) weatherData.hourly.splice(3);

  ctx.type = "application/json; charset=utf-8";
  ctx.body = weatherData;
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
