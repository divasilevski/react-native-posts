import * as React from 'react';
import { View, Text, FlatList, StyleSheet, Animated } from 'react-native';

const MIN_PULLDOWN_DISTANCE = -140;
const DATA = new Array(10).fill('').map((_, i) => `Item No. ${i}`);

export const PullToRefreshListView = () => {
  const [readyToRefresh, setReadyToRefresh] = React.useState(false);
  const PTRListView = React.useRef(null).current;
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const scrollHandler = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const handleScroll = (pullDownDistance) => {
    console.log(pullDownDistance.value);
    if (pullDownDistance.value <= MIN_PULLDOWN_DISTANCE) {
      return setReadyToRefresh(true);
    }
  };

  React.useEffect(() => {
    scrollY.addListener((value) => handleScroll(value));
    return () => scrollY.removeAllListeners();
  }, [scrollY]);

  const handleRelease = () => {
    console.log(123);
    if (readyToRefresh) {
      PTRListView.scrollTo({ y: -130 });
      setTimeout(() => {
        PTRListView.scrollTo({ y: 0 });
      }, 2000);
    }
    return setReadyToRefresh(false);
  };

  return (
    <View style={styles.scrollview}>
      <View style={styles.topBar}>
        <Text style={styles.navText}>PTR Animation</Text>
      </View>
      <View style={styles.fillParent}>
        <Text>Customer indicator goes here...</Text>
      </View>
      <View style={styles.fillParent}>
        <FlatList
          style={{ flex: 1 }}
          data={DATA}
          keyExtractor={(item) => item}
          renderItem={(item) => (
            <View style={styles.row}>
              <Text style={styles.text}>{item.item}</Text>
            </View>
          )}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          overScrollMode={'always'}
          scrollToOverflowEnabled={true}
          ref={PTRListView}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    flex: 1,
  },
  fillParent: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topBar: {
    backgroundColor: '#F7F7F8',
    height: 64,
  },
  row: {
    padding: 10,
    height: 125,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    marginBottom: -1,
    borderBottomColor: '#E5EDF5',
    borderTopColor: '#E5EDF5',
    borderBottomWidth: 1,
  },
  text: {
    textAlign: 'center',
    color: '#A4C8D9',
  },
  navText: {
    color: '#A4C8D9',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    paddingTop: 30,
  },
});
