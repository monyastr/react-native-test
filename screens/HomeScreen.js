import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { WebBrowser } from "expo";

import { MonoText } from "../components/StyledText";

import Slider from "../components/Slider";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { sliderWidth, itemWidth } from "../components/Slider/Sliderstyle.js";

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: true
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.welcomeImage}
              onPress={() =>{
                WebBrowser.openBrowserAsync("https://www.apriorit.com")
              }}
            />

            <Carousel
              data={ENTRIES}
              renderItem={data => {
                return <Slider data={data.item} even={false} />;
              }}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              layout={"tinder"}
              loop={true}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>
            <View
              style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
            >
              <MonoText style={styles.codeHighlightText}>
                screens/HomeScreen.js
              </MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity
              onPress={this._handleHelpPress}
              style={styles.helpLink}
            >
              <Text style={styles.helpLinkText}>
                Help, it didn’t automatically reload!
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>
            This is a tab bar. You can edit it in:
          </Text>

          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}
          >
            <MonoText style={styles.codeHighlightText}>
              navigation/MainTabNavigator.js
            </MonoText>
          </View>
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/development-mode"
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      "https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes"
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 200,
    height: 90,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10,
    marginBottom: 10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: "rgba(96,100,109, 0.8)"
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20
  },
  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center"
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});

const ENTRIES = [
  {
    title: "Creating and Deploying Honeypots in Kubernetes",
    subtitle:
      "Every week, we get news about a massive new data breach or leak of personal information...",
    illustration:
      "https://www.apriorit.com/images/articles/honeypots_in_kubernetes/blog-145-article-var2.jpg",
    url:
      "https://www.apriorit.com/dev-blog/619-web-cybersecurity-honeypots-in-kubernetes"
  },
  {
    title:
      "How to Automate GUI Testing of Windows Apps with Pywinauto: Expert Advice",
    subtitle:
      "Graphical user interface testing is an essential part of quality assurance testing as it lets you look at your application from the user’s perspective...",
    illustration:
      "https://www.apriorit.com/images/articles/CUDA/blog-137-article-var2.jpg",
    url:
      "https://www.apriorit.com/dev-blog/615-qa-gui-testing-windows-python-pywinauto"
  },
  {
    title: "Anti Debugging Protection Techniques With Examples",
    subtitle:
      "In terms of software, reverse engineering is the process of researching a program to obtain closed information about how it works and what algorithms it uses...",
    illustration:
      "https://www.apriorit.com/images/articles/730reverse_site.jpg",
    url:
      "https://www.apriorit.com/dev-blog/367-anti-reverse-engineering-protection-techniques-to-use-before-releasing-software"
  },
  {
    title: "Top 7 Methods of Data Encryption in Android Applications",
    subtitle:
      "Android is considered one of the most frequently attacked platforms. While it isn’t possible to implement quantum encryption in every app...",
    illustration:
      "https://www.apriorit.com/images/articles/Top_7_Methods_of_Data_Encryption_in_Android_Applications/blog-133-article.jpg",
    url:
      "https://www.apriorit.com/dev-blog/612-mobile-cybersecurity-encryption-in-android"
  },
  {
    title: "Using Kali Linux for Penetration Testing",
    subtitle:
      "Penetration testing can help you improve both the security and quality of your product...",
    illustration:
      "https://www.apriorit.com/images/articles/Kali_Linux_for_Pentesting/blog-130-article-var4.jpg",
    url: "https://www.apriorit.com/dev-blog/611-kali-linux-for-pentesting"
  },
  {
    title:
      "Developing a Simple Display-only Driver for a Graphics Adapter: A Practical Example",
    subtitle:
      "With new devices appearing every day, the Apriorit driver development team always has a tight schedule...",
    illustration:
      "https://www.apriorit.com/images/articles/Display-only_driver/blog-128-article-var4.jpg",
    url:
      "https://www.apriorit.com/dev-blog/605-develop-driver-graphics-adapter-example"
  }
];
