import express from "express";
import patientService from "../services/patientService";

import { toNewPatient } from "../utils/patientUtils";

const router = express.Router();

router.get("/", (_req, res) => {
  return res.json(patientService.getAllNonSensitive());
});

router.get("/:id", (req, res) => {
  try {
    return res.json(patientService.getSinglePatient(req.params.id));
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedEntry = patientService.addPatient(newPatient);

    return res.json(addedEntry);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

export default router;
