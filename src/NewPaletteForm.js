import React, { useState, useEffect } from "react";

import { styled, useTheme } from "@mui/material/styles";

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TextField from "@mui/material/TextField";

import { ChromePicker } from "react-color";
import DragColorBox from "./DragColorBox";

const drawerWidth = 450;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    height: "calc(100vh - 64px)",
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const NewPaletteForm = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = useState("#000000");
  const [colors, setColors] = useState([]);
  const [colorName, setColorName] = useState("");
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const createColor = () => {
    const newColor = {
      color: color,
      name: colorName,
    };
    setColors([...colors, newColor]);
    setColorName("");
  };

  const validateColor = (name, newColor) => {
    const isDuplicateName = colors.some(
      (color) => color.name.toLowerCase() === name.toLowerCase()
    );
    const isDuplicateColor = colors.some(
      (color) => color.color.toLowerCase() === newColor.toLowerCase()
    );

    return isDuplicateName || isDuplicateColor;
  };

  useEffect(() => {
    const isInvalid = validateColor(colorName, color);
    setError({
      isDuplicateName: isInvalid && colors.some((c) => c.name === colorName),
      isDuplicateColor: isInvalid && colors.some((c) => c.color === color),
      isEmpty: touched && colorName.trim() === "",
    });
  }, [colorName, color, colors, touched]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (colorName === "") {
      setError({
        isDuplicateName: false,
        isDuplicateColor: false,
        isEmpty: true,
      });
      return;
    }
    const isInvalid = validateColor(colorName, color);
    if (isInvalid) {
      setError({
        isDuplicateName: false,
        isDuplicateColor: true,
        isEmpty: false,
      });
      return;
    }
    createColor();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant="h4">Design Your Palette</Typography>
        <div>
          <Button variant="contained" color="error">
            Clear Palette
          </Button>
          <Button variant="contained">Random Color</Button>
        </div>
        <ChromePicker color={color} onChange={handleChange} />
        <form onSubmit={handleSubmit}>
          <TextField
            required
            value={colorName}
            id="standard-basic"
            label="Color Name"
            variant="standard"
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
            style={{ backgroundColor: color }}
          >
            ADD COLOR
          </Button>
        </form>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />

        {colors.map((color, index) => (
          <DragColorBox key={index} color={color.color} name={color.name} />
        ))}
      </Main>
    </Box>
  );
};

export default NewPaletteForm;
