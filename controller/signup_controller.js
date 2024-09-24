import User from "../model/user.js";
import bcrypt from "bcrypt";
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000); 
}

const SignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newotp = generateOTP();
    

    const hash = await bcrypt.hashSync(password, 15);
    const response = await User.create({
      name: name,
      email: email,
      password: hash,
      otp: newotp,
    });

    res.status(201).json({ user: response, success: "true" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "SomeThing went wrong" });
  }
};

export default SignUp;