import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  NavigationContainer,
  NavigationProp,
  RouteProp,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./app/screens/HomeScreen";
import NewProductScreen from "./app/screens/NewProductScreen";
import ProductDetailScreen from "./app/screens/ProductDetailScreen";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AntDesign } from "@expo/vector-icons";

type RootStackParamList = {
  Home: undefined;
  NewProduct: undefined;
  ProductDetail: { id: string };
};

export type StackNavigationProp = NavigationProp<RootStackParamList>;

export type HomeScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Home"
>;
export type NewProductScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "NewProduct"
>;
export type ProductDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ProductDetail"
>;

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootStackNavigation = () => {
  return (
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: HomeScreenProps) => ({
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("NewProduct")}>
              <AntDesign name="pluscircle" size={22} />
            </TouchableOpacity>
          ),
        })}
      />
      <RootStack.Screen
        name="NewProduct"
        component={NewProductScreen}
        options={{ presentation: "modal" }}
      />
      <RootStack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </RootStack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <RootStackNavigation />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
