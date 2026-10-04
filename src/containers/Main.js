import React, {useContext, useEffect, useState} from "react";
import {Redirect, Route, Switch, useLocation, useParams} from "react-router-dom";
import Header from "../components/header/Header";
import Greeting from "./greeting/Greeting";
import Skills from "./skills/Skills";
import StackProgress from "./skillProgress/skillProgress";
import WorkExperience from "./workExperience/WorkExperience";
import Projects from "./projects/Projects";
import StartupProject from "./StartupProjects/StartupProject";
import Achievement from "./achievement/Achievement";
import Blogs from "./blogs/Blogs";
import Footer from "../components/footer/Footer";
import Talks from "./talks/Talks";
import Podcast from "./podcast/Podcast";
import Education from "./education/Education";
import ScrollToTopButton from "./topbutton/Top";
import Twitter from "./twitter-embed/twitter";
import Profile from "./profile/Profile";
import BlogHome from "./blogHome/BlogHome";
import {AccessControlledBlogArticle} from "./blogHome/BlogArticle";
import BlogRouteTransition from "./blogHome/BlogRouteTransition";
import AccessContent from "../components/accessContent/AccessContent";
import blogData from "./blogHome/blogData.json";
import SplashScreen from "./splashScreen/SplashScreen";
import {splashScreen} from "../portfolio";
import {StyleProvider} from "../contexts/StyleContext";
import AppConfigContext from "../contexts/appConfig/AppConfigContext";
import {useLocalStorage} from "../hooks/useLocalStorage";
import HelperPage from "./helperPages/HelperPage";
import "./Main.scss";

const PrivateAwareBlogArticle = () => {
  const {slug} = useParams();
  const blog = blogData.find(article => article.slug === slug);

  return (
    <AccessControlledBlogArticle isPrivate={Boolean(blog && blog.isPrivate)} />
  );
};

const Main = () => {
  const {isPathUnderMaintenance} = useContext(AppConfigContext);
  const location = useLocation();
  const darkPref = window.matchMedia("(prefers-color-scheme: dark)");
  const [isDark, setIsDark] = useLocalStorage("isDark", darkPref.matches);
  const [isShowingSplashAnimation, setIsShowingSplashAnimation] =
    useState(true);
  const shouldRedirectToMaintenance =
    location.pathname !== "/maintenance" &&
    isPathUnderMaintenance(location.pathname);

  useEffect(() => {
    if (splashScreen.enabled) {
      const splashTimer = setTimeout(
        () => setIsShowingSplashAnimation(false),
        splashScreen.duration
      );
      return () => {
        clearTimeout(splashTimer);
      };
    }
  }, []);

  const changeTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={isDark ? "dark-mode" : null}>
      <StyleProvider value={{isDark: isDark, changeTheme: changeTheme}}>
        {isShowingSplashAnimation && splashScreen.enabled ? (
          <SplashScreen />
        ) : (
          <>
            <Header />
            {shouldRedirectToMaintenance ? (
              <Redirect to="/maintenance" />
            ) : (
              <Switch>
                <Route exact path="/">
                  <Greeting />
                  <Skills />
                  <StackProgress />
                  <Education />
                  <WorkExperience />
                  <Projects />
                  <StartupProject />
                  <Achievement />
                  <Blogs />
                  <Talks />
                  <Twitter />
                  <Podcast />
                  <Profile />
                </Route>
                <Route exact path="/accessContent">
                  <AccessContent />
                </Route>
                <Route exact path="/blog/:slug">
                  <BlogRouteTransition>
                    <PrivateAwareBlogArticle />
                  </BlogRouteTransition>
                </Route>
                <Route exact path="/blog">
                  <BlogRouteTransition>
                    <BlogHome />
                  </BlogRouteTransition>
                </Route>
                <Route exact path="/unauthorized">
                  <HelperPage page="unauthorized" />
                </Route>
                <Route exact path="/not-found">
                  <HelperPage page="notFound" />
                </Route>
                <Route exact path="/coming-soon">
                  <HelperPage page="comingSoon" />
                </Route>
                <Route exact path="/maintenance">
                  <HelperPage page="maintenance" />
                </Route>
                <Redirect to="/not-found" />
              </Switch>
            )}
            <Footer />
            <ScrollToTopButton />
          </>
        )}
      </StyleProvider>
    </div>
  );
};

export default Main;
