import Lecturer from "../../db/models/lecturer.model";
import { FAILURE, SUCCESS } from "../status";

const LecturerViewId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.json({
        status: FAILURE,
        message: "No id provided",
      });
    } else {
      const result = await Lecturer.findByPk(id);
      if (!result) {
        return res.json({
          status: FAILURE,
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
      status: FAILURE,
      message: "An unknown error occured, please try again",
    });
  }
};

export default LecturerViewId;
