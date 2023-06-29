import { useState } from "react";
import { Navbar } from "./Navbar";
import ColorBox from "./ColorBox";

import "./styles/Palette.css";

const Palette = (props) => {
  const [level, setLevel] = useState(500);
  const [format, setFormat] = useState("hex");

  const changeFormat = (format) => {
    setFormat(format);
  };

  const changeLevel = (newLevel) => {
    setLevel(newLevel);
  };

  const { colors, paletteName, emoji, id } = props.palette;

  const colorBoxes = colors[level].map((color) => (
    <ColorBox
      key={color.name}
      background={color[format]}
      name={color.name}
      id={color.id}
      paletteId={id}
    />
  ));

  return (
    <div className="Palette">
      <Navbar
        level={level}
        changeLevel={changeLevel}
        changeFormat={changeFormat}
        format={format}
        showingAllColors
      />
      <div className="Palette-colors">{colorBoxes}</div>
      <div className="Palette-footer">
        {paletteName}
        <span className="emoji">{emoji}</span>
      </div>
    </div>
  );
};
export default Palette;
