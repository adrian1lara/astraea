import {CategoryItem} from './categoryItem';
import {FlatList} from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import React, {useRef} from 'react';
import {CategoryArrayProp} from './customDrawer';
import Box from './box';
import {Modalize} from 'react-native-modalize';
import {CategoryModal} from './categoryModal';
import {CategoryModalChildren} from './CategoryModalChildren';

type Props = {
  categories: CategoryArrayProp[];
  handleRemoveCategory: (label: string) => void;
  handleOnPressItem: (label: string) => void;
  selectedItem: string | null;
};

export default function CategorySwipeList({
  categories,
  handleOnPressItem,
  selectedItem,
}: Props): React.JSX.Element {
  const modalizeRef = useRef<Modalize>(null);

  return (
    <Box>
      <FlatList
        scrollEnabled={false}
        data={categories}
        renderItem={({item}) => (
          <CategoryItem
            key={uuid.v4().toString()}
            label={item.label}
            onPress={() => handleOnPressItem(item.label)}
            focused={selectedItem === item.label}
            modalizeRef={modalizeRef}
          />
        )}
      />
      <CategoryModal modalizeRef={modalizeRef}>
        <CategoryModalChildren name={selectedItem} />
      </CategoryModal>
    </Box>
  );
}
