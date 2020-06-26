import bcrypt from "bcryptjs";
import Admin from "../../db/models/admin.model";
import generateToken from "../helpers/generateToken";
import { SUCCESS, ERROR } from "../status";

const Login = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({
    where: { email },
  });

  if (!admin) {
    return res.json({
      status: ERROR,
      message: "Email not found",
    });
  }

  const match = await bcrypt.compare(password, admin.password);

  if (!match) {
    return res.json({
      status: ERROR,
      message: "Wrong password",
    });
  }

  const token = generateToken(admin.toJSON(), "admin");

  return res.json({
    status: SUCCESS,
    message: "Login successful",
    token,
  });
};

export default Login;
