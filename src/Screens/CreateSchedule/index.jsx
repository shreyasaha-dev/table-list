import { ErrorMessage, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import * as yup from "yup";
import { actions } from "../../Store/ScheduleReducer";
import "./createSchedule.css";

const CreateSchedule = () => {
  const today = new Date().toISOString().split("T")[0];

  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Formik
      initialValues={{
        patient: "",
        phone: "",
        doctor: "",
        date: "",
        message: "",
      }}
      validationSchema={yup.object().shape({
        patient: yup.string().trim().required("This field is mandatory"),
        phone: yup
          .string()
          .trim()
          .min(10, "Please enter 10 digit number")
          .max(10, "Please enter 10 digit number")
          .required("This field is mandatory"),
        doctor: yup.string().trim().required("This field is mandatory"),
        date: yup.date().required("This field is mandatory"),
        message: yup.string().trim().required("This field is mandatory"),
      })}
      onSubmit={(values, { resetForm }) => {
        dispatch(actions.addData({ ...values, id: v4() }));
        resetForm();
        navigate("/");
      }}
    >
      {({ values, handleBlur, handleChange, handleSubmit }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="total-schedule">
              <h1>Create a Schedule</h1>
              <div className="inputs">
                <div className="each-input">
                  <label>Patient Name : </label>
                  <input
                    placeholder="Patient Name"
                    name="patient"
                    value={values.patient}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="error-message">
                    <ErrorMessage name="patient" />
                  </span>
                </div>
                <div className="each-input">
                  <label>Phone Number : </label>
                  <input
                    placeholder="Phone Number"
                    type="tel"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="error-message">
                    <ErrorMessage name="phone" />
                  </span>
                </div>
              </div>
              <div className="inputs">
                <div className="each-input">
                  <label>Doctor's Name : </label>
                  <input
                    placeholder="Doctor's Name"
                    name="doctor"
                    value={values.doctor}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="error-message">
                    <ErrorMessage name="doctor" />
                  </span>
                </div>
                <div className="each-input">
                  <label>Date : </label>
                  <input
                    className="date"
                    type="date"
                    name="date"
                    value={values.date}
                    min={today}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <span className="error-message">
                    <ErrorMessage name="date" />
                  </span>
                </div>
              </div>
              <div className="text-area each-input">
                <label>Describe your problem : </label>
                <textarea
                  placeholder="Type here..."
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>
                <span className="error-message">
                  <ErrorMessage name="message" />
                </span>
              </div>
              <button type="submit">Create</button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default CreateSchedule;
