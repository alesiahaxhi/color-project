import DeleteIcon from "@mui/icons-material/Delete";
import chroma from "chroma-js";
import { Root, BoxContent } from "./styles/DragColorBoxStyles";

export default function DragColorBox(props) {
  const { color, name, handleClick } = props;

  const textColor =
    chroma(color).luminance() <= 0.1
      ? "rgba(255, 255, 255, 0.7)"
      : "rgba(0,0,0, 0.5)";

  return (
    <Root style={{ backgroundColor: color }}>
      <BoxContent style={{ color: textColor }}>
        <span>{name}</span>
        <DeleteIcon onClick={handleClick} />
      </BoxContent>
    </Root>
  );
}
