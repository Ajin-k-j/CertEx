import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// Define the prop types
interface NominationFormModalProps {
  open: boolean;
  onClose: () => void;
  certificationName: string;
}

const NominationFormModal: React.FC<NominationFormModalProps> = ({
  open,
  onClose,
  certificationName,
}) => {
  return (
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
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onClose} color="primary" variant="contained">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NominationFormModal;
