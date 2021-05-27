import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const BookmarkScreen = ({}) => {
  return (
    <View style={styles.center}>
      <Text>Bookmark Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
