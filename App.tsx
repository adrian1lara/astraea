import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './src/screens/home';
import FormScreen from './src/screens/form';
import StackParamList from './src/types/navigationTypes';
import {Button} from 'react-native';

const Stack = createNativeStackNavigator<StackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={() => ({
            headerTitle: 'Home',
            headerRight: () => <Button title="+" />,
          })}
        />
        <Stack.Screen name="Form" component={FormScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
