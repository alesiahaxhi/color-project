import { useNavigate } from "react-router-dom";

import {
  Root,
  Colors,
  Title,
  Emoji,
  MiniColor,
} from "./styles/MiniPaletteStyles";

const MiniPalette = (props) => {
  const { colors, id, paletteName, emoji } = props;
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(`/palette/${id}`);
  };

  const miniColorBoxes = colors.map((color) => (
    <MiniColor style={{ backgroundColor: color.color }} key={color.name} />
  ));
  return (
    <Root onClick={handleClick}>
      <Colors>{miniColorBoxes}</Colors>
      <Title>
        {paletteName} <Emoji>{emoji}</Emoji>
      </Title>
    </Root>
  );
};
export default MiniPalette;
