import React, {useEffect, useState} from 'react';
import {storage} from '../utils/mmkvStorage';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {drawerThemeItem} from './customItemTheme';
import {CategoryItem, CategoryItemProps} from './categoryItem';
import {AddCategory} from './addCategory';
import uuid from 'react-native-uuid';
import {InputCategory} from './inputCategory';
import {Title} from './headerTitle';

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
  const [categories, setCategories] = useState<CategoryItemProps[]>([]);
  const [category, setCategory] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    'All',
  );

  useEffect(() => {
    const getInitial = () => {
      const storeMode = storage.getBoolean('isDarkMode');
      setIsDarkMode(storeMode ?? false);
    };

    getInitial();
  }, [setIsDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    storage.set('isDarkMode', !isDarkMode);
  };

  const handleAddCategory = (label: string, onPress: () => void) => {
    if (label === '' || label === 'all') {
      return;
    }
    setCategories(prevCategories => [
      ...prevCategories,
      {label, onPress, focused: selectedCategory === label},
    ]);
    setIsOpen(!isOpen);
  };

  const handleDisplayInput = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryPress = (label: string) => {
    setSelectedCategory(label);
    props.navigation.navigate('HomeScreen', {category: label});
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        label={() => drawerThemeItem({isDarkMode})}
        onPress={toggleDarkMode}
        {...props}
      />
      <DrawerItem
        focused={selectedCategory === 'All'}
        label={() => Title({textTitle: 'All'})}
        onPress={() => handleCategoryPress('All')}
      />
      {categories.map(category => (
        <CategoryItem
          key={uuid.v4().toString()}
          label={category.label}
          onPress={category.onPress}
          focused={selectedCategory === category.label}
        />
      ))}
      <InputCategory
        isOpen={isOpen}
        category={category}
        isDarkMode={isDarkMode}
        setCategory={setCategory}
        setIsOpen={setIsOpen}
        handleAddCategory={handleAddCategory}
        HandleCategoryPress={handleCategoryPress}
      />

      {!isOpen && <AddCategory onPress={handleDisplayInput} />}
    </DrawerContentScrollView>
  );
};
