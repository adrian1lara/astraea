import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import Box from './box';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';

type InputCategoryProps = {
  isOpen: boolean;
  isDarkMode: boolean;
  category: string;
  setCategory: (value: string) => void;
  setIsOpen: (value: boolean) => void;
  handleAddCategory: (value: string, onPress: () => void) => void;
  HandleCategoryPress: (value: string) => void;
};

export const InputCategory: React.FC<InputCategoryProps> = ({
  isOpen,
  isDarkMode,
  category,
  setCategory,
  setIsOpen,
  handleAddCategory,
  HandleCategoryPress,
}) => (
  <Box m={'s'}>
    <TextInput
      value={category}
      placeholder="Category"
      onChangeText={setCategory}
      placeholderTextColor={'#AAAAAA'}
      style={{
        display: isOpen ? 'flex' : 'none',
        color: isDarkMode ? '#fff' : '#000',
        padding: 8,
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 10,
        fontSize: 16,
        borderColor: '#AAAAAA',
      }}
    />
    <Box
      alignItems={'center'}
      flexDirection={'row'}
      justifyContent={'flex-end'}
      style={{
        display: isOpen ? 'flex' : 'none',
      }}>
      <Box backgroundColor={'cardSecondaryBackground'} borderRadius={5} p={'s'}>
        <FontIcon
          name="check"
          color={'white'}
          size={20}
          onPress={() => {
            handleAddCategory(category, () => HandleCategoryPress(category));
            setCategory('');
          }}
        />
      </Box>
      <Box backgroundColor={'delete'} borderRadius={5} ml={'s'} p={'s'}>
        <TouchableOpacity
          onPress={() => {
            setIsOpen(!isOpen);
            setCategory('');
          }}>
          <FontIcon name="close" size={20} color={'white'} />
        </TouchableOpacity>
      </Box>
    </Box>
  </Box>
);
