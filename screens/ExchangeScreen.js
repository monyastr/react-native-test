import React from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions
} from "react-native";

import Chart from "../components/Exchange/Chart.js";
import { Dropdown } from "react-native-material-dropdown";
import { TextField } from "react-native-material-textfield";
import { Icon } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
export default class ExplorerScreen extends React.Component {
  static navigationOptions = {
    title: "Currency Converter"
  };

  constructor(props) {
    super(props);
    const now = new Date().toISOString().slice(0, 10);
    this.state = {
      isLoading: true,
      dataSource: {},
      isDateTimePickerVisible: false,
      amountTo: "",
      to: "",
      historicalData: [],
      period: "start",
      date: {
        start: now,
        end: now
      }
    };
    this.toSymbol = React.createRef();
    this.onAmountChange = this.onAmountChange.bind(this);
  }

  componentDidMount() {
    return fetch("https://api.exchangeratesapi.io/latest")
      .then(response => response.json())
      .then(dataSource => {
        this.setState(
          {
            isLoading: false,
            dataSource
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  showDateTimePicker = period => {
    this.setState({
      isDateTimePickerVisible: !this.state.isDateTimePickerVisible,
      period
    });
  };

  handleDatePicked(value) {
    console.log("A date has been picked: ", value);
    const newDate = new Date(value).toISOString().slice(0, 10);
    const date = this.state.date;
    date[this.state.period] = newDate;
    this.setState(
      { date },
      this.showDateTimePicker(),
      this.getHistoricalData()
    );
  }

  onAmountChange(value) {
    const { dataSource } = this.state;
    const symbol = this.toSymbol.current.state.value;
    const rate = dataSource.rates[symbol];
    if (rate) this.setState({ amountTo: value * rate });
  }

  getHistoricalData() {
    const symbol = this.toSymbol.current.state.value || "";
    const { start, end } = this.state.date;
    fetch(
      `https://api.exchangeratesapi.io/history?start_at=${start}&end_at=${end}`
    )
      .then(response => response.json())
      .then(historicalData => {
        let rates = Object.values(historicalData.rates)[0];
        rates = Object.entries(rates);
        rates.length = 10;
        rates = rates.map((item) => {          
          let randomColor = () => {
            let colorArray = [];
            for ( let i = 0; i < 4 ; i++) {
              colorArray.push(Math.floor(Math.random() * (255 - 1)) + 1);
            }
            return colorArray;
          };
          return {name: item[0], rate: item[1], color: `rgba(${randomColor()})`, legendFontColor: '#7F7F7F', legendFontSize: 15}
        });
        
        const labels = Object.keys(historicalData.rates);
        const data = Object.values(historicalData.rates).map(item => {
          return item[symbol];
        });
        this.setState(
          {
            isLoading: false,
            historicalData: { labels, data },
            rates
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { dataSource, amountTo, rates } = this.state;
    let data = dataSource.rates
      ? Object.keys(dataSource.rates).map(item => {
          return { value: item };
        })
      : [];
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >         
          <View style={styles.symbolDropdownContainer}>
            <Dropdown
              containerStyle={{ width: "40%" }}
              label="From"
              value={dataSource.base}
              data={data}
            />
            <Icon name="compare-arrows" containerStyle={{ marginTop: 25 }} />
            <Dropdown
              ref={this.toSymbol}
              containerStyle={{ width: "40%" }}
              label="To"
              data={data}
            />
          </View>
          <View style={styles.symbolDropdownContainer}>
            <TextField
              containerStyle={{ width: "40%" }}
              label="Amount"
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              returnKeyType="next"
              keyboardType="decimal-pad"
              onChangeText={this.onAmountChange}
            />
            <TextField
              containerStyle={{ width: "40%" }}
              label="Amount"
              autoCorrect={false}
              enablesReturnKeyAutomatically={true}
              keyboardType="decimal-pad"
              editable={false}
              value={`${amountTo}`}
            />
          </View>

          <View>
            <Text style={{ margin: 10, textAlign: "center", fontSize: 20 }}>
              Get Historical Currency Data
            </Text>
            <View style={styles.symbolDropdownContainer}>
              <View style={{ marginLeft: 30, width: "40%" }}>
                <Button
                  title="Start Date"
                  onPress={this.showDateTimePicker.bind(this, "start")}
                />
              </View>
              <View style={{ marginRight: 30, width: "40%" }}>
                <Button
                  title="End Date"
                  onPress={this.showDateTimePicker.bind(this, "end")}
                />
              </View>
            </View>

            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked.bind(this)}
              onCancel={this.showDateTimePicker}
            />
          </View>

          <View style={styles.welcomeContainer}>
            <Chart data={this.state.historicalData} rates={rates} />
          </View>
        </ScrollView>
      </View>
    );
  }
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
  symbolDropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginHorizontal: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
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
  slider: {
    marginTop: 15,
    overflow: "visible"
  },
  sliderContentContainer: {
    paddingVertical: 10
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
