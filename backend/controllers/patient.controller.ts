import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { getAllPatients, createPatient, isEmailUnique } from '../services/patient.service';
import { convertPhotoToBase64 } from '../utils/fileUtils';
import { sendEmail } from '../services/email.service';

export const getPatients = async (req: Request, res: Response) => {
  try {
    const patients = await getAllPatients();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching patients' });
  }
};

export const addPatient = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, address, phone } = req.body;
  const file = req.file!;

  try {
    const emailUnique = await isEmailUnique(email);
    if (!emailUnique) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const photo = convertPhotoToBase64(file);
    await createPatient({ name, email, address, phone, photo });
    sendEmail(
      email
    ).catch((err) => {
    });
    res.status(201).json({ message: 'Patient created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating patient' });
  }
};
