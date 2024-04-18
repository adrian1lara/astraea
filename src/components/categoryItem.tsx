import React, {RefObject} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Box from './box';
import Text from './text';
import {Modalize} from 'react-native-modalize';

export type CategoryItemProps = {
  label: string;
  onPress: () => void;
  focused: boolean;
  modalizeRef: RefObject<Modalize>;
};

export const CategoryItem: React.FC<CategoryItemProps> = ({
  label,
  onPress,
  focused,
  modalizeRef,
}) => {
  const onOpenModal = () => {
    modalizeRef.current?.open();
    console.log(modalizeRef.current);
  };

  return (
    <Box
      backgroundColor={focused ? 'activeDrawerItem' : 'inactiveDrawerItem'}
      p={'sm'}
      m={'s'}
      marginBottom={'xs'}
      borderRadius={5}>
      <TouchableOpacity onPress={onPress} onLongPress={onOpenModal}>
        <Text variant={'body'}>{label}</Text>
      </TouchableOpacity>
    </Box>
  );
};
