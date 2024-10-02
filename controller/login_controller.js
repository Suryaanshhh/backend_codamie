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
  const { email, pass } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    bcrypt.compare(pass, user.password, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "SomeThing went wrong" });
      }
      if (result == true) {
        return res.status(200).json({
          message: "Login SuccessFull",
          token: generateJWT(user._id),
        });
      } else {
        return res.status(500).json({ message: "Incorrect Password" });
      }
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
};

export default login;
