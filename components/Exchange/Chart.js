import React from "react";
import { LineChart } from "react-native-chart-kit";
import { View, Dimensions } from "react-native";

export default class Chart extends React.Component {
  render() {
    let { labels = [], data = [0] } = this.props.data;    

    return (
      <View>
        <LineChart
          data={{
            labels,
            datasets: [
              {
                data: data
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={220}
          yAxisLabel={"$"}
          chartConfig={{
            backgroundColor: "#fbfbfb",
            backgroundGradientFrom: "#fbfbfb",
            backgroundGradientTo: "#fbfbfb",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(46, 120, 183, ${opacity})`            
          }}
          style={{
            marginVertical: 8            
          }}
        />
      </View>
    );
  }
}
