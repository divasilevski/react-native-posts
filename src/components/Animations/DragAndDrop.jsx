import React, { useRef, useState } from 'react';
import { useCallback } from 'react';
import { Animated, PanResponder, View, StyleSheet } from 'react-native';

export const AnimationDragAndDrop = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gs) => {
        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        });
        if (gs.x0 > 195) pan.setOffset({ x: 70, y: 0 });
        else pan.setOffset({ x: 0, y: 0 });
        pan.flattenOffset();
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderEnd: (_, gs) => {
        if (gs.dx > 35) {
          Animated.spring(pan, {
            toValue: { x: 70, y: 0 },
            useNativeDriver: true,
            duration: 500,
          }).start();
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: true,
            duration: 500,
          }).start();
        }

        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
          ...styles.circle,
        }}
        {...panResponder.panHandlers}
      />
      <View style={styles.box}></View>
      <View style={styles.box}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    padding: 10,
  },
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderStyle: 'dashed',
    width: 50,
    height: 50,
    marginHorizontal: 10,
    zIndex: -1,
  },
  circle: {
    position: 'absolute',
    left: 25,
    top: 15,
    backgroundColor: 'purple',
    width: 40,
    height: 40,
    borderRadius: 40,
  },
});
