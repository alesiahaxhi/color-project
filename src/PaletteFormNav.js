import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Root, StyledAppBar } from "./styles/PaletteFormNavStyles";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import PaletteMetaForm from "./PaletteMetaForm";

const PaletteFormNav = ({
  open,
  handleOpen,
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
            onClick={handleOpen}
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
