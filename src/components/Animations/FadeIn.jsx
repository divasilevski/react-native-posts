import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export const AnimationFadeIn = ({ children, style }) => {
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: false,
    }).start();
  }, [fadeIn]);

  return (
    <Animated.View style={{ ...style, opacity: fadeIn }}>
      {children}
    </Animated.View>
  );
};
