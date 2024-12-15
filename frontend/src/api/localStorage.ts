import { Patient } from "../interfaces/patient";

const LOCAL_STORAGE_KEY = 'patients';

export const savePatientsToLocalStorage = (patients: Patient[]): void => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(patients));
};

export const getPatientsFromLocalStorage = (): Patient[] => {
  const storedPatients = localStorage.getItem(LOCAL_STORAGE_KEY);
  return storedPatients ? JSON.parse(storedPatients) : [];
};

export const addPatientToLocalStorage = (patient: Patient): void => {
  const existingPatients = getPatientsFromLocalStorage();
  existingPatients.push(patient);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingPatients));
};
