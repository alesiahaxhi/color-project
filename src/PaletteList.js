import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalete";

const PaletteList = (props) => {
  const { palettes } = props;
  return (
    <div>
      <MiniPalette />
      <h1>React Colors</h1>
      {palettes.map((palette) => (
        <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
      ))}
    </div>
  );
};

export default PaletteList;
