import React, { useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
// import { toast } from "react-toastify";

const CustomizedTable1 = ({
  data,
  columns,
  defaultPageSize = 10,
  showEditOption = true,  // Make sure this is passed as true to show edit icon
  
  tableType =  "task" && "property", // default to task, can be "task" or "property"
}) => {
  const [tableData, setTableData] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [editedRowData, setEditedRowData] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const openEditForm = (row) => {
    setEditingRow(row);
    setEditedRowData({ ...row }); // Prepopulate data
    setOpenModal(true);
  };

  const handleEditChange = (e, column) => {
    setEditedRowData((prevData) => ({
      ...prevData,
      [column.accessorKey]: e.target.value,
    }));
  };

  const handleSaveClick = async () => {
    if (!editingRow?._id) {
      console.error("Editing row ID is missing");
      return;
    }

    const updatedData = { ...editingRow, ...editedRowData };

    try {
      if (tableType === "task") {
        const response = await axios.put(
          `http://localhost:5000/api/tasks/${editingRow._id}`,
          updatedData
        );
        console.log(response?.data, "#Response from Task PUT API");

        setTableData((prevData) =>
          prevData.map((row) =>
            row._id === editingRow._id ? { ...row, ...updatedData } : row
          )
        );
        alert("Task updated successfully!");
      } else if (tableType === "property") {
        const response = await axios.put(
          `http://localhost:5000/api/properties/${editingRow._id}`,
          updatedData
        );
        console.log(response?.data, "#Response from Property PUT API");

        setTableData((prevData) =>
          prevData.map((row) =>
            row._id === editingRow._id ? { ...row, ...updatedData } : row
          )
        );
        alert("Property updated successfully!");
      } else {
        console.error("Unknown form type");
        alert("Failed to determine form type.");
      }
    } catch (error) {
      console.error(`Error updating ${tableType === "task" ? "task" : "property"}`, error);
      alert(`Failed to update the ${tableType}.`);
    } finally {
      setOpenModal(false);
      setEditingRow(null);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingRow(null);
  };

  return (
    <Box>
      <MaterialReactTable
        columns={[
          ...columns.filter((column) => !column.hidden),
          {
            _id: "actions",
            header: "Actions",
            size: 100,
            Cell: ({ row }) => (
              <>
                {showEditOption && tableType === "task" && (
                  <IconButton
                    onClick={() => openEditForm(row.original)}
                    aria-label="edit task"
                  >
                    <EditIcon /> {/* Edit Task */}
                  </IconButton>
                )}
                {showEditOption && tableType === "property" && (
                  <IconButton
                    onClick={() => openEditForm(row.original)}
                    aria-label="edit property"
                  >
                    <EditIcon /> {/* Edit Property */}
                  </IconButton>
                )}
              </>
            ),
          },
        ]}
        data={tableData}
        enableColumnOrdering
        getRowId={(row) => row._id}
        muiTableBodyRowProps={{
          hover: true,
        }}
        initialState={{
          pagination: {
            pageSize: defaultPageSize,
          },
        }}
      />

      {/* Edit Modal */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>
          {tableType === "task" ? "Edit Task" : "Edit Property"}
        </DialogTitle>
        <DialogContent>
          {columns.map((column) => (
            <TextField
              key={column.accessorKey}
              label={column.header}
              value={editedRowData?.[column.accessorKey] || ""}
              onChange={(e) => handleEditChange(e, column)}
              fullWidth
              margin="dense"
              disabled={column.accessorKey === "_id"}
            />
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveClick} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CustomizedTable1;
