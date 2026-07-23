import productModel from "./productModel.js"

const productGetOne = async (req, res) => {

    const { slug } = req.params
   

  const product = await productModel.findOne({ slug })
  // console.log("product", product)
  res.status(200).json({ "success": "product", product: product })
}
export default productGetOne