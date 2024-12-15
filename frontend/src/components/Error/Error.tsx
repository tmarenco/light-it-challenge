import { useNavigate } from "react-router-dom";
import styles from "./error.module.scss";

interface Props {
  message: string;
  showButton: boolean;
}

export const Error = ({ message, showButton }: Props) => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles["texts-container"]}>
          <h2>Oops!</h2>
          <p>{message}</p>
          {showButton && (
            <button onClick={handleBackToHome}>Back to home</button>
          )}
        </div>
        <img src="src/assets/images/error.svg"></img>
      </div>
    </>
  );
};
