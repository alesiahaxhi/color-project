import { useState } from "react";
import { Navbar } from "./Navbar";
import ColorBox from "./ColorBox";

function SingleColorPalette(props) {
  const [format, setFormat] = useState("hex");

  const { palette, colorId, paletteName, emoji } = props;

  const shades = gatherShades(palette, colorId);
  console.log("palette:", palette);
  console.log("colorId:", colorId);
  console.log("shades:", shades);

  function gatherShades(palette, colorToFilterBy) {
    const shades = Object.values(palette.colors).flatMap((color) =>
      color.filter((shade) => shade.id === colorToFilterBy)
    );

    return shades.slice(1);
  }

  const changeFormat = (format) => {
    setFormat(format);
  };

  const colorBoxes = shades.map((color) => (
    <ColorBox key={color.id} name={color.name} background={color[format]} />
  ));

  return (
    <div className="Palette">
      <Navbar
        changeFormat={changeFormat}
        format={format}
        showingAllColors={false}
      />
      <div className="Palette-colors">{colorBoxes}</div>
      <div className="Palette-footer">
        {paletteName}
        <span className="emoji">{emoji}</span>
      </div>
    </div>
  );
}

export default SingleColorPalette;
