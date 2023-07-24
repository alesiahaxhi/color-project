import DragColorBox from "./DragColorBox";
import { ReactSortable } from "react-sortablejs";

export default function DragColorList(props) {
  const { colors, setColors, removeColor } = props;

  return (
    <ReactSortable
      tag="div"
      list={colors} // Ensure that colors is an array
      setList={setColors}
      style={{ height: "100%", lineHeight: 0 }}
    >
      {colors &&
        colors.map((color, i) => (
          <DragColorBox
            index={i}
            key={color.name}
            color={color.color}
            name={color.name}
            handleClick={() => removeColor(color.name)}
          />
        ))}
    </ReactSortable>
  );
}
