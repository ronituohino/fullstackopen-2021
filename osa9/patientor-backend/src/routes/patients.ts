import express from "express";
import patientService from "../services/patientService";

import { toNewPatient, toNewEntry } from "../utils/patientUtils";

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

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const newPatient = patientService.addEntry(req.params.id, newEntry);

    return res.json(newPatient);
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
});

export default router;
