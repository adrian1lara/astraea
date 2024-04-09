import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useContext} from 'react';
import Navigation from './index';
import {AppContext} from '../context/appContext';
import theme, {darkTheme} from '../themes/default';
import {CustomDrawerContent} from '../components/customDrawer';

const Drawer = createDrawerNavigator();

function Root(): React.JSX.Element {
  const {isDarkMode, setIsDarkMode} = useContext(AppContext);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: isDarkMode
            ? darkTheme.colors.mainBackground
            : theme.colors.mainBackground,
        },
        drawerLabelStyle: {
          color: isDarkMode
            ? darkTheme.colors.mainForeground
            : theme.colors.mainForeground,
        },
        drawerActiveTintColor: isDarkMode
          ? theme.colors.mainBackground
          : darkTheme.colors.mainBackground,
      }}
      drawerContent={props =>
        CustomDrawerContent({props, isDarkMode, setIsDarkMode})
      }>
      <Drawer.Screen name="HomeStack" component={Navigation} />
    </Drawer.Navigator>
  );
}

export default Root;
