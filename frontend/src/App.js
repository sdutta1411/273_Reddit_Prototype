import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Switch,Route } from "react-router-dom";
import "./App.css";
<<<<<<< HEAD
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/navBar/navBar";
import Home from "./components/LandingPage/home";
import CommunityHomePage from "./components/CommunityHomePage/CommunityHomePage"
// import Home from "./components/LandingPage/home";
// import SearchBar from "./components/CommunitySearch/searchbar.js";
=======
import loginForm from "./components/loginForm/loginForm";
import signupForm from "./components/signupForm/signupForm";
import Navbar from "./components/navBar/navBar";
import Home from "./components/LandingPage/home";
/* import SearchBar from "./components/CommunitySearch/searchbar.js"; */
import CommunityHomePage from "./components/CommunityHomePage/CommunityHomePage";
import CreatePost from "./components/CommunityHomePage/CreatePost";
import Post from "./components/CommunityHomePage/Post";
import ImageAndVideo from "./components/CommunityHomePage/ImageAndVideo";
import LinkPostType from "./components/CommunityHomePage/LinkPostType";
import DashboardPage from "./components/DasboardPage/DashboardPage";

>>>>>>> d07c2997e48552b4a23318fd0238ada703506086

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
    <Provider store={store}>
    <div>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Switch>
<<<<<<< HEAD
        <Route path="/communityhome" exact component={CommunityHomePage} />
        <Route path="/" exact component={Home} />
           {/*
            <Route path="/login" exact component={LoginForm} />
          <Route path="/signup" exact component={SignUp} /> 
=======

          <Route path="/login" exact component={loginForm} />
          <Route path="/signup" exact component={signupForm} />

>>>>>>> d07c2997e48552b4a23318fd0238ada703506086
          <Route path="/communityhome" exact component={CommunityHomePage} />
          <Route path="/createpost" exact component={CreatePost} />
          <Route path="/createpost/post" exact component={Post} />
          <Route path="/createpost/imageandvideo" exact component={ImageAndVideo}/>
          <Route path="/createpost/link" exact component={LinkPostType} />
<<<<<<< HEAD
         */}
=======
          <Route path="/dashboard" exact component={DashboardPage} />

          {/* <Route path="/" exact component={Home} /> */}
>>>>>>> d07c2997e48552b4a23318fd0238ada703506086
        </Switch>
      </ThemeProvider>
    </div>
    </Provider>
  );
};

export default App;
