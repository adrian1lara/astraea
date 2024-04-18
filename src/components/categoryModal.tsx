import {Modalize} from 'react-native-modalize';
import React, {ReactNode, RefObject} from 'react';

type CategoryModalProps = {
  modalizeRef: RefObject<Modalize>;
  children: ReactNode;
};

export const CategoryModal: React.FC<CategoryModalProps> = ({
  modalizeRef,
  children,
}) => (
  <Modalize
    ref={modalizeRef}
    snapPoint={300}
    withReactModal={true}
    modalHeight={600}>
    {children}
  </Modalize>
);
