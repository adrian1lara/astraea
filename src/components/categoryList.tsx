import {CategoryItem} from './categoryItem';
import {FlatList} from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';
import React, {useContext, useRef, useState} from 'react';
import {CategoryArrayProp} from './customDrawer';
import Box from './box';
import {Modalize} from 'react-native-modalize';
import {CategoryModal} from './categoryModal';
import {CategoryModalChildren} from './categoryModalChildren';
import {AppContext} from '../context/appContext';

type Props = {
  categories: CategoryArrayProp[];
  handleRemoveCategory: (label: string) => void;
  handleOnPressItem: (label: string) => void;
  selectedItem: string;
};

export default function CategorySwipeList({
  categories,
  handleOnPressItem,
  selectedItem,
  handleRemoveCategory,
}: Props): React.JSX.Element {
  const modalizeRef = useRef<Modalize>(null);
  const {isDarkMode} = useContext(AppContext);
  const [longPressItem, setLongPressItem] = useState<string>('');

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
            setLongPressItem={setLongPressItem}
          />
        )}
      />
      <CategoryModal modalizeRef={modalizeRef} isDarkMode={isDarkMode}>
        <CategoryModalChildren
          name={longPressItem}
          removeCategory={handleRemoveCategory}
        />
      </CategoryModal>
    </Box>
  );
}
