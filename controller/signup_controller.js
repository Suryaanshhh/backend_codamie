import User from "../model/user.js";
import bcrypt from "bcrypt";
import Sib from "sib-api-v3-sdk";
import { configDotenv } from "dotenv";
configDotenv();
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000);
}

const SignUp = async (req, res) => {
  var defaultClient = Sib.ApiClient.instance;

  var apiKey = defaultClient.authentications["api-key"];

  apiKey.apiKey = process.env.SIB_API_KEY;

  const TranEmailApi = new Sib.TransactionalEmailsApi();
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

    const sender = {
      email: "jaimelannister232@gmail.com",
    };
    const recievers = [
      {
        email: email,
      },
    ];
    const mailSent = await TranEmailApi.sendTransacEmail({
      sender,
      to: recievers,
      subject: "Your Otp for email verification",
      textContent: `This is your otp : ${newotp}`,
    });
    console.log(mailSent);
    res.status(201).json({ user: response, success: "true" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "SomeThing went wrong" });
  }
};

export default SignUp;
