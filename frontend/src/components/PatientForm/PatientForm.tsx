import { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createPatient } from "../../api/patientApi";
import { convertImageToBase64 } from "../../utils/convert-images";
import styles from "./patient-form.module.scss";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { addPatientToLocalStorage } from "../../api/localStorage";

interface Patient {
  name: string;
  email: string;
  address: string;
  phone: string;
  photo: File | string;
  countryCharacteristic: string;
}

export const PatientForm = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formik = useFormik<Patient>({
    initialValues: {
      name: "",
      email: "",
      address: "",
      phone: "",
      countryCharacteristic: "",
      photo: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z\s]+$/, "Only letters are allowed")
        .required("Name is required"),
      email: Yup.string()
        .matches(/@gmail\.com$/, "The email must include @gmail.com")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Only numbers are allowed")
        .required("Phone number is required"),
      countryCharacteristic: Yup.string()
        .matches(/^[0-9]+$/, "Only numbers are allowed")
        .required("Country code is required"),
      address: Yup.string().required("Address is required"),
      photo: Yup.string().required("Photo is required"),
    }),
    onSubmit: async (values) => {
      try {
        const { countryCharacteristic, phone, ...rest } = values;
        const patientData = {
          ...rest,
          phone: Number(`${countryCharacteristic}${phone}`),
        };

        await createPatient(patientData);
        addPatientToLocalStorage(patientData);
        Swal.fire({
          title: "Good job!",
          text: "Patient added successfully",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            handleGoHome();
          }
        });
      } catch (error: unknown) {
        if (error instanceof Error) {
          Swal.fire({
            title: "Error",
            text:
              error.message ||
              "There has been an error while adding the patient",
            icon: "error",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "There has been an unexpected error while adding the patient",
            icon: "error",
          });
        }
      }
    },
  });

  const handleFile = async (file: File | null) => {
    if (file && file.type === "image/jpeg") {
      const base64Image = await convertImageToBase64(file);
      formik.setFieldValue("photo", file);
      setPhotoPreview(base64Image);
    } else {
      Swal.fire({
        title: "Warning",
        text: "Only .jpg images are allowed",
        icon: "warning",
      });
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const showError = (field: keyof Patient) => {
    return formik.submitCount > 0 && !!formik.errors[field];
  };

  return (
    <form onSubmit={formik.handleSubmit} className={styles.container}>
      <div className={styles["field-container"]}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {showError("name") && (
          <div className={styles["error-message"]}>{formik.errors.name}</div>
        )}
      </div>

      <div className={styles["field-container"]}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {showError("email") && (
          <div className={styles["error-message"]}>{formik.errors.email}</div>
        )}
      </div>

      <div className={styles["field-container"]}>
        <label>Country Characteristic:</label>
        <input
          type="text"
          name="countryCharacteristic"
          onChange={formik.handleChange}
          value={formik.values.countryCharacteristic}
        />
        {showError("countryCharacteristic") && (
          <div className={styles["error-message"]}>
            {formik.errors.countryCharacteristic}
          </div>
        )}
      </div>

      <div className={styles["field-container"]}>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
        {showError("phone") && (
          <div className={styles["error-message"]}>{formik.errors.phone}</div>
        )}
      </div>

      <div className={styles["field-container"]}>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          onChange={formik.handleChange}
          value={formik.values.address}
        />
        {showError("countryCharacteristic") && (
          <div className={styles["error-message"]}>{formik.errors.address}</div>
        )}
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onClick={handleClick}
        className={styles["drag-and-drop-container"]}
      >
        {photoPreview ? (
          <img src={photoPreview} alt="Preview" />
        ) : (
          "Drag and drop your photo here (only .jpg)"
        )}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/jpeg"
          onChange={handleFileChange}
        />
      </div>
      {showError("photo") && (
        <div className={styles["error-message"]}>{formik.errors.photo}</div>
      )}

      <button type="submit">Send</button>
    </form>
  );
};
