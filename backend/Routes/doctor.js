import express from 'express';
import { deleteDoctor, getAllDoctor, getDoctorProfile, getSingleDoctor, updateDoctor } from '../Controllers/doctorController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

import reviewRouter from './review.js'

const router = express.Router();

router.use("/:doctorId/reviews", reviewRouter);

router.get("/:id", getSingleDoctor);
router.delete("/:id", authenticate, restrict(['doctor']), deleteDoctor);
router.get("/", getAllDoctor);
router.put("/:id", authenticate, restrict(['doctor']), updateDoctor);
router.get("/profile/me", authenticate, restrict(['doctor']), getDoctorProfile);
export default router;
