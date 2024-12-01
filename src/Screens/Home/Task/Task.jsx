import React from "react";
import axios  from "axios";
import {Formik,Form, Field} from "formik";
import Input from "../../../Components/Input";
const Task = () => {
 
    const handleSubmit = async (values, { setSubmitting }) => {
        console.log("Submitting task form with values:", values);
    
        try {
          // API call to your backend
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

    return (
        <>
         <div className="header items-center">
                <h1 className="text-center font-bold text-4xl pt-5">WAQF TASK TRACKER</h1>
            </div>
        <div>
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
            >
                <Form className="grid grid-cols-4 gap-4 mt-7 m-3 items-center bg-slate-400 " >
                   
                   <Input label={"Task Name"} name={"taskName"} type={"text"} required={""}/>
                   <Input label={"Assigned To"} name={"assignedTo"} type={"dropdown"} required={""}/>
                   <Input label={"Due Date"} name={"dueDate"} type={"date"} required={""}/>
                   <Input label={"Priority"} name={"priority"} type={"dropdown"} 
                    options={[
                        { value: 'Low', label: 'Low' },
                        { value: 'medium', label: 'Medium' },
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
                <button className="border border-b-2 w-[20vw] h-[10vh] m-4 rounded-md bg-blue-200 hover:zoom-in" type="submit" >Submit</button>
            </div>
                </Form>

            </Formik>
        </div>
        </>
    )
};
export default Task;