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
import PaletteMetaForm from "./PaletteMetaForm";

const Root = styled("div")(
  ({ theme }) => `
    display: flex;
  `
);

const StyledAppBar = styled(MuiAppBar)(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  flexDirection: "row",
  justifyContent: "space-between",
  height: "64px",
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
    <Root>
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
        </Toolbar>
        <PaletteMetaForm
          newPaletteName={newPaletteName}
          handleChange={handleChange}
          handleBlur={handleBlur}
          savePalette={savePalette}
          paletteNameError={paletteNameError}
          isDuplicatePalette={isDuplicatePalette}
        />
        <Link to="/">
          <Button variant="text">Go Back</Button>
        </Link>
      </StyledAppBar>
    </Root>
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
