import * as React from 'react';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  FlatList,
  PanResponder,
} from 'react-native';
import { useHeaderHeight } from 'react-navigation-stack';

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const colorMap = {};
Array.from(Array(50), (_, i) => {
  colorMap[i] = getRandomColor();
});

export const DragAndDrop = (props) => {
  const heigth = useHeaderHeight();
  const [data, setData] = React.useState(Array.from(Array(50), (_, i) => i));
  const [dragging, setDragging] = React.useState(false);
  const [draggingIdx, setDraggingIdx] = React.useState(-1);
  const [scrollOffset, setScrollOffset] = React.useState(0);
  const [listTopOffset, setListTopOffset] = React.useState(0);
  const [rowHeight, setNativeHeight] = React.useState(0);

  const point = React.useRef(new Animated.ValueXY()).current;

  const reset = () => {
    setDragging(false);
    setDraggingIdx(-1);
  };

  const onScroll = (e) => {
    setScrollOffset(e.nativeEvent.contentOffset.y);
  };

  const yToIndex = (y) => {
    const value = Math.floor((scrollOffset + y - listTopOffset) / rowHeight);
    console.log(scrollOffset, y, listTopOffset, rowHeight);
    if (value < 0) return 0;

    if (value > data.length - 1) return data.length - 1;
    return 8;
  };

  const f = (evt, gestureState) => {
    console.log(scrollOffset);
    const index = yToIndex(gestureState.y0);
    setDraggingIdx(8);
    setDragging(true);
  };

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: f,
      onPanResponderMove: (evt, gestureState) => {
        Animated.event([{ y: point.y }], { useNativeDriver: false })({
          y: gestureState.moveY - heigth,
        });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        reset();
      },
      onPanResponderTerminate: (evt, gestureState) => {
        reset();
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        return true;
      },
    })
  ).current;

  const renderItem = ({ item, index }) => (
    <View
      onLayout={(e) => {
        setNativeHeight(e.nativeEvent.layout.height);
      }}
      style={{
        padding: 16,
        backgroundColor: colorMap[item],
        flexDirection: 'row',
        opacity: draggingIdx === index ? 0 : 1,
      }}
    >
      <View {...panResponder.panHandlers}>
        <Text style={{ fontSize: 22 }}>@</Text>
      </View>
      <Text style={{ fontSize: 22, textAlign: 'center', flex: 1 }}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {dragging && (
        <Animated.View
          style={{
            position: 'absolute',
            zIndex: 2,
            width: '100%',
            top: point.getLayout().top,
          }}
        >
          {renderItem({ item: draggingIdx })}
        </Animated.View>
      )}
      <FlatList
        scrollEnabled={!dragging}
        style={styles.item}
        data={data}
        renderItem={renderItem}
        onScroll={onScroll}
        onLayout={(e) => {
          setListTopOffset(e.nativeEvent.layout.y);
        }}
        scrollEventThrottle={16}
        keyExtractor={(item) => '' + item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  item: {
    width: '100%',
  },
});
