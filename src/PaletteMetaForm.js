import { useState } from "react";
import Picker from "@emoji-mart/react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogContentText from "@mui/material/DialogContentText";

import data from "@emoji-mart/data";

export default function PaletteMetaForm({
  newPaletteName,
  handleChange,
  handleBlur,
  savePalette,
  paletteNameError,
  isDuplicatePalette,
}) {
  const [open, setOpen] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePickerToggle = () => {
    setOpenPicker(!openPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji.native);
    handlePickerToggle();
  };

  const isNewPaletteNameValid =
    newPaletteName.trim() !== "" && !isDuplicatePalette;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNewPaletteNameValid && selectedEmoji) {
      savePalette(newPaletteName, selectedEmoji);
      setOpen(false);
      setSelectedEmoji(null);
      handleChange({ target: { name: "newPaletteName", value: "" } });
    }
  };

  return (
    <div>
      <Button
        variant="text"
        onClick={handleClickOpen}
        sx={{ flexDirection: "flex-end" }}
      >
        Name Palette
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Choose a Palette Name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Give your palette a unique name and select an emoji to save it.
          </DialogContentText>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              name="newPaletteName"
              value={newPaletteName}
              id="standard-basic"
              label="Palette Name"
              fullWidth
              variant="standard"
              onChange={handleChange}
              onBlur={handleBlur}
              error={paletteNameError}
              helperText={
                paletteNameError
                  ? "Palette name cannot be empty"
                  : isDuplicatePalette
                  ? "Palette name must be unique"
                  : ""
              }
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handlePickerToggle}>
                {selectedEmoji ? "Change Emoji" : "Select Emoji"}
              </Button>
              {selectedEmoji && (
                <span style={{ marginRight: "8px" }}>{selectedEmoji}</span>
              )}
              <Button
                type="submit"
                color="success"
                disabled={!selectedEmoji || newPaletteName.trim() === ""}
              >
                Save Palette
              </Button>
            </DialogActions>
          </form>
          {openPicker && (
            <Picker
              data={data}
              theme="light"
              onEmojiSelect={handleEmojiSelect}
              title="Select Emoji"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
