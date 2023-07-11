import React from "react";
import PropTypes from "prop-types";

import { ChromePicker } from "react-color";

import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Picker = styled("div")(
  ({ theme }) => `
      margin-top: 2rem;
      display: block;
    `
);

const ColorPickerForm = ({
  color,
  colorName,
  setColorName,
  handleChange,
  handleBlur,
  handleSubmit,
  error,
  touched,
  paletteFull,
}) => {
  return (
    <div>
      <Picker>
        {" "}
        <ChromePicker width="100%" color={color} onChange={handleChange} />
      </Picker>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          sx={{
            width: "100%",
            marginTop: "40px",
            // marginBottom: "10px",
          }}
          name="colorName"
          value={colorName}
          id="standard-basic"
          label="Color Name"
          variant="filled"
          onChange={(e) => setColorName(e.target.value)}
          onBlur={handleBlur}
          error={
            error &&
            (error.isEmpty || error.isDuplicateName || error.isDuplicateColor)
          }
          helperText={
            error.isEmpty && touched && colorName.trim() === ""
              ? "Color name cannot be empty"
              : error.isDuplicateName
              ? "Oops! That name's taken!"
              : error.isDuplicateColor
              ? "Color already in use!"
              : ""
          }
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            width: "100%",
            padding: "1rem",
            marginTop: "1rem",
            fontSize: "2rem",
            border: "none",
            backgroundColor: paletteFull ? "#e4e8e9" : color,
          }}
          disabled={paletteFull}
        >
          {paletteFull ? "PALETTE FULL" : "ADD COLOR"}
        </Button>
      </form>
    </div>
  );
};

ColorPickerForm.propTypes = {
  color: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  colorName: PropTypes.string.isRequired,
  setColorName: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  error: PropTypes.object.isRequired,
  touched: PropTypes.bool.isRequired,
  paletteFull: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ColorPickerForm;
