const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);

// Send 404 error message for wrong routes
router.use("*", (req, res) => {
  res.status(404).send("<h1>404 Error. Wrong Route.</h1>");
});

module.exports = router;