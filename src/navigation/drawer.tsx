import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import React from 'react';
import Navigation from './index';
import CustomDrawerContent from '../components/customDrawer';

const Drawer = createDrawerNavigator();

function Root(): React.JSX.Element {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
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
