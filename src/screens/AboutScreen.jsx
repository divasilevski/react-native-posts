import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AnimationDragAndDrop } from '../components/Animations/DragAndDrop';
import { AnimationFadeIn } from '../components/Animations/FadeIn';
import { AnimationHereHere } from '../components/Animations/HereHere';
import { AnimationLoopHere } from '../components/Animations/LoopHere';

export const AboutScreen = ({}) => {
  return (
    <View style={styles.center}>
      <AnimationDragAndDrop />
      <AnimationLoopHere />
      <AnimationHereHere />
      <AnimationFadeIn>
        <Text>About Screen</Text>
      </AnimationFadeIn>
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
