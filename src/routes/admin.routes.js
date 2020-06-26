import express from "express";
import Login from "../controllers/admin/login";
import LecturerNew from "../controllers/admin/lecturer.new";
import LecturerView from "../controllers/admin/lecturer.view";
import LecturerViewId from "../controllers/admin/lecturer.viewId";
import LecturerUpdate from "../controllers/admin/lecturer.update";

const adminRouter = express.Router();

adminRouter.post("/login", Login);

adminRouter.post("/lecturer-create", LecturerNew);

// Get all lecturers
adminRouter.get("/lecturer-view", LecturerView);

// Get single lec
adminRouter.get("/lecturer-view/:id", LecturerViewId);

// Get single lec
adminRouter.put("/lecturer-update/:id", LecturerUpdate);

export default adminRouter;
