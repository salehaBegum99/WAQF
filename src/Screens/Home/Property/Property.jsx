import React from "react";
import * as Yup from "yup";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Input from "../../../Components/Input";
import { Await } from "react-router-dom";
const Property = () => {
  const propertyValues = {
    Property_Name: " ",
    Street: "",
    City: "",
    State: "",
    Land_Area: "",
    Category: "",
  };

  const PropertyValidationSchema = Yup.object().shape({
    Property_Name: Yup.string().required("Property Name is required"),
    Land_Area: Yup.string().required("Area is required"),
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
      console.log("Task successfully submitted:", response.data);
      alert("Task submitted successfully!");
    } catch (error) {
      console.error("Error submitting task:", error);
      alert("Failed to submit task. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="header items-center">
        <h1 className="text-center font-semibold text-4xl pt-4">
          WAQF TASK TRACKER
        </h1>
      </div>
      <div>
        <h1 className=" pl-[45vw] h-14 font-bold pt-3 text-xl bg-stone-700 ">
          ADD PROPERTY
        </h1>
        <Formik
          initialValues={propertyValues}
          onSubmit={handleSubmit}
          validationSchema={PropertyValidationSchema}
        >
          <Form className="grid grid-cols-4 gap-4 mt-7 m-3 items-center bg-slate-400 ">
            <Input
              label={"Property Name"}
              name={"Property_Name"}
              type={"text"}
              required={""}
            />

            <Input
              label={"Street"}
              name={"Street"}
              type={"text"}
              required={""}
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
                className="border border-b-2 w-[20vw] h-[10vh] m-4 rounded-md bg-blue-200 hover:zoom-in"
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
