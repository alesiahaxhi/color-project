import { Routes, Route, useParams } from "react-router-dom";

import Palette from "./Palette";
import seedColors from "./seedColors";
import PaletteList from "./PaletteList";
import { generatePalette } from "./colorHelpers";
import SingleColorPalette from "./SingleColorPalette";
import NewPaletteForm from "./NewPaletteForm";

function App() {
  const findPalette = (id) => {
    const palette = seedColors.find((palette) => palette.id === id);
    console.log("paletteId:", id);
    console.log("palette:", palette);
    return palette;
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
        <Route exact path="/" element={<PaletteList palettes={seedColors} />} />
        <Route exact path="/palette/:id" element={<PaletteWrapper />} />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          element={<SingleColorWrapper />}
        />
        <Route exact path="/palette/new" element={<NewPaletteForm />} />
      </Routes>
    </div>
  );
}

export default App;
