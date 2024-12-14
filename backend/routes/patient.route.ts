import express from 'express';
import { getPatients, addPatient } from '../controllers/patient.controller';
import { patientValidationRules } from '../validations/patient.validation';

const router = express.Router();

router.get('/', getPatients);
router.post('/', patientValidationRules, addPatient);

export default router;
