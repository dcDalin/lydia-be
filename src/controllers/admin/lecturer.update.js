import Lecturer from "../../db/models/lecturer.model";
import { FAILURE, SUCCESS } from "../status";

const LecturerUpdate = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await Lecturer.findByPk(id);
    if (!result) {
      return res.json({
        status: FAILURE,
        message: `Lecturer with id ${id} not found`,
      });
    }

    const { firstName, lastName } = req.body;

    const updateResult = await Lecturer.update(
      {
        firstName,
        lastName,
      },
      { where: { id } }
    );

    if (updateResult) {
      return res.json({
        status: SUCCESS,
        message: "Lecturer updated successfully",
      });
    }

    return res.json({
      status: FAILURE,
      message: `Could not update lecturer details`,
    });
  } catch (error) {
    console.log("Error is: ", error);
    return res.json({
      status: FAILURE,
      message: "An unknown error occured, please try again",
    });
  }
};

export default LecturerUpdate;
