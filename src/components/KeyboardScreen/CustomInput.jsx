import * as React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { KeyboardModal } from './KeyboardModal';

export const CustomInput = (props) => {
  const [value, setValue] = React.useState('Плейсхолдер');
  const [modal, setModal] = React.useState(false);

  function toggleModal(value) {
    if (value) {
      setValue(value);
    }
    setModal((state) => !state);
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={() => toggleModal()}>
        <View style={styles.textInput}>
          <Text style={styles.text}>{value}</Text>
        </View>
      </TouchableWithoutFeedback>

      <KeyboardModal visible={modal} close={toggleModal} />
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
  },
  text: {
    fontFamily: 'open-regular',
    fontSize: 20,
    padding: 5,
  },
});
