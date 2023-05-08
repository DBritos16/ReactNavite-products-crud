import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListProducts from "./src/Views/ListProducts";
import CreateProduct from "./src/Views/CreateProduct";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen name="home" component={ListProducts}/>
        <Stack.Screen name="create" component={CreateProduct}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
