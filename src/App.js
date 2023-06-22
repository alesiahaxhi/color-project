import { Routes, Route, useParams } from "react-router-dom";

import Palette from "./Palette";
import seedColors from "./seedColors";
import PaletteList from "./PaletteList";
import { generatePalette } from "./colorHelpers";
import SingleColorPalette from "./SingleColorPalette";

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

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<PaletteList palettes={seedColors} />} />
        <Route exact path="/palette/:id" element={<PaletteWrapper />} />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          element={<SingleColorPalette />}
        />
      </Routes>
    </div>
  );
}

export default App;
