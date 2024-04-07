import React, {useContext} from 'react';
import {AppContext} from '../context/appContext';
import Switcher from './switcher';
import Box from './box';
import Text from './text';

const CustomDrawerContent = () => {
  const {isDarkMode, setIsDarkMode} = useContext(AppContext);
  return (
    <Box m={'s'}>
      <Text variant={'body'}>{isDarkMode ? 'Dark' : 'White'}</Text>
      <Switcher isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </Box>
  );
};

export default CustomDrawerContent;
