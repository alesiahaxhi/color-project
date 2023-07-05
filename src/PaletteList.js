import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import MiniPalette from "./MiniPalette";

const Root = styled("div")(
  ({ theme }) => `
    background-color: #09215a;
    min-height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    overflow-y: scroll;
  `
);

const Container = styled("div")(
  ({ theme }) => `
    width: 50%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    flex-wrap: wrap;
  `
);

const Nav = styled("nav")(
  ({ theme }) => `
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: white;
    align-items: center;
    & a {
      color: white;
      text-decoration: none;
    }
  `
);

const Palettes = styled("div")(
  ({ theme }) => `
    box-sizing: border-box;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 30%);
    grid-gap: 5%;
  `
);

const PaletteList = (props) => {
  const { palettes } = props;
  return (
    <Root>
      <Container>
        <Nav>
          <h1>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </Nav>
        <Palettes>
          {palettes.map((palette) => (
            <MiniPalette {...palette} />
          ))}
        </Palettes>
      </Container>
    </Root>
  );
};

export default PaletteList;
