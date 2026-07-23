import productModel from "./productModel.js"

const productGetMany = async (req, res) => {
  const productList = await productModel.find()
  // console.log("productList", productList)
  res.status(200).json({ "success": "all products", products: productList })
}
export default productGetMany