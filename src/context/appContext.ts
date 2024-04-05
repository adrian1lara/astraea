import {createContext} from 'react';

type AppContextProps = {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
};
// Theme context
export const AppContext = createContext<AppContextProps>({
  isDarkMode: false,
  setIsDarkMode: () => {},
});
