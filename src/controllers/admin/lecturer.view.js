import { Op } from "sequelize";
import Lecturer from "../../db/models/lecturer.model";
import { FAILURE, SUCCESS } from "../status";

const LecturerView = async (req, res) => {
  try {
    const { param } = req.query;
    console.log("Params is: ", param);
    // no email in params
    if (!param) {
      const lecturers = await Lecturer.findAll({});

      return res.json({
        status: SUCCESS,
        message: lecturers,
      });
    } else {
      const lowerCaseParam = param.toLowerCase();

      const result = await Lecturer.findAll({
        where: {
          [Op.or]: [
            {
              email: {
                [Op.like]: "%" + lowerCaseParam + "%",
              },
            },
            {
              firstName: {
                [Op.like]: "%" + lowerCaseParam + "%",
              },
            },
            {
              lastName: {
                [Op.like]: "%" + lowerCaseParam + "%",
              },
            },
          ],
        },
      });

      console.log("Lowercase param is: ", lowerCaseParam);
      return res.json({
        status: SUCCESS,
        message: result,
      });
    }
  } catch (error) {
    console.log("Error is: ", error);
    return res.json({
      status: FAILURE,
      message: "An unknown error occured, please try again",
    });
  }
};

export default LecturerView;
