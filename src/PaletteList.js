import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";

import { Root, Container, Nav, Palettes } from "./styles/PaletteListStyles";

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
