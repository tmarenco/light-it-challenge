import { useNavigate } from "react-router-dom";
import { PatientForm } from "../../components/PatientForm/PatientForm";
import styles from "./new-patient.module.scss";

export const NewPatient = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <>
      <div className="center-content">
        <div className={styles.container}>
          <button className={styles["go-back-button"]} onClick={handleGoBack}>
            Go Back
          </button>
          <h1>Add New Patient</h1>
        </div>
        <PatientForm />
      </div>
    </>
  );
};
