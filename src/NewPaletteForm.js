import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";
import { ChromePicker } from "react-color";

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

import DragColorList from "./DragColorList";

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

const NewPaletteForm = (props) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = useState("#000000");
  const [colors, setColors] = useState(props.palettes[0].colors);
  const [colorName, setColorName] = useState("");
  const [newPaletteName, setNewPaletteName] = useState("");
  const [paletteNameError, setPaletteNameError] = useState(false);
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);

  const navigate = useNavigate();

  const maxColors = 20;
  const paletteFull = colors.length >= maxColors;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const clearColors = () => {
    setColors([]);
  };

  const addRandColor = () => {
    const allColors = props.palettes.map((p) => p.colors).flat();
    let rand = Math.floor(Math.random() * allColors.length);
    const randColor = allColors[rand];
    setColors([...colors, randColor]);
  };

  const handleChange = (e) => {
    if (e.hex) {
      setColor(e.hex);
    } else {
      setNewPaletteName(e.target.value);
      setPaletteNameError(false); // Reset the palette name error
    }
  };

  const handleBlur = () => {
    setTouched(true);

    if (newPaletteName.trim() === "") {
      setPaletteNameError(true);
    } else {
      setPaletteNameError(false);
    }
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
    const isEmptyName = name.trim() === "";

    return isDuplicateName || isDuplicateColor || isEmptyName;
  };

  const removeColor = (colorName) => {
    setColors((prevColors) =>
      prevColors.filter((color) => color.name !== colorName)
    );
  };

  useEffect(() => {
    const isInvalid = validateColor(colorName, color);
    setError({
      isDuplicateName: isInvalid && colors.some((c) => c.name === colorName),
      isDuplicateColor: isInvalid && colors.some((c) => c.color === color),
      isEmpty: touched && colorName.trim() === "",
      paletteNameError,
    });
  }, [colorName, color, colors, touched, paletteNameError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Entering handleSubmit");
    // Validate color
    const isInvalidColor = validateColor(colorName, color);
    if (isInvalidColor) {
      console.log("Invalid color:", colorName, color);
      setError((prevError) => ({
        ...prevError,
        isDuplicateColor: true,
        isEmpty: false,
      }));
      return;
    }

    // Reset color-related errors if color is valid
    setError((prevError) => ({
      ...prevError,
      isDuplicateColor: false,
      isEmpty: false,
    }));

    // Add the color
    createColor();
  };

  const isDuplicatePalette = props.palettes.some(
    (palette) =>
      palette.paletteName.toLowerCase() === newPaletteName.toLowerCase()
  );

  const savePalette = (e) => {
    e.preventDefault();
    console.log("Entering savePalette");
    if (newPaletteName.trim() === "") {
      console.log("Empty palette name:", newPaletteName);
      setPaletteNameError(true);
      return;
    }

    if (isDuplicatePalette) {
      console.log("Duplicate palette name:", newPaletteName);
      setPaletteNameError(true);
      return;
    }

    setPaletteNameError(false);

    // Save the palette
    let newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: colors,
    };
    props.savePalette(newPalette);
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" color="default" open={open}>
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
              error={paletteNameError} // Replace 'isDuplicate' with 'paletteNameError'
              helperText={
                paletteNameError
                  ? paletteNameError && "Palette name cannot be empty"
                  : isDuplicatePalette
                  ? "Palette name must be unique"
                  : ""
              }
            />

            <Button variant="contained" type="submit">
              Save Palette
            </Button>
          </form>
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
          <Button variant="contained" color="error" onClick={clearColors}>
            Clear Palette
          </Button>
          <Button
            variant="contained"
            onClick={addRandColor}
            disabled={paletteFull}
          >
            {paletteFull ? "PALETTE FULL" : "RANDOM COLOR"}
          </Button>
        </div>
        <ChromePicker color={color} onChange={handleChange} />
        <form onSubmit={handleSubmit}>
          <TextField
            required
            name="colorName"
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
            style={{
              backgroundColor: paletteFull ? "#e4e8e9" : color,
            }}
            disabled={paletteFull}
          >
            {paletteFull ? "PALETTE FULL" : "ADD COLOR"}
          </Button>
        </form>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {colors && Array.isArray(colors) && (
          <DragColorList
            colors={colors}
            setColors={setColors}
            removeColor={removeColor}
          />
        )}
      </Main>
    </Box>
  );
};

export default NewPaletteForm;
