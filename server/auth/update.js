import userModel from "../users/userModel.js";

const update = async (req, res) => {
  const { product, operation } = req.body;
  //   console.log("carty cart", req.user.cart);

  try {
    let newCart = [...req.user.cart];

    if (operation === "add") {
      const itemInCart = req.user.cart.filter((item) => item.id === product.id);
      if (itemInCart.length === 0) {
        newCart.push({ ...product, quantity: 1 });
      } else {
        newCart = newCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
    } else if (operation === "remove") {
      const itemInCart = req.user.cart.filter((item) => item.id === product.id);

      if (itemInCart.length > 0) {
        if (itemInCart[0].quantity > 1) {
          newCart = newCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          newCart = newCart.filter((item) => item.id !== product.id);
        }
      }
    }
    else if (operation === "delete") {
        // Its going to take all the items that don't match the ID of the button I clicked and keep them, in turn DELETING the product I sent thru
        newCart = newCart.filter((item) => item.id !== product.id);
    }
    else if (operation === "checkout") {
      newCart = []
    }

    const updateUser = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      { cart: newCart },
      { returnDocument: "after" }
    );

    const updatedUserCart = {
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      email: updateUser.email,
      roles: updateUser.roles,
      username: updateUser.username,
      cart: updateUser.cart,
    };
   
    res.status(200).json({
      success: `${operation}`,
      user: updatedUserCart,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "There was an error.",
      success: "negative",
    });
  }
};
export default update;
