import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import AppContainer from "../components/Container/AppContainer";
import { useAppSelector } from "../redux/Store";
import Slider from "../components/Slider";
import AppText from "../components/Text/AppText";
import _ from "lodash";
import AppButton from "../components/Button/AppButton";
import CalculateManager from "../services/features/Calculate/CalculateManager";
import { AntDesign } from "@expo/vector-icons";
import AppDropDown from "../components/AppDropDown";

function Home() {
  const [loadingData, setLoadingData] = useState(false);
  const [invested, setInvested] = useState(1);
  const [investedFor, setInvestedFor] = useState(1);
  const [timeLine, setTimeLine] = useState(365);
  const [returns, setReturns] = useState(null);
  const [pools, setPools] = useState(null);
  const [optimizedPools, setOptimizedPools] = useState(null);
  const [investType, setInvestType] = useState(null);
  const { theme } = useAppSelector((state) => state.theme);

  const TimeLineArray = [
    { title: "Every Week", value: 7 },
    { title: "Every Month", value: 30 },
    { title: "Every Year", value: 365 },
  ];

  const lastData = _.last(returns?.resultData);
  const isNegative = returns?.absoluteReturns < 0;

  const fetchPool = () => {
    CalculateManager.getAllPoolId(
      {},
      (res) => {
        // console.log("RES==>", JSON.stringify(res, null, 2));
        setPools(res?.data?.data?.pools);
      },
      (err) => {
        console.log("RES===>", err);
      }
    );
  };

  useLayoutEffect(() => {
    fetchPool();
  }, []);

  const fetchData = () => {
    setLoadingData(true);
    const params = {
      poolId: investType,
      frqInDays: timeLine,
      investmentCount:
        timeLine === 365
          ? investedFor
          : timeLine === 30
          ? investedFor * 12
          : 52 * investedFor,
      sipAmount: invested * 1000,
    };
    CalculateManager.getIntrest(
      params,
      (res) => {
        // console.log("RES==>", JSON.stringify(res, null, 2));
        setReturns(res?.data?.data?.result);
        setLoadingData(false);
      },
      (err) => {
        console.log("RES===>", err);
        setLoadingData(false);
      }
    );
  };

  useEffect(() => {
    if (pools) {
      const newData = _.map(pools, (item) => {
        return {
          label: item?.poolName,
          value: item?.id,
          url: item?.poolImage,
        };
      });
      setOptimizedPools(newData);
      setInvestType(newData[0]?.value);
    }
  }, [pools]);

  return (
    <AppContainer
      style={{
        flex: 1,
        //  justifyContent: "center"
      }}
      scrollable={false}
    >
      <View
        style={{
          margin: 5,
          backgroundColor: theme.white,
          padding: 5,
          borderRadius: 5,
          ...theme.mid_shadow,
          paddingVertical: 20,
        }}
      >
        <AppText
          fontStyle="500.normal"
          size={25}
          color={theme.primary}
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          Calculate Earnings
        </AppText>
        <View
          style={{
            marginHorizontal: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AppText
            fontStyle="500.normal"
            size={16}
            color={theme.secondaryText}
            style={{ marginVertical: 10 }}
          >
            Invested Amount
          </AppText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText
              fontStyle="500.normal"
              size={16}
              color={theme.title}
              style={{
                marginHorizontal: 10,
                textAlign: "center",
                backgroundColor: theme.grayBg,
                padding: 5,
                paddingHorizontal: 15,
                borderRadius: 20,
              }}
            >
              {invested * 1000}
            </AppText>
            <AppText
              fontStyle="500.normal"
              size={16}
              color={theme.title}
              style={{
                textAlign: "center",
                backgroundColor: theme.grayBg,
                padding: 5,
                paddingHorizontal: 15,
                borderRadius: 20,
              }}
            >
              USTD
            </AppText>
          </View>
        </View>
        <Slider
          minimumValue={1}
          maximumValue={21}
          total_break={7}
          append_by={"k"}
          getSelected={(value) => setInvested(value)}
        />
        {/*  Second Part===== */}
        <View
          style={{
            marginHorizontal: 10,
            marginTop: -10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AppText
            fontStyle="500.normal"
            size={16}
            color={theme.secondaryText}
            style={{ marginVertical: 10 }}
          >
            Invested In
          </AppText>
          <View style={{ flex: 0.9 }}>
            {optimizedPools && (
              <AppDropDown
                data={optimizedPools}
                fetchType={(value) => setInvestType(value)}
              />
            )}
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 5,
            justifyContent: "space-between",
          }}
        >
          <AppText
            fontStyle="500.normal"
            size={16}
            color={theme.secondaryText}
            style={{ marginVertical: 10 }}
          >
            Investment Timeline
          </AppText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {_.map(TimeLineArray, (item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  marginRight: 10,
                  textAlign: "center",
                  backgroundColor:
                    item?.value === timeLine ? theme.primary : theme.grayBg,
                  padding: 10,
                  paddingHorizontal: 15,
                  borderRadius: 20,
                }}
                activeOpacity={0.7}
                onPress={() => setTimeLine(item?.value)}
              >
                <AppText
                  fontStyle="500.normal"
                  size={16}
                  color={
                    item?.value === timeLine ? theme.white : theme.secondaryText
                  }
                >
                  {item.title}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        {/* ========== 4th ======= */}
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <AppText
            fontStyle="500.normal"
            size={16}
            color={theme.secondaryText}
            style={{ marginVertical: 10 }}
          >
            Invested For
          </AppText>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText
              fontStyle="500.normal"
              size={16}
              color={theme.title}
              style={{
                marginHorizontal: 10,
                textAlign: "center",
                backgroundColor: theme.grayBg,
                padding: 5,
                paddingHorizontal: 15,
                borderRadius: 20,
              }}
            >
              {investedFor} years
            </AppText>
          </View>
        </View>
        <Slider
          minimumValue={1}
          maximumValue={10}
          total_break={5}
          append_by={"years"}
          getSelected={(value) => setInvestedFor(value)}
        />
        {/* Last============ */}
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <AppText
              fontStyle="500.normal"
              size={16}
              color={theme.secondaryText}
              // style={{ marginVertical: 10 }}
            >
              Invested Money :
            </AppText>
            <AppText
              fontStyle="700.normal"
              size={20}
              color={theme.secondaryText}
              style={{ margin: 10 }}
            >
              {Math.ceil(lastData?.investedAmount) || 0} USTD
            </AppText>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              marginTop: 10,
            }}
          >
            <AppText
              fontStyle="500.normal"
              size={16}
              color={theme.secondaryText}
              // style={{ marginVertical: 10 }}
            >
              Money you would have :
            </AppText>
            <View style={{ marginHorizontal: 5 }}>
              <AppText
                fontStyle="700.normal"
                size={20}
                color={theme.secondary}
                style={{ marginTop: -3 }}
              >
                {Math.ceil(lastData?.worthNowInUSD) || 0} USTD
              </AppText>
              {returns?.absoluteReturns && (
                <View
                  style={{
                    backgroundColor: isNegative
                      ? theme?.warningLight
                      : theme.secondaryLight,
                    padding: 3,
                    borderRadius: 5,
                    marginTop: 3,
                    paddingHorizontal: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}
                >
                  {isNegative ? (
                    <AntDesign
                      name="caretdown"
                      size={10}
                      color={theme.warning}
                    />
                  ) : (
                    <AntDesign
                      name="caretup"
                      size={10}
                      color={theme.secondary}
                    />
                  )}
                  <AppText
                    fontStyle="700.normal"
                    size={14}
                    color={isNegative ? theme.warning : theme.secondary}
                    style={{ marginLeft: 5 }}
                  >
                    {returns?.absoluteReturns} %
                  </AppText>
                </View>
              )}
            </View>
          </View>
        </View>
        <AppButton
          Title="Calculate"
          style={{ marginTop: 30, alignSelf: "center" }}
          height={45}
          width="90%"
          onPress={fetchData}
          loading={loadingData}
        />
      </View>
    </AppContainer>
  );
}

export default memo(Home);

const styles = StyleSheet.create({});
