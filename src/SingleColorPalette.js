import ColorBox from "./ColorBox";

const SingleColorPalette = (props) => {
  const { palette, colorId, color } = props;
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

  const colorBoxes = shades.map((color) => (
    <ColorBox key={color.id} name={color.name} background={color.hex} />
  ));

  return (
    <div className="Palette">
      <h1>
        Palette Name: {palette.paletteName} | Color Name: {color.name}
      </h1>
      <div className="Palette-colors">{colorBoxes}</div>
    </div>
  );
};

export default SingleColorPalette;
