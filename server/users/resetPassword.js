import userModel from "./userModel.js";
import * as argon2 from "argon2";

const resetPassword = async (req, res, next) => {
  const { username, answer, password } = req.body;

  try {
    const user = await userModel.findOne({ username: username });
    const security = await argon2.verify(
      user.securityQuestion[0].answer,
      answer
    );

    if (!user) {
      res
        .status(500)
        .json({ message: "User information not valid.", success: "negative" });
    } else if (user && security) {
      user.password = await argon2.hash(password);
      user.save();

      res
        .status(200)
        .json({
          success: "password updated",
          message: "Password updated.",
          user: user,
        });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "User information not valid.", success: "negative" });
  }
};
export default resetPassword;
