import generator from "generate-password";
import bcrypt from "bcryptjs";
import Lecturer from "../../db/models/lecturer.model";
import { FAILURE, SUCCESS } from "../status";

const LecturerNew = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // check lec email exists
    const lecturer = await Lecturer.findOne({
      where: { email },
    });

    if (lecturer) {
      return res.json({
        status: FAILURE,
        message: "Lecturer email already exists",
      });
    }

    const password = generator.generate({
      length: 6,
      numbers: true,
    });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Save to DB
    await Lecturer.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    return res.json({
      status: SUCCESS,
      message: `Lecturer ${firstName} has been created successfully`,
    });
  } catch (error) {
    console.log("Error is: ", error);
    return res.json({
      status: FAILURE,
      message: "An unknown error occured, please try again",
    });
  }
};

export default LecturerNew;
