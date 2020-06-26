import jwt from "jsonwebtoken";
import env from "../../env";
const JWT_SECRET = env("JWT_SECRET");

const generateToken = (user, level) => {
  const { id, firstName, lastName, email } = user;
  return jwt.sign(
    {
      id,
      firstName,
      lastName,
      email,
      level,
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
};

export default generateToken;
