import Rating from "@mui/material/Rating";
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import { Typography, Modal, Box, Button, TextField } from "@mui/material";
import React from "react";
import { Opacity } from "@mui/icons-material";
import StarIcon from '@mui/icons-material/Star';

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

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
}

function getLabelsText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
  
}

export default function RatingModal({ isOpen, onClose }) {
  const [value, setValue] = React.useState(0);
  const [hover, setHover] = React.useState(-1);
  const [submitted, setSubmitted] = React.useState(false);
  const [feedback, setFeedback] = React.useState('');

  const handleChange = (event) => {
    setFeedback(event.target.value);
  };

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
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{borderRadius: 1}}>
          Thank you for your feedback!
        </Typography><VolunteerActivismIcon />
        </>):(<><Typography id="modal-modal-title" variant="h6" component="h2">
          Thank you for the conversation! How satisfied are you with our service?
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-between"></Box>
        <Rating
          name="simple-controlled"
          value={value}
          getLabelText={getLabelsText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ Opacity: 0.55 }} fontSize="inherit"/>}
        />
            {value !== null && (
            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        
              <TextField
              label="Your Feedback"
              multiline
              rows={4}
              variant="outlined"
              value={feedback}
              onChange={handleChange}
              fullWidth
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
