import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/themes/default';
import Navigation from './src/navigation';

function App(): React.JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
