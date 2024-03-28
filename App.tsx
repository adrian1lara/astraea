import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from './src/screens/home';
import FormScreen from './src/screens/form';
import StackParamList from './src/types/navigationTypes';
import {Button} from 'react-native';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/themes/default';

const Stack = createNativeStackNavigator<StackParamList>();

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={() => ({
              headerTransparent: true,
              title: '',
              headerRight: () => <Button title="+" />,
            })}
          />
          <Stack.Screen name="Form" component={FormScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
