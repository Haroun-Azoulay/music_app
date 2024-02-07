import express from "express";
import cityController from "../controllers/cityController";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.post("/add-point", verifyToken, cityController.addPoint);




router.get("/get-all-points", verifyToken, cityController.getAllPoints);

router.get("/get-point/:id", verifyToken, cityController.getPointByUser);

router.put("/update-point/:pointId", verifyToken, cityController.updatePoint);

router.delete("/delete-point/:pointId", verifyToken, cityController.deletePoint);


export default router;