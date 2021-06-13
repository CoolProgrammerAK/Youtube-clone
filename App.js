import React from 'react';
import Video from './src/screens/video'
import {combineReducers} from 'redux'
import Home from './src/screens/home'
import {NavigationContainer,DarkTheme,DefaultTheme,useTheme} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Search from './src/screens/search'
import Explore from './src/screens/explore'
import {ActivityIndicator, StatusBar} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {useFonts} from 'expo-font'
import reducer from './src/reducer/reducer'
import darktheme from './src/reducer/themereducer'
import {useSelector} from 'react-redux'
import Playlist from './src/screens/playlist';
const rootreducer=combineReducers({
  card:reducer,
  theme:darktheme
})
const store=createStore(rootreducer)
const Stack=createStackNavigator()
const Bottom=createBottomTabNavigator()

const Theme={
  ...DarkTheme,
  colors:{
    ...DarkTheme.colors,
    headerColor:"#404040", iconColor:"white",tabIcon:'white'
  }
}
const Defaulttheme={
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    headerColor:"white",
    iconColor:"black",tabIcon:'red'
  }
}


const Roothome=()=>{
  const {colors}=useTheme()
  return (
    <Bottom.Navigator  screenOptions={({ route }) => ({
      tabBarIcon: ({  color}) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
        } else if (route.name === 'Recent') {
          iconName = 'explore';
        }
        
        return <MaterialIcons name={iconName} size={32} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: colors.tabIcon,
      inactiveTintColor: 'gray',
    }}>
      <Bottom.Screen  name="Home" component={Home}></Bottom.Screen>
      <Bottom.Screen  name="Recent" component={Explore}></Bottom.Screen>
    </Bottom.Navigator>
  )
}

export default ()=>{
  let [fontsLoaded] = useFonts({
    'Oswald': require('./assets/fonts/Oswald-VariableFont_wght.ttf'),
    'PoppinsLight': require('./assets/fonts/Poppins-Light.ttf'),
    'PoppinsMedium': require('./assets/fonts/Poppins-Medium.ttf'),
    'PoppinsRegular': require('./assets/fonts/Poppins-Regular.ttf'),
    'PoppinsBold': require('./assets/fonts/Poppins-Bold.ttf'),
  });
  if (!fontsLoaded) {
    return <ActivityIndicator size="large" style={{flex:1,justifyContent:'center',alignItems:'center'}} color="red"/>;
  } else {
  return(
    <Provider store={store}>
      <Navigation/>
      </Provider>
  )}
}
export function Navigation() {
  let mytheme= useSelector(state => state.theme.dark)
  return (
    <>
    <StatusBar backgroundColor="black" barStyle="light-content"></StatusBar>
    <NavigationContainer theme={mytheme?Theme:Defaulttheme}>
      <Stack.Navigator headerMode="none"  >
        <Stack.Screen name="roothome" component={Roothome}></Stack.Screen>
        <Stack.Screen name="search" component={Search}></Stack.Screen>
        <Stack.Screen name="video" component={Video}></Stack.Screen>
        <Stack.Screen name="playlist" component={Playlist}></Stack.Screen>
      </Stack.Navigator>
      {/* <StatusBar backgroundColor="black" barStyle="light-content"></StatusBar> */}
    </NavigationContainer>
    </>
    
  );
}


