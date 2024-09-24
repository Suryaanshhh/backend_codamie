import { error } from "console";
import User from "../model/user.js";

const verification = async (req, res) => {
  try {
    const email = req.body.email;
    const enteredOtp = req.body.otp;
    console.log(enteredOtp);
    console.log(email);
    const update = { verified: true };
    const data = await User.findOne({ email: email });
    if (data.verified == true) {
      res.status(200).json({ message: "Email already verified" });
    } else if (data.otp == enteredOtp) {
      await User.findOneAndUpdate({ email: email }, update);
      res.status(200).json({ message: "Email verified successfully" });
    }
  } catch (Err) {
    console.log(Err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default verification;
