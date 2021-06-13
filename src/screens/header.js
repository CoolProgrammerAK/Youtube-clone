import React from "react";
import { StyleSheet, Text, View,Animated } from "react-native";
import { Feather, MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
function header({scrollY}) {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.dark);

  const diffclamp = Animated.diffClamp(scrollY, 0, 50);
  const translatey = diffclamp.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
  });
  return (
    <Animated.View 
      style={{ ...styles.headerStyle,transform: [{ translateY: translatey }], backgroundColor: colors.headerColor }}
    >
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <AntDesign name="youtube" size={32} color="red" />
        <Text
          style={{
            fontSize: 20,
            marginLeft: 5,
            marginBottom: 4,
            color: colors.iconColor,
            fontFamily: "Oswald",
            fontWeight: "600",
          }}
        >
          YouTube
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          width: 130,
          alignItems: "center",
        }}
      >
        <Feather
          name="video"
          size={28}
          style={{ ...styles.iconFont, opacity: 0 }}
          color={colors.iconColor}
        />

        <Feather
          name="search"
          onPress={() => navigation.navigate("search")}
          size={28}
          color={colors.iconColor}
        />
        <MaterialCommunityIcons
          name="theme-light-dark"
          size={28}
          style={styles.iconFont}
          color={colors.iconColor}
          onPress={() =>
            dispatch({
              type: "THEME",
              payload: !theme,
            })
          }
        />
      </View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  headerStyle: {
    height: 50,
    paddingHorizontal: 15,
    paddingVertical: 5,
    left: 0, zIndex: 66,
    elevation: 5,
    right: 0, position: "absolute",
    top: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  iconFont: {
    fontFamily: "PoppinsLight",
    fontWeight: "100",
  },
});
export default header;
