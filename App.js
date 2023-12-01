import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/screens/LoginScreen';
import HomeScreen from './components/screens/HomeScreen';
import CreateTaskScreen from './components/screens/CreateTaskScreen';
import HistoryScreen from './components/screens/HistoryScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import CongratsScreen from './components/screens/CongratsScreen';
import CreateUserScreen from './components/screens/CreateUserScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "",
            headerStyle: {
              backgroundColor: '#6750A4',
            },
            headerTintColor: '#6750A4',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#6750A4'
            },
          }}
        />
        <Stack.Screen
          name='CreateTask'
          component={CreateTaskScreen}
          options={{ title: "Criar nova tarefa" }}
        />
        <Stack.Screen
          name="History"
          component={HistoryScreen}
          options={{
            title: "Histórico",
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: '#6750A4',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#6750A4'
            },
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: "Seu Perfil",
            headerStyle: {
              backgroundColor: 'white',
            },
            headerTintColor: '#6750A4',
            headerTitleStyle: {
              fontWeight: 'bold',
              color: '#6750A4'
            },
          }}
        />
        <Stack.Screen
          name="Congrats"
          component={CongratsScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="CreateUser"
          component={CreateUserScreen}
          options={{ title: "Criar novo usuário" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


