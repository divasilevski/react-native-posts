import React, { useEffect, useRef } from 'react';
import { Animated, Button, View, StyleSheet } from 'react-native';

export const AnimationHereHere = () => {
  const leftAnim = useRef(new Animated.Value(0)).current;

  const leftHandler = () => {
    Animated.timing(leftAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  const rightHandler = () => {
    Animated.timing(leftAnim, {
      toValue: 160,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Button title="<" onPress={leftHandler}></Button>
      <View style={styles.field}>
        <Animated.View style={{ left: leftAnim, ...styles.circle }} />
      </View>

      <Button title=">" onPress={rightHandler}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  field: {
    width: 200,
    padding: 10,
  },
  circle: {
    backgroundColor: 'purple',
    width: 20,
    height: 20,
    borderRadius: 20,
  },
});
