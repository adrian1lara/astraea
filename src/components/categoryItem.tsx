import {DrawerItem} from '@react-navigation/drawer';
import React from 'react';
import {Title} from './headerTitle';

export type CategoryItemProps = {
  label: string;
  onPress: () => void;
  focused: boolean;
};

export const CategoryItem: React.FC<CategoryItemProps> = ({
  label,
  onPress,
  focused,
}) => (
  <DrawerItem
    label={() => Title({textTitle: label})}
    onPress={onPress}
    focused={focused}
    inactiveBackgroundColor="rgba(14, 205, 157, 0.07)"
    activeBackgroundColor="rgba(14, 205, 157, 0.20)"
  />
);
