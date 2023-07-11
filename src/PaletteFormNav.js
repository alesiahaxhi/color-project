import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";

const StyledAppBar = styled(MuiAppBar)(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240, // Adjust this value based on your drawer width
    width: `calc(100% - 450px)`, // Adjust this value based on your drawer width
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const PaletteFormNav = ({
  open,
  handleDrawerOpen,
  newPaletteName,
  handleChange,
  handleBlur,
  savePalette,
  paletteNameError,
  isDuplicatePalette,
}) => {
  return (
    <div>
      <CssBaseline />
      <StyledAppBar position="fixed" color="default" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Create Palette
          </Typography>
          <form onSubmit={savePalette}>
            <TextField
              required
              name="newPaletteName"
              value={newPaletteName}
              id="standard-basic"
              label="Palette Name"
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              error={paletteNameError}
              helperText={
                paletteNameError
                  ? "Palette name cannot be empty"
                  : isDuplicatePalette
                  ? "Palette name must be unique"
                  : ""
              }
            />

            <Button variant="text" color="success" type="submit">
              Save Palette
            </Button>
            <Link to="/">
              <Button variant="text">Go Back</Button>
            </Link>
          </form>
        </Toolbar>
      </StyledAppBar>
    </div>
  );
};

PaletteFormNav.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawerOpen: PropTypes.func.isRequired,
  newPaletteName: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  savePalette: PropTypes.func.isRequired,
  paletteNameError: PropTypes.bool.isRequired,
  isDuplicatePalette: PropTypes.bool.isRequired,
};

export default PaletteFormNav;
