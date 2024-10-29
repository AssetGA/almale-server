// 1. У любого пользователя будет как минимум в БД  qualities и professions

const productMock = require("../mock/product.json");
const Product = require("../models/Product");
const ProductTranslation = require("../models/ProductTranslate");
const { getTranslation } = require("../utils/translations");

// 2. Они равны mock данным
require("dotenv").config();

module.exports = async () => {
  const products = await Product.find();
  if (products.length !== productMock.length) {
    await createInitialEntity(Product, productMock, "product");
  }
  // const towns = await Town.find();
  // if (towns.length !== townMock.length) {
  //   await createInitialEntity(Town, townMock);
  // }
};

async function createInitialEntity(Model, data, string) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item, index) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        console.log("newitem", newItem);
        await newItem.save();
        if (string === "product") {
          const newTranslation = getTranslation(newItem._id, index);
          await ProductTranslation.insertMany(newTranslation);
        }
        return newItem;
      } catch (e) {
        return e;
      }
    })
  );
}
