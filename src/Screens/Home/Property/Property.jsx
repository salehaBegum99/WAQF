import React from "react";
import './Property.css';
import * as Yup from "yup";//for validations
// import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from 'react-icons/io5';
import axios from "axios";//for connecting api
import { Formik, Form, Field, ErrorMessage } from "formik"; 
import Input from "../../../Components/Input";
// import { toast } from "react-toastify";

const Property = () => {
  const Navigate = useNavigate();
  const propertyValues = {
    Property_Name: "",
    Street: "",
    City: "",
    State: "",
    Land_Area: "",
    Category: "",
  };

  const PropertyValidationSchema = Yup.object().shape({
    Street: Yup.string().required("Street is required"),
    Property_Name: Yup.string().required("Property Name is required"),
    City: Yup.string().required("City is required"),
    State: Yup.string().required("State is required"),
    Land_Area: Yup.number()
      .typeError("Land Area must be a number")
      .required("Land Area is required"),
    Category: Yup.string().required("Category is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Submitting property form with values:", values);
    try {
      // API call to your backend
      const response = axios.post("http://localhost:5000/api/properties", values);
      console.log("Property successfully submitted:", response.data);
      alert("Property submitted successfully")
    } catch (error) {
      console.error("Error submitting task:", error);
      alert("Failed to submit Property. Please try again.")
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="header items-center">
            <h1 className="text-center font-bold text-4xl pt-5">WAQF TASK TRACKER</h1>
        <button onClick={()=>Navigate(-1)}
       className=" ml-[3vw] mb-6  bg-stone-700 relative align-text-center bottom-[8vh] font-semibold rounded-md focus:ring-2 focus:ring-white focus:outline-none text-2xl pb-[8vh] pl-3 h-[10vh] w-[12vw]">
        <IoArrowBack></IoArrowBack>Back</button>
      </div>
      <div className="heading">
        <h1 className=" pl-[45vw] mt-2 h-14 font-bold pt-3 text-xl bg-stone-700 ">
          ADD PROPERTY
        </h1>
      
        <Formik
          initialValues={propertyValues}
          onSubmit={handleSubmit}
          validationSchema={PropertyValidationSchema}
        >
          <Form className="form grid grid-cols-4 gap-4 mt-7 m-3 items-center bg-slate-400 ">
           <Input
           label={"Property Name"}
           name={"Property_Name"}
           type={"text"}
           required={""}
           placeholder={"Enter Property Name"}
           />

            <Input
              label={"Street"}
              name={"Street"}
              type={"text"}
              required={""}
              placeholder={"Enter Street"}
            />
            <Input label={"City"} name={"City"} type={"text"} required={""} />
            <Input label={"State"} name={"State"} type={"text"} required={""} />
            <Input
              label={"Land Area"}
              name={"Land_Area"}
              type={"text"}
              required={""}
            />
            <Input
              label={"Category"}
              name={"Category"}
              type={"dropdown"}
              options={[
                { value: "Mosque", label: "Mosque" },
                { value: "School", label: "School" },
                { value: "land", label: "Land" },
                { value: "Others", label: "Others" },
              ]}
              required={""}
            />
            {/* <div className="w-full h-full bg-slate-700">
                        <label>Area</label>
                        <Field type="Area" name="Area" className= "bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[20vw] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                        <div className="w-full h-full bg-slate-700">
                        <label>City</label>
                        <Field type="City" name="City" className= "bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[20vw] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div>
                        <div className="w-full h-full bg-slate-700">
                        <label>State</label>
                        <Field type="State" name="State" className= "bg-gray-50 border border-gray-400 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[20vw] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                        </div> */}
            <p></p>
            <p></p>
            <div>
              <button
                className="button border border-b-2 w-[19vw] h-[8vh] m-4 rounded-md bg-blue-200 hover:zoom-in"
                type="submit"
              >
                Submit
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
};
export default Property;
