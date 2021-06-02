import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const KeyboardButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={() => onPress(title)}>
      <View style={styles.btn}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 70,
    height: 70,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontFamily: 'open-regular',
    fontSize: 24,
  },
});
