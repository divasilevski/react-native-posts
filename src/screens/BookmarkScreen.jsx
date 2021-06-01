import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DragAndDrop } from '../components/DragAndDrop';

export const BookmarkScreen = ({}) => {
  return (
    <View style={styles.container}>
      <DragAndDrop />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
