import { StyleSheet, Text, View } from "react-native";
import React, { memo, useEffect, useState } from "react";
// import { Slider } from "react-native-range-slider-expo";
import Slider from "@react-native-community/slider";
import { useAppSelector } from "../redux/Store";
import _ from "lodash";

const AppSlider = (props) => {
  const {
    minimumValue = 1,
    maximumValue = 10,
    step = 1,
    total_break = 2,
    append_by = "k",
    startBy = "0",
    getSelected,
  } = props || {};
  const [value, setValue] = useState(1);
  const [breaks, setBreaks] = useState([]);
  const { theme } = useAppSelector((state) => state.theme);

  function getBreakDowns() {
    const step = maximumValue / total_break;
    const arr = [];
    for (let i = 0; i <= maximumValue; i += step) {
      arr.push(i);
    }
    setBreaks(arr);
  }

  useEffect(() => {
    getBreakDowns();
  }, [minimumValue, maximumValue, total_break]);

  useEffect(() => {
    if (getSelected) getSelected(value);
  }, [getSelected, value]);

  // console.log("Breaks===>", breaks);
  return (
    <View style={{ height: 80 }}>
      <Slider
        style={{ width: "100%", height: 30 }}
        minimumValue={minimumValue}
        maximumValue={maximumValue}
        minimumTrackTintColor={theme.primary}
        maximumTrackTintColor={theme.gray}
        thumbTintColor={theme.primary}
        step={step}
        onValueChange={(val) => setValue(val)}
        value={value}
      />
      <View
        style={{
          flexDirection: "row",
          // alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 15,
        }}
      >
        {_.map(breaks, (item) => (
          <Text key={item} style={styles.text} onPress={() => setValue(item)}>
            {item === 0 ? item + 1 : item + append_by}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default memo(AppSlider);

const styles = StyleSheet.create({
  slider: {
    width: 300,
    opacity: 1,
    height: 50,
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    // margin: 0,
    // alignItems: "center",
  },
});
