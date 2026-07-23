import orderModel from "./orderModel.js";


const orderCreate = async (req, res) => {
  const { user, shippingAddress, payment, shipping, items } = req.body;
  console.log(user, shippingAddress, payment, shipping, items);

  try {
    if(
    (!user || user == {}) || 
    (!shippingAddress || shippingAddress == {}) || 
    (!payment || payment == {}) || 
    (!shipping || shipping == {}) || 
    (!items || items == []) 
  ) {
    res.status(500).json({ "message": "User information not valid." })
  }
  else {
    const newOrder = await orderModel.create({
      user,
      shippingAddress,
      payment,
      shipping,
      items,
    });
    res.status(200).json({ success: "order created", order: newOrder });
  }
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: 'negative', message: "Learn React 👽"})
  }
};

export default orderCreate;
