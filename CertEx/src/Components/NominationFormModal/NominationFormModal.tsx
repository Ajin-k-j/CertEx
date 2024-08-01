import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define the prop types
interface NominationFormModalProps {
  open: boolean;
  onClose: () => void;
  id: number;
  certificationName: string;
}

const NominationFormModal: React.FC<NominationFormModalProps> = ({
  open,
  onClose,
  id,
  certificationName,
}) => {
  const [plannedExamMonth, setPlannedExamMonth] = useState("");
  const [motivation, setMotivation] = useState("");

  const handleSubmit = async () => {
    try {
      // Sample function to return a mock employee ID
      const getEmployeeId = () => 123; // Replace with actual employee ID fetching logic

      const newNomination = {
        certification_id: id,
        planned_exam_month: plannedExamMonth,
        motivation_description: motivation,
        employee_id: getEmployeeId(),
        department_approval: "pending",
        l_and_d_approval: "pending",
        exam_date: null,
        exam_status: "pending",
        upload_certificate_status: "not uploaded",
        skill_matrix_status: "not updated",
        reimbursement_status: "not complete",
        nomination_status: "pending",
      };

    //   await axios.post("/Data/nominations.json", newNomination);
    console.log(newNomination)
      toast.success("Nomination submitted successfully!");

      // Close the modal after submission
      onClose();
    } catch (error) {
      toast.error("Failed to submit nomination.");
      console.error("Error submitting nomination:", error);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            borderRadius: "10px",
            padding: "10px",
            minWidth: "300px",
          },
        }}
      >
        <DialogTitle>Nominate for {certificationName}</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            Please fill in the following details to nominate yourself for this
            certification.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Planned Exam Month"
            type="month"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            value={plannedExamMonth}
            onChange={(e) => setPlannedExamMonth(e.target.value)}
          />
          <TextField
            margin="dense"
            label="What motivates you to take this certification?"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            placeholder="This will be reviewed by the Department head and L&D."
            value={motivation}
            onChange={(e) => setMotivation(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default NominationFormModal;
