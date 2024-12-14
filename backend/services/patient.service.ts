import pool from '../db/db';
import { Patient } from '../interfaces/patient.interface';

export const getAllPatients = async (): Promise<Patient[]> => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM patients', (error, results) => {
      if (error) return reject(error);
      resolve(results);
    });
  });
};

export const createPatient = async (patient: Patient): Promise<void> => {
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO patients SET ?', patient, (error) => {
      if (error) return reject(error);
      resolve();
    });
  });
};

export const isEmailUnique = async (email: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM patients WHERE email = ?', [email], (error, results) => {
      if (error) return reject(error);
      resolve(results.length === 0);
    });
  });
};
