import React from 'react';
import {Title} from './headerTitle';
import Box from './box';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const AddCategory: React.FC<{onPress: () => void}> = ({onPress}) => (
  <Box
    borderColor={'secondaryText'}
    alignItems={'center'}
    borderWidth={1}
    alignContent={'center'}
    p={'s'}
    m={'s'}
    borderRadius={5}>
    <TouchableOpacity onPress={onPress}>
      <Title textTitle="Add Category" />
    </TouchableOpacity>
  </Box>
);
