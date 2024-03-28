import React, {useState} from 'react';
import {TextInput} from 'react-native';
import Box from '../components/box';
import Text from '../components/text';

function FormScreen(): React.JSX.Element {
  const [name, setName] = useState('');
  return (
    <Box>
      <Text variant={'header'}>Home</Text>
      <TextInput value={name} onChangeText={setName} placeholder="name" />
    </Box>
  );
}

export default FormScreen;
