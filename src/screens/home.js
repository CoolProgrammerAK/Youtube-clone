import React from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Animated,
  SafeAreaView,
} from "react-native";
import Header from "./header";
import Card from "./card";
import {API} from '../../api_key'
function Home() {
  const [data, setdata] = React.useState([]);
  const [loading, setloading] = React.useState(false);
  const scrollY = new Animated.Value(0);
  
  const diffclamp = Animated.diffClamp(scrollY, 0, 50);
  const margintop = diffclamp.interpolate({
    inputRange: [0, 50],
    outputRange: [50, 0],
  });
  React.useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = () => {
    setloading(true);
    fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&maxResults=50&chart=mostPopular&regionCode=IN&key=${API}`
    )
      .then((res) => res.json())
      .then((data) => {
        setdata(data.items);
        setloading(false);
      });
  };
 

  return (
    <SafeAreaView style={{ flex: 1 }}>
    
        <Header scrollY={scrollY}/>
        <Animated.View style={{marginTop:margintop}}>
      {loading ? (
        <View
          style={{
            alignItems: "center",
            marginVertical: 5,
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
          onScroll={(e) => {
            scrollY.setValue(e.nativeEvent.contentOffset.y);
          }}
          data={data}
          renderItem={({ item }) => {
            return <Card video={item} />;
          }}
          keyExtractor={(item) => item.id}
        />
      )}
      </Animated.View>
    </SafeAreaView>
  );
}
export default Home;
