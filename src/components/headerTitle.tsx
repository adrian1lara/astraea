import React from 'react';
import Text from './text';

type TitleProps = {
  textTitle: string;
};

export const Title: React.FC<TitleProps> = ({textTitle}) => (
  <Text variant={'body'}>{textTitle}</Text>
);
