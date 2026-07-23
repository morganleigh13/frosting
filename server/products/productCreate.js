import productModel from "./productModel.js";

const productCreate = async (req, res) => {
  const {
    productName,
    description,
    images,
    thumbnail,
    price,
    type,
    material,
    reviews,
    slug
  } = req.body;
// console.log(slug)
  try {
    const newProduct = await productModel.create({
      productName,
      description,
      images,
      thumbnail,
      price,
      type,
      material,
      reviews,
      slug
    });
    res.status(200).json({ success: "product crested", product: newProduct });
  } catch (err) {
    console.log(err);
  }
};

export default productCreate;
