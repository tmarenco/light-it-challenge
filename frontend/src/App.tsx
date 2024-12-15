import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { NewPatient } from "./pages/NewPatient/NewPatient";
import { Error } from "./components/Error/Error";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-patient" element={<NewPatient />} />
        <Route
          path="*"
          element={
            <Error
              message="We couldn’t find what you’re looking for."
              showButton={true}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
