import React from "react";
import { Fab, Zoom } from "@mui/material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useNavigate } from "react-router-dom";

const FloatingCTA = () => {
  const nav = useNavigate();

  const handleClick = () => {
    nav("/register");
  };

  return (
    <Zoom in>
      <Fab
        color="primary"
        variant="extended"
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1400,
        }}
      >
        <PersonSearchIcon sx={{ mr: 1 }} />
        Find Mentor
      </Fab>
    </Zoom>
  );
};

export default FloatingCTA;


