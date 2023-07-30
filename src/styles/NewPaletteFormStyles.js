import { styled } from "@mui/material/styles";
const drawerWidth = 501;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    height: "calc(100vh - 64px)",
    flexGrow: 1,
    padding: 0,
    backgroundColor: "white", // Set the background color directly here
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
      marginBottom: 0,
    }),
  })
);

const DrawerContainer = styled("div")(
  ({ theme }) => `
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `
);

const Buttons = styled("div")(
  ({ theme }) => `
    display: flex;
    width: 100%;
  `
);

const DrawerHeader = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export { drawerWidth, Main, DrawerContainer, Buttons, DrawerHeader };
