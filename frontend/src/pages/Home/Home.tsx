import { useEffect, useState } from "react";
import { Patient } from "../../interfaces/patient";
import { getPatients } from "../../api/patientApi";
import { PatientList } from "../../components/PatientList/PatientList";
import { NoPatients } from "../../components/NoPatients/NoPatients";
import { Error } from "../../components/Error/Error";
import { States } from "../../interfaces/states";
import { Spinner } from "../../shared/components/Spinner/Spinner";

interface StateViewProps {
  patients?: Patient[];
  message?: string;
}

const StateViews: { [key in States]: React.FC<StateViewProps> } = {
  [States.LOADING]: () => <Spinner />,
  [States.ERROR]: () => (
    <Error message={"Error fetching patients"} showButton={false} />
  ),
  [States.COMPLETED]: ({ patients }) => (
    <PatientList patients={patients || []} />
  ),
  [States.EMPTY]: () => <NoPatients />,
};

export const Home = () => {
  const [state, setState] = useState<States>(States.LOADING);
  const [patients, setPatients] = useState<Patient[]>([]);

  const fetchPatients = async () => {
    const result = await getPatients();
    setState(result.state);
    if (result.state === States.COMPLETED && result.data) {
      setPatients(result.data);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const CurrentView = StateViews[state];

  return (
    <div className="center-content">
      <h1>Light-it Challenge</h1>
      <CurrentView patients={patients} />
    </div>
  );
};
