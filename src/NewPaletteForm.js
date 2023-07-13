import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { styled, useTheme } from "@mui/material/styles";

import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import DragColorList from "./DragColorList";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";

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

const DrawerContainer = styled("div")(
  ({ theme }) => `
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `
);

const Buttons = styled("div")(
  ({ theme }) => `
    display: flex;
    width: 100%;
  `
);

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
      <PaletteFormNav
        open={open}
        handleOpen={handleOpen}
        newPaletteName={newPaletteName}
        handleChange={handleChange}
        handleBlur={handleBlur}
        savePalette={savePalette}
        paletteNameError={paletteNameError}
        isDuplicatePalette={isDuplicatePalette}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            display: "flex",
            alignItems: "center",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <DrawerContainer>
          <Typography variant="h4" gutterBottom>
            Design Your Palette
          </Typography>
          <Buttons>
            <Button
              sx={{ width: "50%" }}
              variant="text"
              color="error"
              onClick={clearColors}
            >
              Clear Palette
            </Button>
            <Button
              sx={{ width: "50%" }}
              variant="text"
              onClick={addRandColor}
              disabled={paletteFull}
            >
              {paletteFull ? "PALETTE FULL" : "RANDOM COLOR"}
            </Button>
          </Buttons>
          <ColorPickerForm
            color={color}
            colorName={colorName}
            setColorName={setColorName}
            handleChange={handleChange}
            handleBlur={handleBlur}
            handleSubmit={handleSubmit}
            error={error}
            touched={touched}
            paletteFull={paletteFull}
          />
        </DrawerContainer>
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
