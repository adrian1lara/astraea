import React, {useContext, useEffect} from 'react';
import {AppContext} from '../context/appContext';
import Switcher from './switcher';
import Box from './box';
import Text from './text';
import {storage} from '../utils/mmkvStorage';

const CustomDrawerContent = () => {
  const {isDarkMode, setIsDarkMode} = useContext(AppContext);

  useEffect(() => {
    const getInitial = async () => {
      const storeMode = storage.getBoolean('isDarkMode');
      setIsDarkMode(storeMode ?? false);
    };

    getInitial();
  }, [setIsDarkMode]);

  return (
    <Box m={'s'}>
      <Text variant={'body'}>{isDarkMode ? 'Dark' : 'White'}</Text>
      <Switcher isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </Box>
  );
};

export default CustomDrawerContent;
