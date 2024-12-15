import { useState } from "react";
import styles from "./patient-card.module.scss";
import { Patient } from "../../interfaces/patient";

interface Props {
  patient: Patient;
}

export const PatientCard = ({ patient }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  console.log(patient);
  return (
    <div
      className={`${styles.card} ${isExpanded ? styles.expanded : ""}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className={styles["patient-header"]}>
        <h2>{patient.name}</h2>
        <img
          className={styles["patient-photo"]}
          src={patient.photo as string}
        />
      </div>

      <div className={styles["patient-details"]}>
        <p>Email: {patient.email}</p>
        <p>Address: {patient.address}</p>
        <p>Phone: {patient.phone}</p>
      </div>
    </div>
  );
};
