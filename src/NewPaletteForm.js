import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import seedColors from "./seedColors";
import DragColorList from "./DragColorList";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";

import {
  Main,
  Buttons,
  DrawerHeader,
  drawerWidth,
  DrawerContainer,
} from "./styles/NewPaletteFormStyles";

const NewPaletteForm = (props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [color, setColor] = useState("#000");
  const [colors, setColors] = useState(seedColors[0].colors);
  const [colorName, setColorName] = useState("");
  const [newPaletteName, setNewPaletteName] = useState("");
  const [paletteNameError, setPaletteNameError] = useState(false);

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
    setPaletteNameError(newPaletteName.trim() === "");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const isInvalidColor = validateColor(colorName, color);
    if (isInvalidColor) {
      return;
    }
    createColor();
  };

  const isDuplicatePalette = props.palettes.some(
    (palette) =>
      palette.paletteName.toLowerCase() === newPaletteName.toLowerCase()
  );

  const savePalette = (newPaletteName, emoji) => {
    if (newPaletteName.trim() === "") {
      setPaletteNameError(true);
      return;
    }

    if (isDuplicatePalette) {
      setPaletteNameError(true);
      return;
    }

    setPaletteNameError(false);

    // Save the palette
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors: colors,
      emoji: emoji, // Include the emoji in the saved palette
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
            colors={colors}
            colorName={colorName}
            setColorName={setColorName}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
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
