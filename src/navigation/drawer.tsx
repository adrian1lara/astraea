import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React, {useContext} from 'react';
import Navigation from './index';
import CustomDrawerContent from '../components/customDrawer';
import {AppContext} from '../context/appContext';
import theme, {darkTheme} from '../themes/default';

const Drawer = createDrawerNavigator();

function Root(): React.JSX.Element {
  const {isDarkMode} = useContext(AppContext);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: isDarkMode
            ? darkTheme.colors.mainBackground
            : theme.colors.mainBackground,
        },
        drawerActiveTintColor: isDarkMode
          ? theme.colors.mainBackground
          : darkTheme.colors.mainBackground,
      }}
      drawerContent={props => {
        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <CustomDrawerContent />
          </DrawerContentScrollView>
        );
      }}>
      <Drawer.Screen name="HomeStack" component={Navigation} />
    </Drawer.Navigator>
  );
}

export default Root;
