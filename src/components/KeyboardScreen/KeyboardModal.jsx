import * as React from 'react';
import { KeyboardButton } from './KeyboardButton';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export const KeyboardModal = ({ visible, close }) => {
  const [value, setValue] = React.useState('');

  function input(char) {
    setValue((state) => state + char);
  }

  function back(char) {
    setValue((state) => state.slice(0, -1));
  }

  return (
    <Modal transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={() => close(value)}>
        <View style={styles.overlay}>
          <Text style={styles.text}>{value}</Text>
          <View style={styles.row}>
            <KeyboardButton title="1" onPress={input} />
            <KeyboardButton title="2" onPress={input} />
            <KeyboardButton title="3" onPress={input} />
          </View>
          <View style={styles.row}>
            <KeyboardButton title="4" onPress={input} />
            <KeyboardButton title="5" onPress={input} />
            <KeyboardButton title="6" onPress={input} />
          </View>
          <View style={styles.row}>
            <KeyboardButton title="7" onPress={input} />
            <KeyboardButton title="8" onPress={input} />
            <KeyboardButton title="9" onPress={input} />
          </View>
          <View style={styles.row}>
            <KeyboardButton title="<" onPress={back} />
            <KeyboardButton title="0" onPress={input} />
            <KeyboardButton title="." onPress={input} />
          </View>
          <View style={styles.row}>
            <KeyboardButton title="OK" onPress={() => close(value)} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#000',
    opacity: 0.7,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 70,
    height: 70,
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 48,
    color: '#fff',
    marginBottom: 15,
  },
});
