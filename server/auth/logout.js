import userModel from "../users/userModel.js";

const logout = async (req, res, done) => {
  const { token } = req.params;
  if (!req.user) {
    res.status(401).json({ success: false, message: "Not authenticated." });
  }
  try {
    const logoutUser = await userModel.findOneAndUpdate(
      { _id: req.user._id },
      { tokens: [] },
      { returnDocument: "after" }
    );
    // console.log(logoutUser)
    res
      .status(200)
      .json({
        success: "logout successful",
        message: "Logged out successfully.",
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "There was an error.", success: "negative" });
  }
};
export default logout;
