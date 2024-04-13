import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './types';
import HomeScreen from '../screens/home';
import React, {useContext} from 'react';
import FormScreen from '../screens/form';
import {AppContext} from '../context/appContext';
import theme, {darkTheme} from '../themes/default';
import {Title} from '../components/headerTitle';
const Stack = createNativeStackNavigator<RootStackParamList>();
function Navigation(): React.JSX.Element {
  const {isDarkMode} = useContext(AppContext);

  const textTitle = 'Astraea';
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: isDarkMode
            ? darkTheme.colors.mainBackground
            : theme.colors.mainBackground,
        },
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
          headerTitle: () => Title({textTitle}),
          headerShadowVisible: false,
        }}
        initialParams={{category: 'All'}}
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
