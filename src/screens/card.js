import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableNativeFeedback,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import moment from "moment";
const Card = ({ video }) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const iconColor = colors.iconColor;
  
  return (
    <TouchableNativeFeedback
      onPress={() => navigation.navigate("video", { video: video,id:video.snippet.thumbnails.high.url.replace("https://i.ytimg.com/vi/","").replace("/hqdefault.jpg","")  })}
    >
      <View style={{ marginBottom: 10 }}>
        <Image
          source={{
            uri:video.snippet.thumbnails.high.url,
          }}
          style={{ width: "100%", height: 200 }}
        ></Image>
        <View style={{ flexDirection: "row", margin: 5 }}>
          <MaterialIcons name="account-circle" size={40} color={iconColor} />
          <View style={{ marginRight: 3, paddingLeft: 10 }}>
            <Text
              style={{
                fontSize: 17,
                width: Dimensions.get("screen").width - 55,
                color: iconColor,
              }}
              ellipsizeMode="tail"
              numberOfLines={2}
            >
              {video.snippet.title}
            </Text>
            <Text style={{ fontSize: 13, color: iconColor, opacity: 0.6 }}>
              {video.snippet.channelTitle} •{" "}
              {moment(video.snippet.publishedAt).fromNow()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    width: Dimensions.get("screen").width - 55,
  },
});
export default Card;
