import {RootStackParamList} from '../navigation/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DrawerActions} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Box from './box';
import Text from './text';
import Icon from 'react-native-vector-icons/Octicons';
import React from 'react';

type ButtonProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;
};

export const BarsButton: React.FC<ButtonProps> = ({navigation}) => (
  <Box>
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
      <Text variant={'body'} color={'cardSecondaryBackground'}>
        <Icon name="three-bars" size={25} />
      </Text>
    </TouchableOpacity>
  </Box>
);
