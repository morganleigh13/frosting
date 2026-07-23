import orderModel from "./orderModel.js"

const orderGetMany = async (req, res) => {
  const orderList = await orderModel.find()
  res.status(200).json({ "success": "all orders", orders: orderList })
}
export default orderGetMany