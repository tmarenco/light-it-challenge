import { Patient } from '../interfaces/patient';
import { States } from '../interfaces/states';

interface FetchResult {
  state: States;
  data: Patient[] | null;
}

export const getPatients = async (): Promise<FetchResult> => {
  try {
    const response = await fetch('http://localhost:4000/patients');
    if (!response.ok) throw new Error('Error fetching patients');

    const data = await response.json();
    if (data.length === 0) {
      return { state: States.EMPTY, data: null };
    }

      const patientsWithImages = data.map((patient: Patient) => {
        patient.photo = `data:image/jpeg;base64,${patient.photo}`;
      return patient;
    });
    return { state: States.COMPLETED, data: patientsWithImages };
  } catch (error) {
    console.error(error);
    return { state: States.ERROR, data: null };
  }
};

export const createPatient = async (patient: Patient): Promise<void> => {
  const formData = new FormData();
  formData.append('name', patient.name);
  formData.append('email', patient.email);
  formData.append('address', patient.address);
  formData.append('phone', patient.phone.toString());
  formData.append('photo', patient.photo);

  const response = await fetch('http://localhost:4000/patients/add', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error creating patient');
  }
};
