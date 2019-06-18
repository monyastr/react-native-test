import React from "react";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import { View, Dimensions } from "react-native";

const chartConfig = {
  backgroundColor: "#fbfbfb",
  backgroundGradientFrom: "#fbfbfb",
  backgroundGradientTo: "#fbfbfb",
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(46, 120, 183, ${opacity})`
};
export default class Chart extends React.Component {
  render() {
    let { labels = [], data = [0] } = this.props.data;
    const _data = {
      labels,
      datasets: [
        {
          data: data
        }
      ]
    };
    const screenWidth = Dimensions.get("window").width;

    return (
      <View>
        <LineChart
          data={_data}
          width={screenWidth} // from react-native
          height={220}
          yAxisLabel={"$"}
          chartConfig={chartConfig}
          style={{
            marginVertical: 8
          }}
        />
        <BarChart
          style={{ MarginTop: 20 }}
          data={_data}
          width={screenWidth}
          height={220}
          yAxisLabel={"$"}
          chartConfig={chartConfig}
        />
        {/* <PieChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="price"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        /> */}
      </View>
    );
  }
}
