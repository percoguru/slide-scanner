const fs = require("fs");

const getLastLocation = async () => {
  const locationsData = fs.readFileSync("locations.json", "utf8");
  const dataObj = JSON.parse(locationsData);

  const { locations } = dataObj;

  const pathData = fs.readFileSync("path.json", "utf8");
  const pathObj = JSON.parse(pathData);

  const { path } = pathObj;

  const lastLocation = path[path.length - 1];

  return locations[lastLocation] || null;
};

const getAllPathLocation = () => {
  const locationsData = fs.readFileSync("locations.json", "utf8");
  const dataObj = JSON.parse(locationsData);

  const { locations } = dataObj;

  const pathData = fs.readFileSync("path.json", "utf8");
  const pathObj = JSON.parse(pathData);

  const { path } = pathObj;

  const result = {};

  path.forEach((node) => {
    result[node] = locations[node] || null;
  });

  return result;
};

const markFocused = async (location) => {
  const locationsData = fs.readFileSync("locations.json", "utf8");
  const dataObj = JSON.parse(locationsData);

  const { locations, lastIndex } = dataObj;

  locations[location] = { state: "focused", updated_at: new Date() };

  fs.writeFileSync("locations.json", JSON.stringify({ locations, lastIndex }));

  return;
};

const markCaptured = async (location) => {
  const locationsData = fs.readFileSync("locations.json", "utf8");
  const dataObj = JSON.parse(locationsData);

  const { locations, lastIndex } = dataObj;

  locations[location] = { state: "captured", updated_at: new Date() };

  fs.writeFileSync("locations.json", JSON.stringify({ locations, lastIndex }));

  return;
};

const getCoordinates = (location) => {
  return location.split("-");
};

const getLastNode = () => {
  const pathData = fs.readFileSync("path.json", "utf8");
  const pathObj = JSON.parse(pathData);

  const { path } = pathObj;

  return path[path.length - 1];
};

const addToPath = (newLocation) => {
  const pathData = fs.readFileSync("path.json", "utf8");
  const pathObj = JSON.parse(pathData);

  const { path } = pathObj;

  path.push(newLocation);

  fs.writeFileSync("path.json", JSON.stringify({ path }));
  return path;
};

const getPath = () => {
  const pathData = fs.readFileSync("path.json", "utf8");
  const pathObj = JSON.parse(pathData);

  const { path } = pathObj;

  return path;
};

const readLocations = () => {
  const locationsData = fs.readFileSync("locations.json", "utf8");
  const dataObj = JSON.parse(locationsData);

  return dataObj;
};

const markSkipped = (newNodes) => {
  const locationsData = fs.readFileSync("locations.json", "utf8");
  const dataObj = JSON.parse(locationsData);

  const { locations, lastIndex } = dataObj;

  for (let i = 0; i < newNodes.length - 1; i += 1) {
    if (!locations[newNodes[i]]) {
      locations[newNodes[i]] = {
        state: "skipped",
        updated_at: new Date(),
      };
    }
  }

  fs.writeFileSync("locations.json", JSON.stringify({ locations, lastIndex }));

  return;
};

const updateLastIndex = (index) => {
  const locationsData = fs.readFileSync("locations.json", "utf8");
  const dataObj = JSON.parse(locationsData);

  let { locations, lastIndex } = dataObj;

  lastIndex = index;

  fs.writeFileSync("locations.json", JSON.stringify({ locations, lastIndex }));

  return;
};

module.exports = {
  getLastLocation,
  getAllPathLocation,
  markFocused,
  markCaptured,
  getCoordinates,
  getLastNode,
  addToPath,
  readLocations,
  getPath,
  markSkipped,
  updateLastIndex,
};
