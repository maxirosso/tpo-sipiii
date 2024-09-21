import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import your screens
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import CardListScreen from './screens/CardListScreen';
import TradeScreen from './screens/TradeScreen';
import FavoritosScreen from './screens/FavoritosScreen';
import MarketplaceScreen from './screens/MarketplaceScreen';
import PerfilScreen from './screens/PerfilScreen';

// Create stack and tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Create a tab navigator for Colecciones, Favoritos, Marketplace, Perfil
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          // Assign correct icon for each tab
          if (route.name === 'Colecciones') {
            iconName = focused ? 'albums' : 'albums-outline'; // Ionicons for collection
          } else if (route.name === 'Favoritos') {
            iconName = focused ? 'heart' : 'heart-outline'; // Ionicons for favorites
          } else if (route.name === 'Marketplace') {
            iconName = focused ? 'storefront' : 'storefront-outline'; // Ionicons for marketplace
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline'; // Ionicons for profile
          }

          // Return the Ionicons component
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="Colecciones" 
        component={CardListScreen} 
        options={{ tabBarLabel: 'Colecciones' }} 
      />
      <Tab.Screen name="Favoritos" component={FavoritosScreen} />
      <Tab.Screen name="Marketplace" component={MarketplaceScreen} />
      <Tab.Screen name="Perfil" component={PerfilScreen} />
    </Tab.Navigator>
  );
}

// Create the stack navigator, with login and registration screens
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Trade" component={TradeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
