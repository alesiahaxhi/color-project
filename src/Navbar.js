import { useState } from "react";
import { Link } from "react-router-dom";

import Slider from "rc-slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import "rc-slider/assets/index.css";
import "./Navbar.css";

export const Navbar = (props) => {
  const [open, setOpen] = useState(false);
  const { level, changeLevel, format, changeFormat, showingAllColors } = props;

  const handleChangeFormat = (e) => {
    changeFormat(e.target.value);
    setOpen(!open);
  };

  return (
    <header className="Navbar">
      <div className="logo">
        <Link to="/">reactcolorpicker</Link>
      </div>
      {showingAllColors && (
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className="slider">
            <Slider
              defaultValue={level}
              min={100}
              max={900}
              step={100}
              onChange={changeLevel}
            />
          </div>
        </div>
      )}
      <div className="select-container">
        <FormControl variant="standard">
          <InputLabel id="format-label">Color Format</InputLabel>
          <Select
            labelId="format-label"
            id="format"
            value={format}
            onChange={handleChangeFormat}
          >
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255, 1.0)</MenuItem>
          </Select>
        </FormControl>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={open}
        autoHideDuration={3000}
        message={
          <span id="message-id">Format changed to {format.toUpperCase()}</span>
        }
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        onClose={() => setOpen(false)}
        action={[
          <IconButton
            onClick={() => setOpen(false)}
            color="inherit"
            key="close"
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </header>
  );
};
