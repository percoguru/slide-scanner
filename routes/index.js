const express = require("express");
const {
  getAllPathLocation,
  getCoordinates,
  getLastNode,
  addToPath,
} = require("../storage/index");

const router = express.Router({ mergeParams: true });

const keyStrokeDirections = {
  right: [0, 1],
  left: [0, -1],
  up: [-1, 0],
  down: [1, 0],
};

const calcuateNextLoc = (currentPos, move) => {
  return [
    Number(currentPos[0]) + keyStrokeDirections[move][0],
    Number(currentPos[1]) + keyStrokeDirections[move][1],
  ];
};

const addKeyStroke = async (req, res, next) => {
  const {
    body: { direction },
  } = req;

  try {
    const lastProcessedLocation = await getLastNode();

    const newLocation = calcuateNextLoc(
      getCoordinates(lastProcessedLocation),
      direction
    );

    const path = await addToPath(newLocation.join("-"));

    res.json(path);
  } catch (e) {
    console.log(e);
  }
};

/**
 * To get the path history for the slide
 */
const getLocations = async (req, res, next) => {
  try {
    const locations = await getAllPathLocation();
    res.status(200).json(locations);
  } catch (e) {
    console.log(e);
  }
};

router.post("/key-stroke", addKeyStroke);
router.get("/location", getLocations);

module.exports = router;
