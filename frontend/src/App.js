import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import LoginForm from "./components/loginForm/loginForm";
import signupForm from "./components/signupForm/signupForm";
import { Provider } from "react-redux";
import store from "./store";
import Navbar from "./components/navBar/navBar";
import Home from "./components/LandingPage/home";
import UserProfile from "./components/UserProfile/UserProfile";
// import Home from "./components/LandingPage/home";
import SearchBar from "./components/CommunitySearch/searchbar.js";
import SearchList from "./components/CommunitySearch/SearchList";
import Sort from "./components/CommunitySearch/Sort";
import CommunityHomePage from "./components/CommunityHomePage/CommunityHomePage";
import CreatePost from "./components/CommunityHomePage/CreatePost";
import Post from "./components/CommunityHomePage/Post";
import ImageAndVideo from "./components/CommunityHomePage/ImageAndVideo";
import LinkPostType from "./components/CommunityHomePage/LinkPostType";
import DashboardPage from "./components/DasboardPage/DashboardPage";
import PostWithComments from "./components/CommunityHomePage/PostWithComments";
import { MyCommunity } from "./components/MyCommunity/MyCommunity";
import ChatsPage from "./components/Chats/ChatsPage";
import ChatList from "./components/Chats/ChatList";
import CommununityAnalytics from "./components/CommunityAnalytics/CommunityAnalytics";
import CommunityInvitePage from "./components/CommunityInvitePage/CommunityInvitePage";
import NavBarAfterLogin from "./components/navBar/NavBarAfterLogin";
import { useState, useEffect } from "react";
import User from "./components/UserProfile/user";
import Moderation from "./components/CommunityModeration/ModerationPage";
import UserList from "./components/CommunityModeration/UserList";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ff4500",
      main: "#f47b4e",
      dark: "#ff4500",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fafafa",
      main: "#f5f5f5",
      dark: "#e0e0e0",
      contrastText: "#9e9e9e",
    },
  },
});

const App = () => {
  const [isLogin, setLogin] = useState(false);
  const isLoggedIn = () => {
    if (localStorage.getItem("user")) {
      return true;
    } else {
      return false;
    }
  };
  if (!isLogin) {
    setInterval(() => {
      setLogin(isLoggedIn());
    }, 500);
  }
  return (
    <Provider store={store}>
      <div>
        <ThemeProvider theme={theme}>
          {isLogin ? <NavBarAfterLogin /> : <Navbar />}
          <Switch>
            <Route path="/communityhome" exact component={CommunityHomePage} />
            <Route path="/" exact component={Home} />

            {/* <Route path="/login" exact component={LoginForm} />
          <Route path="/signup" exact component={SignUp} />  */}
            <Route path="/communityhome" exact component={CommunityHomePage} />
            <Route path="/createpost" exact component={CreatePost} />
            <Route path="/createpost/post" exact component={Post} />
            <Route
              path="/createpost/imageandvideo"
              exact
              component={ImageAndVideo}
            />
            <Route path="/createpost/link" exact component={LinkPostType} />
            <Route path="/comments" exact component={PostWithComments} />
            <Route path="/user/:emailid" exact component={User} />
            {/* <Route path="/ModerationPage" exact component={ModerationPage} />  */}

            <Route
              path="/chats/:chatid/:username"
              exact
              component={ChatsPage}
            />
            <Route path="/chatList" exact component={ChatList} />

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
            <Route
              path="/mycommunities/analytics"
              exact
              component={CommununityAnalytics}
            />
            <Route path="/invites" exact component={CommunityInvitePage} />
            {<Route path="/ModerationPage" exact component={Moderation} />}
            <Route path="/searchbar" exact component={SearchBar} />
            <Route path="/SearchList" exact component={SearchList} />
            {/* <Route path="/Sort" exact component={Sort} /> */}
            <Route path="/dashboard" exact component={DashboardPage} />
            <Route path="/mycommunity" exact component={MyCommunity} />

            <Route path="/profile" exact component={UserProfile} />
            <Route path="/navbar" exact component={NavBarAfterLogin} />
            <Route path="/UserList" exact component={UserList} />

            {/* <Route path="/" exact component={Home} /> */}
          </Switch>
        </ThemeProvider>
      </div>
    </Provider>
  );
};

export default App;
