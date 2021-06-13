import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Animated,
  View,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  PanResponder,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import {
  EvilIcons,
  SimpleLineIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
export default function Model({ modalVisible, setModalVisible, data }) {
  const { colors } = useTheme();
  const iconColor = colors.iconColor;
  const height = new Animated.ValueXY({ x: 0, y: 355 });
  const heightResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: () => {
      height.setOffset({ y: height.y._value, x: height.x._value });
    },
    onPanResponderMove: (event, gesture) => {
      if (gesture.moveY < 40 || gesture.moveY > 355) {
        height.setValue({ x: gesture.dx, y: height.y._value });
      } else {
        height.setValue({ x: gesture.dx, y: -gesture.dy });
      }
    },
    onPanResponderRelease: () => {
      height.flattenOffset();
    },
  });
 const roundoff=(e)=>{
    var v=parseInt(e);
    var kvideos=v/1000;
    if (kvideos>=1) {
      if(kvideos<1000){
        return kvideos.toFixed(0).toString() + "K"
       }
       else{
        kvideos=kvideos/1000;
         return kvideos.toFixed(0).toString() + "M"
       }
    }
    else{
      return e
    }
    

  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <Animated.View
            style={{
              ...styles.modalView,
              backgroundColor: colors.headerColor,
              height: height.y,
            }}
          >
            <View style={styles.descContainer} {...heightResponder.panHandlers}>
              <View
                style={{
                  width: 40,
                  height: 4,
                  backgroundColor: "rgb(222,223,214)",
                  borderRadius: 8,
                  margin: 10,
                  alignSelf: "center",
                }}
              ></View>
              <View style={styles.desc}>
                <Text
                  style={{
                    ...styles.modalText,
                    color: iconColor,
                  }}
                >
                  Description
                </Text>
                <TouchableWithoutFeedback
                  onPress={() => setModalVisible(false)}
                >
                  <EvilIcons
                    name="close"
                    size={30}
                    color={iconColor}
                  ></EvilIcons>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <ScrollView style={{ flexDirection: "column" }}>
              <View style={styles.textmodal}>
                <Text
                  style={{
                    ...styles.modalText,
                    color: iconColor,
                    fontFamily: "PoppinsMedium",
                  }}
                >
                  {data[0].snippet.title}
                </Text>
              </View>
              <View style={styles.iconview}>
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
                    {roundoff(data[0].statistics.commentCount)}
                  </Text>
                </View>
                
              </View>
              <View style={{  paddingVertical: 15,paddingHorizontal:16 }}>
                  <Text
                    style={{ fontSize: 14, lineHeight: 24, color: iconColor }}
                  >
                    {data[0].snippet.description}
                  </Text>
                </View>
            </ScrollView>
          </Animated.View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    width: Dimensions.get("screen").width,
  },
  modalView: {
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  descContainer: {
    borderTopStartRadius: 25,
    borderTopEndRadius: 25,
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    elevation: 2,
  },
  desc: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  textmodal: {
    padding: 15,
  },
  iconview: {
    marginLeft: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: Dimensions.get("screen").width - 20,
    borderBottomWidth: 1,
    borderColor: "rgb(222,223,214)",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 16,
    fontFamily: "PoppinsRegular",
  },
  textStyle: { fontSize: 14, fontFamily: "PoppinsLight" },
  viewIcon: {
    flexDirection: "column",
    alignItems: "center",
  },
});
