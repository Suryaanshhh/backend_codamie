import User from "../model/user.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
function generateJWT(Id) {
  return Jwt.sign(
    {
      userId: Id,
    },
    process.env.JWT_MAGIC_KEY
  );
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.status(500).json({ message: "SomeThing went wrong" });
        }
        if (result == true) {
          res
            .status(200)
            .json({
              message: "Login SuccessFull",
              token: generateJWT(user._id),
            });
        } else {
          res.status(500).json({ message: "Incorrect Password" });
        }
      });
    } else {
      res.status(500).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

export default login;