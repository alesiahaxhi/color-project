import { useState } from "react";
import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { blue, red } from "@mui/material/colors";

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

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleOpen = (id) => {
    setOpen(true);
    setDeleteId(id);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId("");
  };

  const handleDelete = () => {
    deletePalette(deleteId);
    handleClose();
  };

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
              <CSSTransition key={palette.id} classNames="fade" timeout={300}>
                <MiniPalette
                  {...palette}
                  openDialog={handleOpen}
                  key={palette.id}
                  id={palette.id}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </Palettes>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Delete this palette?</DialogTitle>
        <List>
          <ListItem disableGutters>
            <ListItemButton onClick={handleDelete}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Continue" />
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton onClick={handleClose}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Close" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </Root>
  );
};

export default PaletteList;
