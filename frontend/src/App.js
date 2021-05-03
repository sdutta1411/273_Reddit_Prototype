import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./components/NavBar/navBar";
import LoginForm from "./components/LoginForm/loginForm";
import SignUp from "./components/SignupForm/signupForm";
import Home from "./components/LandingPage/home";

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
          <Route path="/login" exact component={LoginForm} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/" exact component={Home} />
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
