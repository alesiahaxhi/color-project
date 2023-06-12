import { styled } from "@mui/system";

const Styles = styled("div")(
  ({ theme }) => `
    background-color: red;
  `
);
console.log(Styles);
const MiniPalette = (props) => {
  return (
    <div>
      <Styles>
        <h1>MiniPalette</h1>
      </Styles>
    </div>
  );
};
export default MiniPalette;
