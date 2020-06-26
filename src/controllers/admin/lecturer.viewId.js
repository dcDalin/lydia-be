import Lecturer from "../../db/models/lecturer.model";
import { ERROR, SUCCESS } from "../status";

const LecturerViewId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({
        status: ERROR,
        message: "No id provided",
      });
    } else {
      const result = await Lecturer.findByPk(id);
      if (!result) {
        return res.json({
          status: ERROR,
          message: `Lecturer with id ${id} not found`,
        });
      }
      return res.json({
        status: SUCCESS,
        message: result,
      });
    }
  } catch (error) {
    console.log("Error is: ", error);
    return res.json({
      status: ERROR,
      message: "An unknown error occured, please try again",
    });
  }
};

export default LecturerViewId;
