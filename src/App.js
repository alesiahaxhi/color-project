import { Routes, Route, useParams } from "react-router-dom";

import { generatePalette } from "./colorHelpers";
import Palette from "./Palette";
import seedColors from "./seedColors";

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
        <Route exact path="/" element={<h1>Welcome Home</h1>} />
        <Route exact path="/palette/:id" element={<PaletteWrapper />} />
      </Routes>
    </div>
  );
}

export default App;
