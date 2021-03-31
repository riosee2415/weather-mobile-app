import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as Location from "expo-location";
import { getCurrnetDate } from "../src/commonUtil";
import TypeWriter from "react-native-typewriter";

const WEATHER_API_KEY = "bf006490e5e99f29c1a25b36aa2bd63f";

const TodayScreen = () => {
  const [location_S, setLocation_S] = useState(null);
  const [errMsg_S, setErrMsg_S] = useState(``);

  const [viewDate, setViewDate] = useState(`0000. 00. 00 (0)`);
  const [viewTime, setViewTime] = useState(`00:00`);

  const [currentTemp, setCurrentTemp] = useState(`0`);
  const [currentCity, setCurrentCity] = useState(``);

  const [minTemp, setMinTemp] = useState(`0`);
  const [maxTemp, setMaxTemp] = useState(`0`);

  const [weatherStatus, setWeatherStatus] = useState(``);
  const [weatherImg, setWeatherImg] = useState(null);

  setInterval(() => {
    const { currentDate, currentTime } = getCurrnetDate();

    setViewDate(currentDate);
    setViewTime(currentTime);
  }, 1000);

  useEffect(() => {
    const { currentDate, currentTime } = getCurrnetDate();

    setViewDate(currentDate);
    setViewTime(currentTime);

    (async () => {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        setErrMsg_S("Refuse Permission This Device.");
        return;
      }

      const locData = await Location.getCurrentPositionAsync({});
      setLocation_S(locData);

      try {
        const weather = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${locData.coords.latitude}&lon=${locData.coords.longitude}&appid=${WEATHER_API_KEY}&units=metric`
        )
          .then((res) => {
            return res.json();
          })
          .then((json) => {
            const temp = String(json.main.temp).split(".")[0];
            const minTemp = String(json.main.temp_min).split(".")[0];
            const maxTemp = String(json.main.temp_max).split(".")[0];

            setCurrentCity(json.name);
            setCurrentTemp(temp);
            setMinTemp(minTemp);
            setMaxTemp(maxTemp);

            const status = json.weather[0].description;

            switch (status) {
              case "clear sky":
                setWeatherStatus("날씨가 좋아요. 외출은 어때요?");
                setWeatherImg(
                  "https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/EDU_WEARHER%2Fsun.png?alt=media&token=cd423cbc-5c30-4d9c-b960-628fdb7ccb7f"
                );
                break;
              case "moderate rain":
                setWeatherStatus("비가 오고 있어요. 우산은 챙기셨나요?");
                setWeatherImg(
                  "https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/EDU_WEARHER%2Frainy.png?alt=media&token=14a857b4-3ec3-4aac-80a4-2deed0c62b65"
                );
                break;
              case "few clouds":
                setWeatherStatus("조금 흐리네요. 감기 조심하세요.");
                setWeatherImg(
                  "https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/EDU_WEARHER%2Fclouds.png?alt=media&token=8a6bdc71-e649-4a58-8ef9-0f81b68ee3fe"
                );
                break;
              case "scattered clouds":
                setWeatherStatus("구름이 많아요. 운전에 주의하세요.");
                setWeatherImg(
                  "https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/EDU_WEARHER%2Fclouds.png?alt=media&token=8a6bdc71-e649-4a58-8ef9-0f81b68ee3fe"
                );
                break;
              case "broken clouds":
                setWeatherStatus("비가 올 수도 있어요. 우산을 챙겨주세요.");
                setWeatherImg(
                  "https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/EDU_WEARHER%2Fcloud.png?alt=media&token=96fdf138-8354-4f84-8d99-154e158325cc"
                );
                break;
              case "shower rain":
                setWeatherStatus("비가 오고있어요. 우산은 필수에요.");
                setWeatherImg(
                  "https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/EDU_WEARHER%2Frainy.png?alt=media&token=14a857b4-3ec3-4aac-80a4-2deed0c62b65"
                );
                break;
              case "rain":
                setWeatherStatus("비가 오고있어요. 우산은 필수에요.");
                setWeatherImg(
                  "https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/EDU_WEARHER%2Frainy.png?alt=media&token=14a857b4-3ec3-4aac-80a4-2deed0c62b65"
                );
                break;
              case "thunderstorm":
                setWeatherStatus("태풍이 오고있어요. 외출을 자제하세요.");
                setWeatherImg(
                  "https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/EDU_WEARHER%2Fthunderstorm.png?alt=media&token=18316dcd-3ad3-40df-ac2d-bc8f3b6b9e6b"
                );
                break;
              case "snow":
                setWeatherStatus("눈을 좋아세요? 눈이 오고 있어요.");
                setWeatherImg(
                  "https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/EDU_WEARHER%2Fsnowflake.png?alt=media&token=01b68b9d-5268-413a-b02a-743670cf2e56"
                );
                break;
              case "mist":
                setWeatherStatus("안개가 심하네요. 조심하세요.");
                setWeatherImg(
                  "https://firebasestorage.googleapis.com/v0/b/storage-4leaf.appspot.com/o/EDU_WEARHER%2Fmist.png?alt=media&token=20451f4f-ec83-49f4-b615-4a01ec5ff642"
                );
                break;
            }
          });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box_1}>
        <Text style={styles.timeText}>{viewTime}</Text>
        <Text style={styles.dateText}>{viewDate}</Text>
      </View>
      <View style={styles.box_2}>
        {weatherImg && (
          <Image
            style={styles.weatherImg}
            source={{
              uri: weatherImg,
            }}
          />
        )}
        <Text style={styles.statusText}>
          <TypeWriter typing={1}>{weatherStatus}</TypeWriter>
        </Text>
        <Text style={styles.tempText}>{currentTemp}°C</Text>
        <View style={styles.tempUnderLine}></View>
      </View>
      <View style={styles.box_3}>
        <Text style={styles.cityText}>{currentCity}</Text>
      </View>
      <View style={styles.box_4}>
        {/* <View style={styles.box_4_box}>
          <Text style={styles.tempGuideText}>최저기온</Text>
          <Text style={styles.minMaxTemp}>{minTemp}°C</Text>
        </View>
        <View style={styles.box_4_box}>
          <Text style={styles.tempGuideText}>최고기온</Text>
          <Text style={styles.minMaxTemp}>{maxTemp}°C</Text>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  box_1: {
    flex: 2,
    width: `100%`,
    flexDirection: `column`,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 100,
  },

  dateText: {
    fontSize: 19,
    color: `#34495e`,
  },

  timeText: {
    fontSize: 34,
    fontWeight: `700`,
  },

  statusText: {
    marginBottom: 20,
    color: `#333`,
    fontSize: 16,
  },

  box_2: {
    flex: 2.5,
    width: `100%`,
    flexDirection: `column`,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  tempText: {
    fontWeight: `500`,
    fontSize: 90,
    marginBottom: 5,
  },

  tempUnderLine: {
    width: `70%`,
    height: 1,
    backgroundColor: `#333`,
    borderRadius: 20,
    marginTop: -10,
    marginBottom: 5,
  },

  box_3: {
    flex: 1,
    width: `100%`,
    flexDirection: `column`,
    alignItems: "center",
    justifyContent: "flex-start",
  },

  cityText: {
    fontSize: 20,
    fontWeight: `500`,
    color: `#888`,
  },

  box_4: {
    flex: 2,
    width: `100%`,
    flexDirection: `row`,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: `#ffeaa7`,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: "#fdcb6e",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.7,
    shadowRadius: 11.14,

    elevation: 17,
  },

  gbox: {
    width: `100%`,
    height: `100%`,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
  },

  box_4_box: {
    width: `40%`,
    height: `100%`,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  tempGuideText: {
    fontSize: 26,
    fontWeight: `500`,
    padding: 5,
  },

  minMaxTemp: {
    fontWeight: `400`,
    fontSize: 20,
  },

  weatherImg: {
    width: 170,
    height: 170,
    marginBottom: 20,
  },
});

export default TodayScreen;
