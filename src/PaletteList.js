import { styled } from "@mui/system";
import MiniPalette from "./MiniPalete";

const Root = styled("div")(
  ({ theme }) => `
    background-color: blue;
    height: 100vh;
    display: flex;
    align-items: flex-start;
    justify-content: center;
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
