import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";

import { Root, Container, Nav, Palettes } from "./styles/PaletteListStyles";

const PaletteList = (props) => {
  const { palettes, deletePalette } = props;
  return (
    <Root>
      <Container>
        <Nav>
          <h1>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </Nav>
        <Palettes>
          {palettes.map((palette) => (
            <MiniPalette
              {...palette}
              handleDelete={deletePalette}
              key={palette.id}
              id={palette.id}
            />
          ))}
        </Palettes>
      </Container>
    </Root>
  );
};

export default PaletteList;
