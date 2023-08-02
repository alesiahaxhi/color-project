import { useState } from "react";
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Page from "./Page";
import Palette from "./Palette";
import PaletteList from "./PaletteList";
import NewPaletteForm from "./NewPaletteForm";
import SingleColorPalette from "./SingleColorPalette";

import seedColors from "./seedColors";
import { generatePalette } from "./colorHelpers";

import "./styles/App.css";

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

  const location = useLocation();

  return (
    <div className="App">
      <TransitionGroup component={null} className="App" location={location}>
        <CSSTransition key={location.key} classNames="page" timeout={300}>
          <Routes location={location}>
            <Route
              exact
              path="/"
              element={
                <Page>
                  <PaletteList
                    palettes={palettes}
                    deletePalette={deletePalette}
                  />
                </Page>
              }
            />
            <Route
              exact
              path="/palette/:id"
              element={
                <Page>
                  <PaletteWrapper />
                </Page>
              }
            />
            <Route
              exact
              path="/palette/:paletteId/:colorId"
              element={
                <Page>
                  <SingleColorWrapper />
                </Page>
              }
            />
            <Route
              exact
              path="/palette/new"
              element={
                <Page>
                  <NewPaletteForm
                    palettes={palettes}
                    savePalette={savePalette}
                  />
                </Page>
              }
            />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
