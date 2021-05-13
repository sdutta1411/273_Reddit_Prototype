import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import "./App.css";

<<<<<<< HEAD
import LoginForm from "./components/loginForm/loginForm";
import signupForm from "./components/signupForm/signupForm";
=======
//import LoginForm from "./components/LoginForm/LoginForm";
//import signupForm from "./components/SignupForm/signupForm";
>>>>>>> c1f6dbffbc867ed93de08e1283e44dd2e595e282
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/navBar/navBar";
import Home from "./components/LandingPage/home";
import UserProfile from "./components/UserProfile/UserProfile";
// import Home from "./components/LandingPage/home";
// import SearchBar from "./components/CommunitySearch/searchbar.js";
/* import SearchBar from "./components/CommunitySearch/searchbar.js"; */
import CommunityHomePage from "./components/CommunityHomePage/CommunityHomePage";
import CreatePost from "./components/CommunityHomePage/CreatePost";
import Post from "./components/CommunityHomePage/Post";
import ImageAndVideo from "./components/CommunityHomePage/ImageAndVideo";
import LinkPostType from "./components/CommunityHomePage/LinkPostType";
import DashboardPage from "./components/DasboardPage/DashboardPage";
<<<<<<< HEAD
import NavBarAfterLogin from "./components/navBar/NavBarAfterLogin";
=======
import CommununityAnalytics from "./components/CommunityAnalytics/CommunityAnalytics"
import CommunityInvitePage from "./components/CommunityInvitePage/CommunityInvitePage"
>>>>>>> 8aebcbd5aa2706930042e44d3ae0b9cfe11f0b10
/* import ModerationPage from "./components/CommunityModeration/ModerationPage" */
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
            <Route path="/communityhome" exact component={CommunityHomePage} />
            <Route path="/" exact component={Home} />
<<<<<<< HEAD

            <Route path="/login" exact component={LoginForm} />
            <Route path="/signup" exact component={signupForm} />
            <Route path="/communityhome" exact component={CommunityHomePage} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/createpost/post" exact component={Post} />
            <Route
              path="/createpost/imageandvideo"
              exact
              component={ImageAndVideo}
            />
            <Route path="/createpost/link" exact component={LinkPostType} />
            <Route path="/mycommunities/analytics" exact component={CommununityAnalytics} />
            <Route path="/invites" exact component={CommunityInvitePage} />
            {/*  <Route path="/ModerationPage" exact component={ModerationPage} /> */}

            <Route path="/dashboard" exact component={DashboardPage} />

            <Route path="/" exact component={Home} />

=======
            {/*
            <Route path="/login" exact component={LoginForm} />
          <Route path="/signup" exact component={SignUp} /> 
          <Route path="/communityhome" exact component={CommunityHomePage} />
          <Route path="/createpost" exact component={CreatePost} />
          <Route path="/createpost/post" exact component={Post} />
          <Route path="/createpost/imageandvideo" exact component={ImageAndVideo}/>
          <Route path="/createpost/link" exact component={LinkPostType} />

         */}
            {/*  <Route path="/ModerationPage" exact component={ModerationPage} /> */}

            <Route path="/dashboard" exact component={DashboardPage} />

            <Route path="/" exact component={Home} />
            <Route path="/profile" exact component={UserProfile} />
            <Route path="/navbar" exact component={NavBarAfterLogin} />

>>>>>>> c1f6dbffbc867ed93de08e1283e44dd2e595e282
            {/* <Route path="/" exact component={Home} /> */}
          </Switch>
        </ThemeProvider>
      </div>
    </Provider>
  );
};

export default App;
