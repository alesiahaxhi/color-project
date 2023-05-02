import { generatePalette } from "./colorHelpers";
import Palette from "./Palette";
import seedColors from "./seedColors";

function App() {
  return (
    <div className="App">
      <Palette palette={generatePalette(seedColors[3])} />
    </div>
  );
}

export default App;