import React from "react";
import Alert from "@mui/material/Alert";
const FlashAlert = ({ props, title, isAlert }) => {
  return (
    <div >
      { isAlert && <Alert variant="outlined" severity="success">{title}</Alert> }
    </div>
  );
};

export default FlashAlert;
