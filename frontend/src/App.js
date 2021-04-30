import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navBar/navBar";
import loginForm from "./components/loginForm/loginForm";
import SignUp from "./components/signupForm/signupForm";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ff4500",
      main: "#f47b4e",
      dark: "#ff4500",
      contrastText: "#fff",
    },
    seconnpdary: {
      light: "#fafafa",
      main: "#f5f5f5",
      dark: "#e0e0e0",
      contrastText: "#9e9e9e",
    },
  },
});

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Switch>
          <Route path="/login" exact component={loginForm} />
          <Route path="/signup" exact component={SignUp} />
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
