import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import HomeScreen from '../screens/home';
import React from 'react';
import FormScreen from '../screens/form';

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigation(): React.JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="CreateExpenseScreen"
        component={FormScreen}
        options={{
          headerBackTitle: 'back',
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}

export default Navigation;
