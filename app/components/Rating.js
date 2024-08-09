import Rating from "@mui/material/Rating";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Typography, Modal, Box, Button } from "@mui/material";
import React from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex", // flex box to display children component horizontally centered
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function RatingModal({ isOpen, onClose }) {
  const [value, setValue] = React.useState(0);
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = () => {
    setSubmitted(true)
    // need to implement the logic to save the rating here
  };
  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {submitted ? (
          <>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          Thank you for your feedback
        </Typography><VolunteerActivismIcon />
        </>):(<><Typography id="modal-modal-title" variant="h6" component="h2">
          Thank you for the conversation! How satisfied are you with our service?
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-between"></Box>
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ borderRadius: 1 }}
          >
            Submit!
          </Button>
        </Box>
        <Box mt={2} display="flex" justifyContent="space-between"></Box>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h6"
          onClick={onClose}
          sx={{ color: "text.secondary", fontSize: 16 }}
        >
          No thanks.
        </Typography></>)}

      </Box>
    </Modal>
  );
}
