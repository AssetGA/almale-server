const express = require("express");
const router = express.Router({ mergeParams: true });
// const auth = require("../middleware/auth.middleware");
const Product = require("../models/Product");
const ProductTranslation = require("../models/ProductTranslate");

router.get("/", async (req, res) => {
  try {
    const { lang } = req.query;
    const list = await Product.find();
    const newList = await Promise.all(
      list.map(async (elem) => {
        const translation = await ProductTranslation.findOne({
          product: elem._id,
          language: lang,
        });
        const localizedProduct = {
          ...elem._doc,
          name: translation?.name,
          description: translation?.description,
          diameter: translation?.diameter,
        };
        return localizedProduct;
      })
    );

    res.status(200).send(newList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка попробуйте позже" });
  }
});

module.exports = router;
