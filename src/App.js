import { useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";

import Palette from "./Palette";
import seedColors from "./seedColors";
import PaletteList from "./PaletteList";
import { generatePalette } from "./colorHelpers";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";

function App() {
  const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));

  const [palettes, setPalettes] = useState(savedPalettes || seedColors);

  const findPalette = (id) => {
    const palette = palettes.find((palette) => palette.id === id);
    console.log("paletteId:", id);
    console.log("palette:", palette);
    return palette;
  };

  const savePalette = (newPalette) => {
    setPalettes([...palettes, newPalette]);
    // Save the updated palettes to local storage immediately
    window.localStorage.setItem(
      "palettes",
      JSON.stringify([...palettes, newPalette])
    );
  };

  const deletePalette = (id) => {
    const updatedPalettes = palettes.filter((palette) => palette.id !== id);
    setPalettes(updatedPalettes);
    window.localStorage.setItem("palettes", JSON.stringify(updatedPalettes));
  };

  const PaletteWrapper = () => {
    const { id } = useParams();
    console.log("id:", id);

    const palette = generatePalette(findPalette(id));

    return <Palette palette={palette} />;
  };

  const SingleColorWrapper = () => {
    const { paletteId, colorId } = useParams();
    console.log("paletteId:", paletteId);
    console.log("colorId:", colorId);

    const palette = generatePalette(findPalette(paletteId));
    let color = null;

    for (let key in palette.colors) {
      color = palette.colors[key].find((c) => c.id === colorId);
      if (color) {
        break;
      }
    }

    return (
      <SingleColorPalette
        palette={palette}
        color={color}
        colorId={colorId}
        paletteName={palette.paletteName}
        emoji={palette.emoji}
        id={paletteId}
      />
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PaletteList palettes={palettes} deletePalette={deletePalette} />
          }
        />
        <Route exact path="/palette/:id" element={<PaletteWrapper />} />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          element={<SingleColorWrapper />}
        />
        <Route
          exact
          path="/palette/new"
          element={
            <NewPaletteForm palettes={palettes} savePalette={savePalette} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
