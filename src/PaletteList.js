import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  Root,
  Container,
  Nav,
  Palettes,
  animationStyles,
} from "./styles/PaletteListStyles";

const PaletteList = (props) => {
  const { palettes, deletePalette } = props;
  return (
    <Root>
      <style>{animationStyles}</style>
      <Container>
        <Nav>
          <h1>React Colors</h1>
          <Link to="/palette/new">Create Palette</Link>
        </Nav>
        <Palettes>
          <TransitionGroup component={null}>
            {palettes.map((palette) => (
              <CSSTransition key={palette.id} classNames="fade" timeout={500}>
                <MiniPalette
                  {...palette}
                  handleDelete={deletePalette}
                  key={palette.id}
                  id={palette.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Palettes>
      </Container>
    </Root>
  );
};

export default PaletteList;
