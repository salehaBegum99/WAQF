import React, { useEffect, useState } from "react";
import axios  from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from 'react-icons/io5';
import {Formik,Form, Field} from "formik";//best for forms
import Input from "../../../Components/Input";
const Task = () => {
    const Navigate = useNavigate();
 const [propertyList,setpropertyList]=useState([]);
//maping the property data for dropdown 
 useEffect(() => {
 const getProperty = async () => {
   try {
     const response = await axios.get(
       "http://localhost:5000/api/properties"
     );
     const data = response.data;
     const options = data
       .filter(
         (property) =>
           property.Property_Name && property.Property_Name.trim() !== ""
       )
       .map((property) => ({
         value: property.Property_Name,
         label: property.Property_Name,
       }));

     setpropertyList(options);
   } catch (err) {
     console.log(err, "Property data Can't get");
   }
 };
 getProperty();
}, []);

    const handleSubmit = async (values, { setSubmitting }) => {
        console.log("Submitting task form with values:", values);
        try {
          // API call to my backend
          const response = await axios.post("http://localhost:5000/api/tasks", values);
          console.log("Task successfully submitted:", response.data);
          alert("Task submitted successfully!");
        } catch (error) {
          console.error("Error submitting task:", error);
          alert("Failed to submit task. Please try again.");
        } finally {
          setSubmitting(false);
        }
      };

      const dateValidationSchema = Yup.string()
      .nullable() // Allow null or undefined
      .notRequired() // Make the field optional
      .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format")
      .test("is-valid-date", "Invalid Date", (value) => {
        if (!value) return false; // Ensure value is present
  
        const [year, month, day] = value.split("-").map(Number);
  
        // Validate year range
        if (year < 1900 || year > 2100) return false;
  
        // Validate month and day ranges
        if (month < 1 || month > 12 || day < 1 || day > 31) return false;
  
        // Check for February and leap year logic
        if (month === 2) {
          if (day > 29) return false;
          if (day === 29 && !isLeapYear(year)) return false;
        }
  
        // Check for months with 30 days
        if ([4, 6, 9, 11].includes(month) && day > 30) return false;
  
        // Verify date using JavaScript Date object
        const date = new Date(year, month - 1, day);
        return (
          date.getFullYear() === year &&
          date.getMonth() === month - 1 &&
          date.getDate() === day
        );
      });
const TaskValidationSchema= Yup.object().shape({
    taskName:Yup.string().required("Task name is required"),
    dueDate:dateValidationSchema
})
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
          ADD TASK
        </h1>
            <Formik
            initialValues={{
                taskName: "",
                assignedTo: "",
                dueDate: "",
                priority: "",
                status: "",
                description: "",
                category: ""

            }}
            onSubmit={handleSubmit}
            validationSchema={TaskValidationSchema}
            >
                <Form className="form grid grid-cols-4 gap-4 mt-7 m-3 items-center bg-slate-400 " >
                
                   <Input label={"Task Name"} name={"taskName"} type={"text"} required={""}/>
                   <Input label={"Assigned To"} name={"assignedTo"} type={"dropdown"}
                   options={[...propertyList]} required={""}/>
                   <Input label={"Due Date"} name={"dueDate"} type={"date"} required={""}/>
                   <Input label={"Priority"} name={"priority"} type={"dropdown"} 
                    options={[
                        { value: 'Low', label: 'Low' },
                        { value: 'Medium', label: 'Medium' },
                        { value: 'high', label: 'High' }
                    ]}
                   required={""}/>
                   <Input label={"Status"} name={"status"}  type="dropdown"
                        options={[
                            { value: 'Pending', label: 'Pending' },
                            { value: 'in_progress', label: 'In Progress' },
                            { value: 'completed', label: 'Completed' }
                        ]}
                   required={""}/>
                   <Input label={"Description"} name={"description"} type="textarea"/>
                   <Input label={"Category"} name={"category"} type={"dropdown"}
                   options={[
                    { value: 'general', label: 'General' },
                    { value: 'maintenance', label: 'Maintenance' },
                    { value: 'urgent', label: 'Urgent' }
                ]} required={""}/>
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
            <div>
                <button className="button border border-b-2 w-[20vw] h-[10vh] m-4 rounded-md bg-blue-200 hover:zoom-in" type="submit" >Submit</button>
            </div>
                </Form>

            </Formik>
        </div>
        </>
    )
};
export default Task;