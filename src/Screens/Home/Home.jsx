import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CustomizedTable1 from "../../Components/CustomizedTable1";

const Home = () => {
  const Navigate = useNavigate();
  const [property, setProperty] = useState([]);
  const [task, setTask] = useState([]);

  // Fetch property data
  useEffect(() => {
    const getProperty = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/properties");
        setProperty(response.data);
        console.log(response.data, "Property Data");
      } catch (err) {
        console.error("Error fetching property data:", err);
      }
    };
    getProperty();
  }, []);

  // Fetch task data
  useEffect(() => {
    const getTask = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tasks");
        setTask(response.data);
        console.log(response.data, "Task Data");
      } catch (err) {
        console.error("Error fetching task data:", err);
      }
    };
    getTask();
  }, []);

  // Property table columns
  const propertyColumns = [
    { accessorKey: "_id", header: "ID",hidden:"true" },
    { accessorKey: "Property_Name", header: "Property Name" },
    { accessorKey: "Street", header: "Street" },
    { accessorKey: "City", header: "City" },
    { accessorKey: "State", header: "State" },
    { accessorKey: "Land_Area", header: "Land Area" },
    { accessorKey: "Category", header: "Category" },
  ];

  // Task table columns
  const taskColumns = [
    { accessorKey: "_id", header: "ID",hidden:"true" },
    { accessorKey: "taskName", header: "Task Name" },
    { accessorKey: "assignedTo", header: "Assigned To" },
    { accessorKey: "dueDate", header: "Due Date" },
    { accessorKey: "priority", header: "Priority" },
    { accessorKey: "status", header: "Status" },
  ];

  // Property table data
  const propertyTableData = property.map((item) => ({
   _id: item._id,
    Property_Name: item.Property_Name,
    Street: item.Street,
    City: item.City,
    State: item.State,
    Land_Area: item.Land_Area,
    Category: item.Category,
  }));

  // Task table data
  const taskTableData = task.map((item) => ({
    _id: item._id,
    taskName: item.taskName,
    assignedTo: item.assignedTo,
    dueDate: item.dueDate,
    priority: item.priority,
    status: item.status,
  }));

  return (
    <>
      {/* Header */}
      <div className="header items-center">
        <h1 className="text-center font-bold text-4xl pt-5">WAQF TASK TRACKER</h1>
      </div>

      {/* Buttons */}
      <div className="buttons pt-10 h-[20vh] p-8 flex justify-between items-center">
        <div
          className="b1 cursor-pointer font-serif font-semibold bg-slate-400 ml-[10vw] w-[15vw] h-[10vh] rounded-lg p-5 pt-4"
          onClick={() => Navigate("/Property")}
        >
          Add Property +
        </div>
        <div
          className="b2 cursor-pointer font-serif font-semibold bg-slate-400 mr-[10vw] w-[13vw] h-[10vh] rounded-lg p-6 pt-4 pl-5"
          onClick={() => Navigate("/Task")}
        >
          Add Task +
        </div>
      </div>

      {/* Tables */}
      <div className="mt-5 flex justify-center gap-10">
        {/* Property Data Table */}
        <div className="w-1/2 ml-3">
          <h1 className="text-neutral-800 underline text-2xl text-center mb-4">
            Property Data
          </h1>
          <CustomizedTable1
            data={propertyTableData}
            columns={propertyColumns}
            displaySearchBar={false}
            showEditOption={true}
          />
        </div>

        {/* Task Data Table */}
        <div className="w-1/2">
          <h1 className="text-neutral-800 underline text-2xl text-center mb-4">
            Task Data
          </h1>
          <CustomizedTable1 
          
            data={taskTableData}
            columns={taskColumns}
            displaySearchBar={false}
            showEditOption={true}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
