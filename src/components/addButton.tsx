import {RootStackParamList} from '../navigation/types';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import Text from './text';
import Box from './box';

type ButtonProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;
  category: string;
};

export const AddButton: React.FC<ButtonProps> = ({navigation, category}) => (
  <Box>
    <TouchableOpacity
      onPress={() => navigation.navigate('CreateExpenseScreen', {category})}>
      <Text variant={'body'} color={'cardSecondaryBackground'}>
        <Icon name="add" size={25} />
      </Text>
    </TouchableOpacity>
  </Box>
);
