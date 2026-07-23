import orderModel from "./orderModel.js";

const orderGetOne = async (req, res) => {
  const { orderId } = req.params;
  console.log(orderId)
  try {
    const order = await orderModel.findOne({ _id: orderId });
    console.log(order)
    res.status(200).json({ success: "order", order: order });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ success: "negative", order: {}, message: "Ummm...no." });
  }
};
export default orderGetOne;
