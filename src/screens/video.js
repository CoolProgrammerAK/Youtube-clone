import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
import { WebView } from "react-native-webview";
import { useTheme } from "@react-navigation/native";
import moment from "moment";
import Modal from "./modal";
import { SimpleLineIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import {API} from '../../api_key'
const video = ({ route, navigation }) => {
  const { colors } = useTheme();
  const iconColor = colors.iconColor;
  const { video, id } = route.params;

  const dispatch = useDispatch();
  const [data, setdata] = React.useState([]);
  const [modalVisible, setModalVisible] = React.useState(false);

  useEffect(() => {
    const fetchvideodetails = async (video) => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics,snippet&id=${id}&key=${API}`
      );
      const data = await res.json();
      setdata(data.items);
      dispatch({ type: "ADD", payload: video });
    };

    fetchvideodetails(video);
  }, [id]);
  const roundoff = (e) => {
    var v = parseInt(e);
    var kvideos = v / 1000;
    if (kvideos >= 1) {
      if (kvideos < 1000) {
        return kvideos.toFixed(0).toString() + "K";
      } else {
        kvideos = kvideos / 1000;
        return kvideos.toFixed(0).toString() + "M";
      }
    } else {
      return e;
    }
  };
  if (data[0] != undefined) {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ width: "100%", height: 300 }}>
          <WebView
            javaScriptEnabled={true}
            domStorgeEnabled={true}
            source={{
              uri: `https://www.youtube.com/embed/${id}?rel=0`,
            }}
          ></WebView>
        </View>
        <View style={{ margin: 8 }}>
          {modalVisible && (
            <Modal
              data={data}
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
            ></Modal>
          )}
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontSize: 18,
                color: iconColor,
                ...styles.fontStyle,
                fontFamily: "PoppinsMedium",
                paddingRight: 2,
              }}
            >
              {video.snippet.title}
            </Text>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
              <SimpleLineIcons
                name="arrow-up"
                size={24}
                color="grey"
              ></SimpleLineIcons>
            </TouchableWithoutFeedback>
          </View>

          <Text
            style={{
              fontSize: 14,
              color: iconColor,
              opacity: 0.6,
              ...styles.fontStyle,
              fontFamily: "PoppinsRegular",
            }}
          >
            {roundoff(data[0].statistics.viewCount)}
            {" views"} • {moment(video.snippet.publishedAt).fromNow()}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",

            width: Dimensions.get("screen").width,
          }}
        >
          <View style={styles.viewIcon}>
            <SimpleLineIcons name="like" size={36} color={iconColor} />
            <Text style={{ ...styles.textStyle, color: iconColor }}>
              {roundoff(data[0].statistics.likeCount)}
            </Text>
          </View>
          <View style={styles.viewIcon}>
            <SimpleLineIcons name="dislike" size={36} color={iconColor} />
            <Text style={{ ...styles.textStyle, color: iconColor }}>
              {roundoff(data[0].statistics.dislikeCount)}
            </Text>
          </View>
          <View style={styles.viewIcon}>
            <MaterialCommunityIcons
              name="comment-multiple-outline"
              size={36}
              color={iconColor}
            />
            <Text style={{ ...styles.textStyle, color: iconColor }}>
              {roundoff(data[0].statistics.commentCount) || 0}
            </Text>
          </View>
        </View>
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.replace("playlist", {
              data: data[0].snippet,
            })
          }
        >
          <View style={{ ...styles.channelTitle, borderColor: iconColor }}>
            <MaterialCommunityIcons
              style={{ marginRight: 5 }}
              name="youtube-tv"
              size={36}
              color={iconColor}
            />
            <Text
              style={{
                fontSize: 16,
                color: iconColor,
                ...styles.fontStyle,
                fontFamily: "PoppinsRegular",
              }}
            >
              {video.snippet.channelTitle}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" style={{ marginTop: 12 }} color="red" />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  fontStyle: {
    width: Dimensions.get("screen").width - 40,
  },
  textStyle: { fontSize: 14, fontFamily: "PoppinsLight" },
  viewIcon: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    opacity: 0.6,
  },
  channelTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 10,
    display: "flex",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    paddingHorizontal: 10,
  },
});
export default video;
