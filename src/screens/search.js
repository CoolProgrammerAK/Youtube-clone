import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {  MaterialIcons } from "@expo/vector-icons";
import Minicard from "./minicard";
import { useDispatch } from "react-redux";

import {API} from '../../api_key'
import {  useTheme } from "@react-navigation/native";

const Search = ({ navigation }) => {
  const [value, setvalue] = useState("");
  const { colors } = useTheme();
  const iconColor = colors.iconColor;
  const dispatch = useDispatch();
  const [dataa, setdata] = useState([]);

  const [loading, setloading] = useState(false);

  const fetchdata = () => {
    setloading(true);
    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${value}&videoEmbeddable=true&type=video&key=${API}`
    )
      .then((res) => res.json())
      .then((data) => {
        setloading(false);
        setdata(data.items);
      });
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{ ...styles.searchStyle, backgroundColor: colors.headerColor }}
      >
        <MaterialIcons
          name={"arrow-back"}
          color={iconColor}
          size={36}
          onPress={() => navigation.goBack()}
        />

        <TextInput
          selectionColor="red"
          placeholder="Search YouTube"
          placeholderTextColor="#707070"
          blurOnSubmit={true}
          autoFocus={true}
          onSubmitEditing={fetchdata}
          style={styles.inputStyle}
          onChangeText={(text) => setvalue(text)}
          value={value}
        ></TextInput>
        <MaterialIcons
          name="search"
          size={36}
          color={iconColor}
          onPress={fetchdata}
        />
      </View>
      {loading ? (
        <View style={{ alignItems: "center", marginVertical: 5 }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : null}
  
        <FlatList
          style={{ marginVertical: 6 }}
          data={dataa}
          renderItem={({ item }) => {
            return <Minicard video={item} />;
          }}
          keyExtractor={(item) => item.id.videoId}
        />
      
    </View>
  );
};

const styles = StyleSheet.create({
  searchStyle: {
    height: 50,
    paddingHorizontal: 6,
    flexDirection: "row",
    justifyContent: "space-around",
    elevation: 1,
    alignItems: "center",
  },
  inputStyle: {
    width: "70%",
    height: 39,
    backgroundColor: "#F0F0F0",
    paddingHorizontal: 15,
    fontSize: 16,
    borderRadius: 25,
  },
});

export default Search;
