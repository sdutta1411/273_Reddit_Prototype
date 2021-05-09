import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Switch, Route, Link } from "react-router-dom";
import "./App.css";
import loginForm from "./components/LoginForm/loginForm";
import signupForm from "./components/SignupForm/signupForm";
import Navbar from "./components/NavBar/navBar";
import Home from "./components/LandingPage/home";
import SearchBar from "./components/CommunitySearch/searchbar.js";
import CommunityHomePage from "./components/CommunityHomePage/CommunityHomePage";
import CreatePost from "./components/CommunityHomePage/CreatePost";
import Post from "./components/CommunityHomePage/Post";
import ImageAndVideo from "./components/CommunityHomePage/ImageAndVideo";
import LinkPostType from "./components/CommunityHomePage/LinkPostType";
import DashboardPage from "./components/DasboardPage/DashboardPage";


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
          <Route path="/signup" exact component={signupForm} />

          <Route path="/communityhome" exact component={CommunityHomePage} />
          <Route path="/createpost" exact component={CreatePost} />
          <Route path="/createpost/post" exact component={Post} />
          <Route path="/createpost/imageandvideo" exact component={ImageAndVideo}/>
          <Route path="/createpost/link" exact component={LinkPostType} />
          <Route path="/dashboard" exact component={DashboardPage} />

          <Route path="/" exact component={Home} />
        </Switch>
      </ThemeProvider>
    </div>
  );
};

export default App;
