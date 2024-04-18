import React from 'react';
import Box from './box';
import Text from './text';
import {Pressable} from 'react-native';

type ModalChildrenProps = {
  name: string;
  removeCategory: (value: string) => void;
};

export const CategoryModalChildren: React.FC<ModalChildrenProps> = ({
  name,
  removeCategory,
}) => (
  <Box backgroundColor={'mainBackground'} height={'100%'}>
    <Text variant={'subheader'} p={'m'} marginHorizontal={'m'}>
      {name ? name : 'some randome'}
    </Text>

    <Box
      borderWidth={1}
      p={'m'}
      mb={'s'}
      marginHorizontal={'m'}
      borderRadius={6}
      borderColor={'secondaryText'}>
      <Pressable onPress={() => console.log('edit')}>
        <Text variant={'body'}>Edit</Text>
      </Pressable>
    </Box>
    <Box
      borderWidth={1}
      p={'m'}
      marginHorizontal={'m'}
      borderRadius={6}
      borderColor={'secondaryText'}>
      <Pressable onPress={() => removeCategory(name)}>
        <Text variant={'body'}>Delete</Text>
      </Pressable>
    </Box>
  </Box>
);
