import {Modalize} from 'react-native-modalize';
import React, {ReactNode, RefObject} from 'react';
import theme, {darkTheme} from '../themes/default';

type CategoryModalProps = {
  modalizeRef: RefObject<Modalize>;
  children: ReactNode;
  isDarkMode: boolean;
};

export const CategoryModal: React.FC<CategoryModalProps> = ({
  modalizeRef,
  children,
  isDarkMode,
}) => (
  <Modalize
    ref={modalizeRef}
    snapPoint={300}
    withReactModal={true}
    modalHeight={600}
    modalStyle={{
      backgroundColor: isDarkMode
        ? darkTheme.colors.mainBackground
        : theme.colors.mainBackground,
    }}>
    {children}
  </Modalize>
);
