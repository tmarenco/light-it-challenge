import { useNavigate } from "react-router-dom";
import { Patient } from "../../interfaces/patient";
import { PatientCard } from "../PatientCard/PatientCard";
import styles from "./patient-list.module.scss";

interface Props {
  patients: Patient[];
}

export const PatientList = ({ patients }: Props) => {
  const navigate = useNavigate();

  const handleAddPatient = () => {
    navigate("/new-patient");
  };

  return (
    <div className={`center-content ${styles.container}`}>
      <div className={styles.header}>
        <h2>Patient List</h2>
        <button className={styles.addButton} onClick={handleAddPatient}>
          Add Patient
        </button>
      </div>
      <div className={styles["card-list"]}>
        {patients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))}
      </div>
    </div>
  );
};
