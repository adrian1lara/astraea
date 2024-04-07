import {Switch} from 'react-native';
import Box from './box';

type SwitcherProps = {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
};

const Switcher: React.FC<SwitcherProps> = ({isDarkMode, setIsDarkMode}) => (
  <Box>
    <Switch value={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
  </Box>
);

export default Switcher;
