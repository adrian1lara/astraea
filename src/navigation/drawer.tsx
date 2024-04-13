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
      }}
      drawerContent={props =>
        CustomDrawerContent({props, isDarkMode, setIsDarkMode})
      }>
      <Drawer.Screen
        name="All"
        component={Navigation}
        initialParams={{category: 'All'}}
      />
    </Drawer.Navigator>
  );
}

export default Root;
