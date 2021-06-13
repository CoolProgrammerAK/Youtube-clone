import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useTheme } from "@react-navigation/native";

import { MaterialIcons } from "@expo/vector-icons";
import Card from "./card";

import {API} from '../../api_key'
export default function Playlist({
  route: {
    params: { data },
  },
  navigation,
}) {
  const { colors } = useTheme();
  const [item, setitem] = React.useState([]);
  React.useEffect(() => {
    const fetchplaylist = async (dataa) => {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=${dataa.channelId}&maxResults=50&key=${API}`
      );
      const dataaa = await res.json();
      setitem(dataaa.items);
    };

    fetchplaylist(data);
  }, []);
  if (item != undefined) {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{ ...styles.searchStyle, backgroundColor: colors.headerColor }}
        >
          <MaterialIcons
            name={"arrow-back"}
            color={colors.iconColor}
            size={36}
            onPress={() => navigation.goBack()}
          />
          <Text
            style={{
              color: colors.iconColor,
              ...styles.font,
            }}
          >
            Channel Playlist
          </Text>
        </View>
        {item.length == 0 ? (
           <View style={styles.view}> 
           <Text style={styles.text}> Playlist empty</Text> 
            </View>
        ) : (
          <FlatList
            data={item}
            renderItem={({ item }) => {
              return <Card video={item}  />;
            }}
            keyExtractor={(item) => item.id}
          ></FlatList>
        )}
      </View>
    );
  } else {
    return (
      <View
        style={{
          alignItems: "center",
          marginVertical: 5,
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size="large" color="red" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  searchStyle: {
    height: 50,
    paddingHorizontal: 6,
    flexDirection: "row",
    elevation: 4,
    alignItems: "center",
  },
  font: {
    fontSize: 20,
    marginLeft: 5,
    fontFamily: "Oswald",
    fontWeight: "600",
  },  text:{ margin: 8, fontSize: 20, fontFamily: "PoppinsRegular" },
  view:{margin:15,alignItems:'center',justifyContent:'center',height:100,
  backgroundColor:'white',borderRadius:10}
});
