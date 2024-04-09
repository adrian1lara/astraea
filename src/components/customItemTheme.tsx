import Text from './text';
import IconDark from 'react-native-vector-icons/MaterialIcons';
import IconLight from 'react-native-vector-icons/Entypo';
import Box from './box';
import React from 'react';

type themeItemProp = {
  isDarkMode: boolean;
};
export const drawerThemeItem = ({
  isDarkMode,
}: themeItemProp): React.JSX.Element => {
  return (
    <Box>
      {isDarkMode ? (
        <Box flexDirection={'row'}>
          <Text variant={'body'} marginRight={'s'}>
            <IconDark name="dark-mode" size={20} />
          </Text>
          <Text variant={'body'}>Dark</Text>
        </Box>
      ) : (
        <Box flexDirection={'row'}>
          <Text variant={'body'} marginRight={'s'}>
            <IconLight name="light-up" size={20} />
          </Text>
          <Text variant={'body'}>Light</Text>
        </Box>
      )}
    </Box>
  );
};
