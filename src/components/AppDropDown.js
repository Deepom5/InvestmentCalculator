import { Image, StyleSheet, Text, View } from "react-native";
import React, { memo, useRef, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { moderateScale } from "react-native-size-matters";
import { useAppSelector } from "../redux/Store";
import AppText from "./Text/AppText";

const AppDropDown = (props) => {
  const { data, fetchType } = props || {};
  const { theme } = useAppSelector((state) => state.theme);
  const [isFocus, setIsFocus] = useState(false);

  const dropdownRef = useRef();

  return (
    <View
      style={{
        position: "relative",
        borderRadius: moderateScale(10, 0.3),
        backgroundColor: "#F3F3F3",
      }}
    >
      <Dropdown
        testID="Search_Filter"
        ref={dropdownRef}
        style={{
          height: moderateScale(35, 0.3),
          width: "100%",
          borderRadius: moderateScale(20, 0.3),
          padding: moderateScale(6, 0.3),
        }}
        selectedTextStyle={{
          color: theme.title,
          textAlign: "center",
          fontFamily: theme.Font_Regular,
          fontSize: moderateScale(14, 0.3),
          fontWeight: "700",
        }}
        activeColor={"transparent"}
        selectedTextProps={{ numberOfLines: 1 }}
        fontFamily={theme.Font_Regular}
        iconStyle={{
          width: moderateScale(20, 0.3),
          height: moderateScale(20, 0.3),
        }}
        iconColor={theme.title}
        autoScroll={false}
        containerStyle={{
          display: isFocus ? "flex" : "none",
          zIndex: 10,
          borderRadius: moderateScale(10, 0.3),
          overflow: "hidden",
          // ...theme.light_shadow,
        }}
        dropdownPosition="auto"
        backgroundColor="#00000035"
        data={data}
        labelField="label"
        valueField="value"
        placeholder={data[0]?.lable}
        value={data[0]?.value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setIsFocus(false);
          fetchType(item?.value);
        }}
        renderItem={(item, selected) => {
          return (
            <View
              style={{
                height: moderateScale(45, 0.3),
                maxWidth: "100%",
                alignItems: "center",
                // justifyContent: "center",
                backgroundColor: "transparent",
                flexDirection: "row",
                marginHorizontal: moderateScale(10, 0.3),
              }}
            >
              <Image
                source={{ uri: item?.url }}
                resizeMode="contain"
                style={{ height: 15, width: 15, marginRight: 15 }}
              />
              <AppText
                color={selected ? theme.primary : theme.blackText}
                size={15}
                style={{
                  justifyContent: "center",
                  textTransform: "capitalize",
                }}
                fontStyle="500.semibold"
                numberOfLines={1}
              >
                {item?.label}
              </AppText>
            </View>
          );
        }}
      />
    </View>
  );
};

export default memo(AppDropDown);

const styles = StyleSheet.create({});
