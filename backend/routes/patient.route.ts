import express from 'express';
import { getPatients, addPatient } from '../controllers/patient.controller';
import { patientValidationRules } from '../validations/patient.validation';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', getPatients);
router.post('/add', upload.single('photo'), patientValidationRules, addPatient);

export default router;
