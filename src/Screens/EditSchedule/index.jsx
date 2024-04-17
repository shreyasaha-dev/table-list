import { Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import React, { useEffect, useRef } from "react";
import "./editSchedule.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../Store/ScheduleReducer";
const EditSchedule = () => {
  const params = useParams();
  const formikRef = useRef();
  const createData = useSelector((state) => state.createData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const today = new Date().toISOString().split("T")[0];
  useEffect(() => {
    const selectedData = createData.filter((item) => {
      if (item.id === params.id) {
        return item;
      }
    });
    formikRef?.current?.setFieldValue("patient", selectedData[0].patient);
    formikRef?.current?.setFieldValue("phone", selectedData[0].phone);
    formikRef?.current?.setFieldValue("doctor", selectedData[0].doctor);
    formikRef?.current?.setFieldValue("date", selectedData[0].date);
    formikRef?.current?.setFieldValue("message", selectedData[0].message);
  }, []);
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
        dispatch(actions.editData({ ...values, id: params.id }));
        navigate("/");
        resetForm();
      }}
      innerRef={formikRef}
    >
      {({ values, handleBlur, handleChange, handleSubmit }) => {
        return (
          <form>
            <div className="total-schedule">
              <h1>Edit Schedule</h1>
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
              <button onClick={handleSubmit}>Edit</button>
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export default EditSchedule;
