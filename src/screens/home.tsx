import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import {Button, StyleSheet, Text} from 'react-native';
import {RootStackParamList} from '../navigation/types';
import ListView from '../components/listView';
import Box from '../components/box';

type Props = NativeStackScreenProps<RootStackParamList>;
function HomeScreen({navigation}: Props): React.JSX.Element {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="+"
          onPress={() => navigation.navigate('CreateExpenseScreen')}
        />
      ),
    });
  }, [navigation]);

  return (
    <Box
      flex={1}
      backgroundColor={'mainBackground'}
      alignItems={'center'}
      borderColor={'cardPrimaryBackground'}
      borderWidth={1}>
      <Text style={styles.text}>Home</Text>
      <ListView />
    </Box>
  );
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontSize: 42,
    fontWeight: '100',
    textAlign: 'center',
  },
});

export default HomeScreen;
