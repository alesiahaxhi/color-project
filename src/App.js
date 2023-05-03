import { Routes, Route } from "react-router-dom";

import { generatePalette } from "./colorHelpers";
import Palette from "./Palette";
import seedColors from "./seedColors";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<h1>palette list</h1>} />
        <Route
          exact
          path="/palette/:id"
          element={<Palette palette={generatePalette(seedColors[3])} />}
        />
      </Routes>

      {/* <Palette palette={generatePalette(seedColors[3])} /> */}
    </div>
  );
}

export default App;
