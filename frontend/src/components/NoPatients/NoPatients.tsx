import { useNavigate } from "react-router-dom";

export const NoPatients = () => {
  const navigate = useNavigate();

  const handleAddPatient = () => {
    navigate("/new-patient");
  };

  return (
    <div className="center-content">
      <h2>No patients found</h2>
      <p>Please add a patient to get started.</p>
      <button onClick={handleAddPatient}>Add Patient</button>
    </div>
  );
};
