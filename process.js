const {
  markFocused,
  markCaptured,
  getPath,
  readLocations,
  markSkipped,
  updateLastIndex,
} = require("./storage/index");

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

const refocus = async (location) => {
  console.log("Focussing on location", location);
  await timer(3000);
};

const capture = async (location) => {
  console.log("Capturing on location", location);

  await timer(2000);
};

const runProcess = async () => {
  let path;
  try {
    path = await getPath();
  } catch {
    return;
  }

  const { locations, lastIndex } = await readLocations();

  const newNodes = path.slice(lastIndex + 1, path.length);

  if (newNodes.length) {
    await markSkipped(newNodes);

    const currentNode = newNodes[newNodes.length - 1];

    if (
      !locations[currentNode] ||
      (locations[currentNode] && locations[currentNode].state === "skipped")
    ) {
      await refocus(currentNode);

      await markFocused(currentNode);
    }

    let newPath;
    try {
      newPath = await getPath();
    } catch {
      return;
    }
    if (newPath.length !== path.length) {
      await updateLastIndex(path.length - 2);
      return;
    }

    if (
      !locations[currentNode] ||
      (locations[currentNode] && locations[currentNode].state !== "captured")
    ) {
      await capture(currentNode);

      await markCaptured(currentNode);
    }

    await updateLastIndex(path.length - 1);
  }
};

const worker = async () => {
  for (let i = 0; i === 0; ) {
    await runProcess();
  }
};

(async () => {
  await worker();
})();
