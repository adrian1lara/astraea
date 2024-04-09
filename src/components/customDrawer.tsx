import React, {useEffect} from 'react';
import Text from './text';
import {storage} from '../utils/mmkvStorage';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';

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
      <DrawerItemList {...props} />
      <DrawerItem
        label={() => (
          <Text variant={'body'}>{isDarkMode ? 'dark' : 'light'}</Text>
        )}
        onPress={toggleDarkMode}
        {...props}
      />
    </DrawerContentScrollView>
  );
};
