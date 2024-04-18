import React, {useEffect, useState} from 'react';
import {storage} from '../utils/mmkvStorage';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {drawerThemeItem} from './customItemTheme';
import {AddCategory} from './addCategory';
import {InputCategory} from './inputCategory';
import {Title} from './headerTitle';
import CategorySwipeList from './categorySwipelist';
type CustomDrawerProps = {
  props: DrawerContentComponentProps;
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
};

export type CategoryArrayProp = {
  label: string;
};

export const CustomDrawerContent = ({
  props,
  isDarkMode,
  setIsDarkMode,
}: CustomDrawerProps) => {
  const [categories, setCategories] = useState<CategoryArrayProp[]>([]);
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

    const loadCategories = () => {
      try {
        const storedCategories = storage.getString('categories');
        if (storedCategories) {
          setCategories(JSON.parse(storedCategories));
          console.log(storedCategories);
        }
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };

    loadCategories();
  }, [setIsDarkMode]);

  useEffect(() => {
    const saveCategories = () => {
      try {
        storage.set('categories', JSON.stringify(categories));
      } catch (error) {
        console.error('Error saving categories:', error);
      }
    };

    // Save categories only when they actually change
    if (categories.length > 0) {
      saveCategories();
    }
  }, [categories]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    storage.set('isDarkMode', !isDarkMode);
  };

  const handleAddCategory = (label: string) => {
    if (label === '' || label === 'all') {
      return;
    }
    setCategories(prevCategories => [
      ...prevCategories,
      {
        label,
      },
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

  const removeCategory = (label: string) => {
    const newCategories = [...categories];
    const index = newCategories.findIndex(c => c.label === label);
    if (index !== -1) {
      newCategories.splice(index, 1);
      setCategories(newCategories);
    } else {
      // Handle the case where the label is not found (optional)
      console.warn(`Category with label "${label}" not found.`);
    }
  };

  return (
    <DrawerContentScrollView {...props} nestedScrollEnabled={true}>
      <DrawerItem
        label={() => drawerThemeItem({isDarkMode})}
        onPress={toggleDarkMode}
        {...props}
      />
      <DrawerItem
        focused={selectedCategory === 'All'}
        label={() => Title({textTitle: 'All'})}
        onPress={() => handleCategoryPress('All')}
        inactiveBackgroundColor="rgba(14, 205, 157, 0.07)"
        activeBackgroundColor="rgba(14, 205, 157, 0.30)"
      />
      {/* categories.map(category => (
        <CategoryItem
          key={uuid.v4().toString()}
          label={category.label}
          onPress={() => handleCategoryPress(category.label)}
          focused={selectedCategory === category.label}
        />
      )) */}
      <CategorySwipeList
        categories={categories}
        handleRemoveCategory={removeCategory}
        handleOnPressItem={handleCategoryPress}
        selectedItem={selectedCategory}
      />

      <InputCategory
        isOpen={isOpen}
        category={category}
        isDarkMode={isDarkMode}
        setCategory={setCategory}
        setIsOpen={setIsOpen}
        handleAddCategory={handleAddCategory}
      />
      {!isOpen && <AddCategory onPress={handleDisplayInput} />}
    </DrawerContentScrollView>
  );
};
