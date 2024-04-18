import React from 'react';
import Box from './box';
import Text from './text';

type ModalChildrenProps = {
  name: string | null;
};

export const CategoryModalChildren: React.FC<ModalChildrenProps> = ({name}) => (
  <Box backgroundColor={'mainBackground'}>
    <Text variant={'body'}>{name ? name : 'some randome'}</Text>
  </Box>
);
