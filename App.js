import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListProducts from "./src/Views/ListProducts";
import CreateProduct from "./src/Views/CreateProduct";
import EditProduct from "./src/Views/EditProduct";
import Start from "./src/Views/Start";
import { Provider } from "react-redux";
import store from "./src/components/redux/store/store";


const Stack = createNativeStackNavigator();

export default function App() {

  return (

    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="start">
          <Stack.Screen name="start" options={{headerShown: false}} component={Start}/>
          <Stack.Screen name="home" options={{headerShown: false}} component={ListProducts}/>
          <Stack.Screen name="create" options={{headerTintColor: 'white', headerStyle: {backgroundColor: '#1e0c42'}, title: 'Agregar un producto nuevo'}} component={CreateProduct}/>
          <Stack.Screen name="edit" options={{headerTintColor: 'white', headerStyle: {backgroundColor: '#1e0c42'}, title: 'Editar producto'}} component={EditProduct}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
