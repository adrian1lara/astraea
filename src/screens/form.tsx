import React, {useState} from 'react';
import {Button, StyleSheet, TextInput} from 'react-native';
import Box from '../components/box';
import Text from '../components/text';

function FormScreen(): React.JSX.Element {
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');

  const handleAdd = () => {
    console.log(name, cost);
  };

  return (
    <Box padding={'m'}>
      <Text variant={'header'}>Home</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="name"
      />
      <TextInput
        style={styles.input}
        value={cost}
        onChangeText={setCost}
        placeholder="cost"
      />

      <Button title="add" onPress={handleAdd} />
    </Box>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 2,
    borderWidth: 1,
    margin: 5,
    borderRadius: 5,
    fontSize: 20,
  },
});

export default FormScreen;
