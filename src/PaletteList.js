import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalete";

const PaletteList = (props) => {
  const { palettes } = props;
  return (
    <div>
      <MiniPalette />
      <h1>React Colors</h1>
      {palettes.map((palette) => (
        <MiniPalette {...palette} />
      ))}
    </div>
  );
};

export default PaletteList;
