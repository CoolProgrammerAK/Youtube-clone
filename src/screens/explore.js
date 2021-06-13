import React from "react";
import { Text, View, FlatList, StyleSheet, Animated } from "react-native";
import Header from "./header";
import Card from "./card";
import { useSelector } from "react-redux";

const explore = () => {
  const minicard = useSelector((state) => state.card.data);
  const scrollY = new Animated.Value(0);
  const diffclamp = Animated.diffClamp(scrollY, 0, 50);
  const margintop = diffclamp.interpolate({
    inputRange: [0, 50],
    outputRange: [50, 0],
  });
  return (
    <View style={{ flex: 1 }}>
      <Header scrollY={scrollY}/>
      <Animated.View style={{marginTop:margintop}}>
      {minicard.length == 0 ? (
        <View style={styles.view}>
          <Text style={styles.text}> No recent videos</Text>
        </View>
      ) : (
          <FlatList
         onScroll={(e) => {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}
            data={minicard}
            renderItem={({ item }) => {
              return <Card video={item} />;
            }}
            keyExtractor={(item) => item.id.videoId || item.id}
          />
      )}
      </Animated.View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: { margin: 8, fontSize: 20, fontFamily: "PoppinsRegular" },
  view: {
    margin: 15,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
export default explore;
