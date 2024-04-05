import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import HomeScreen from '../screens/home';
import React, {useContext} from 'react';
import FormScreen from '../screens/form';
import {AppContext} from '../context/appContext';
import theme, {darkTheme} from '../themes/default';
import Text from '../components/text';

const Stack = createNativeStackNavigator<RootStackParamList>();
function Navigation(): React.JSX.Element {
  const {isDarkMode} = useContext(AppContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode
            ? darkTheme.colors.mainBackground
            : theme.colors.mainBackground,
        },
      }}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: () => <Text variant={'body'}>Astraea</Text>,
          headerShadowVisible: false,
        }}
      />
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
