import React, { useEffect, useRef } from 'react';
import { Animated, Button, View, StyleSheet } from 'react-native';

export const AnimationLoopHere = () => {
  const leftAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(leftAnim, {
          toValue: 160,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(leftAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Animated.View style={{ left: leftAnim, ...styles.circle }} />
      </View>
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
