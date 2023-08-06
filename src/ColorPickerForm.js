import React, { useState, useEffect } from "react";
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
  handleSubmit,
  paletteFull,
  colors, // We need the colors array to validate color name and color duplication
}) => {
  const [error, setError] = useState({
    isDuplicateName: false,
    isDuplicateColor: false,
    isEmpty: false,
  });
  const [touched, setTouched] = useState(false);

  const handleBlur = () => {
    setTouched(true);
    setError((prevError) => ({
      ...prevError,
      isEmpty: colorName.trim() === "",
    }));
  };

  useEffect(() => {
    let validationTimeout;

    if (touched) {
      // Clear any previous validation timeout
      clearTimeout(validationTimeout);

      // Run the validation after a short delay (e.g., 500ms) to avoid immediate validation
      validationTimeout = setTimeout(() => {
        const isInvalid = validateColor(colorName, color);
        setError({
          isDuplicateName:
            isInvalid && colors.some((c) => c.name === colorName),
          isDuplicateColor: isInvalid && colors.some((c) => c.color === color),
        });
      }, 2000); // You can adjust the delay time (in milliseconds) as needed
    }

    // Clean up the timeout when the component unmounts or when colorName, color, or colors changes
    return () => clearTimeout(validationTimeout);
  }, [colorName, color, colors, touched]);

  const validateColor = (name, newColor) => {
    const isDuplicateName = colors.some(
      (color) => color.name.toLowerCase() === name.toLowerCase()
    );
    const isDuplicateColor = colors.some(
      (color) => color.color.toLowerCase() === newColor.toLowerCase()
    );
    const isEmptyName = name.trim() === "";

    return isDuplicateName || isDuplicateColor || isEmptyName;
  };

  return (
    <div>
      <Picker>
        <ChromePicker width="100%" color={color} onChange={handleChange} />
      </Picker>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          sx={{
            width: "100%",
            marginTop: "40px",
          }}
          name="colorName"
          value={colorName}
          id="standard-basic"
          label="Color Name"
          variant="filled"
          disabled={paletteFull}
          onChange={(e) => setColorName(e.target.value)}
          onBlur={handleBlur}
          error={
            error.isEmpty || error.isDuplicateName || error.isDuplicateColor
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
  paletteFull: PropTypes.bool.isRequired,
  colors: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ColorPickerForm;
