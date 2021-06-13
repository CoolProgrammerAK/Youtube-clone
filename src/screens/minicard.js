import React from "react";
import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import moment from "moment";
const Minicard = ({ video }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const iconColor = colors.iconColor;
  return (
    <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate("video", {
          video: video,
          id: video.snippet.thumbnails.high.url
            .replace("https://i.ytimg.com/vi/", "")
            .replace("/hqdefault.jpg", ""),
        })
      }
    >
      <View style={{ flexDirection: "row", margin: 10, marginBottom: 0 }}>
        <Image
          source={{
            uri: video.snippet.thumbnails.high.url,
          }}
          style={{ width: "45%", height: 120 }}
        ></Image>
        <View style={{ marginRight: 3, paddingLeft: 10 }}>
          <Text
            style={{ fontSize: 16, color: iconColor, ...styles.fontStyle }}
            ellipsizeMode="tail"
            numberOfLines={3}
          >
            {video.snippet.title}
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: iconColor,
              opacity: 0.6,
              ...styles.fontStyle,
            }}
            ellipsizeMode="tail"
            numberOfLines={2}
          >
            {video.snippet.channelTitle} •{" "}
            {moment(video.snippet.publishedAt).fromNow()}{" "}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  fontStyle: {
    width: Dimensions.get("screen").width / 2,
    fontFamily: "sans-serif",
  },
});

export default Minicard;
