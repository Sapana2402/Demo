import { View } from "react-native";
// import {createStackNavigator} from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import SwipeUpWave from "../../SwipeUpCard";
import DetailsScreen from '../Details/DetailsScreen'
import Profile from "../Profile";
import RoadRoute from "../RoadRoute";

function Authenticate() {
    const Stack = createStackNavigator()
    return ( 
        <NavigationContainer>
            <Stack.Navigator initialRouteName="RoadRoute" screenOptions={{headerShown: false}}>
                <Stack.Screen name="SwipupDemo" component={SwipeUpWave}  />
                <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="RoadRoute" component={RoadRoute} />
            </Stack.Navigator>
        </NavigationContainer>
     );
}

export default Authenticate;