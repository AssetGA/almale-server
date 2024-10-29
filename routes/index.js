const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/product", require("./product.routes"));
router.use("/order", require("./order.routes"));
router.use("/check", require("./check.routes.js"));
router.use("/user", require("./users.routes"));

module.exports = router;
