import React, {useEffect} from 'react';
import {storage} from '../utils/mmkvStorage';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {drawerThemeItem} from './customItemTheme';

type CustomDrawerProps = {
  props: DrawerContentComponentProps;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
};

export const CustomDrawerContent = ({
  props,
  isDarkMode,
  setIsDarkMode,
}: CustomDrawerProps) => {
  useEffect(() => {
    const getInitial = async () => {
      const storeMode = storage.getBoolean('isDarkMode');
      setIsDarkMode(storeMode ?? false);
    };

    getInitial();
  }, [setIsDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    storage.set('isDarkMode', !isDarkMode);
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={() => drawerThemeItem({isDarkMode})}
        onPress={toggleDarkMode}
        {...props}
      />
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
