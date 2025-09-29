import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  runOnJS,
  Easing,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
// import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");
const AnimatedPath = Animated.createAnimatedComponent(Path);

export default function SwipeUpWave() {
  const [isSwipe,setIsSwipe] = useState(false)
  const navigation = useNavigation();

  // Start with bottom visible wave (150px height)
  const waveHeight = useSharedValue(150);

  const animatedProps = useAnimatedProps(() => {
    // console.log("height",height,waveHeight.value);
    
    const waveY = height - waveHeight.value;

    // Smooth curve for wave
    const path = `
      M0 ${waveY}
      Q ${width / 2} ${waveY - 80}, ${width} ${waveY}
      L ${width} ${height}
      L 0 ${height}
      Z
    `;
    return { d: path };
  });

  const onSwipe = (event) => {
   setIsSwipe(true)
    if (event.nativeEvent.translationY < -80) {
      waveHeight.value = withTiming(height + 100, {
        duration: 1000,
        easing: Easing.out(Easing.cubic),
      }, (finished) => {
        if (finished) {
          runOnJS(navigation.navigate)("DetailsScreen");
          // navigation.navigate('DetailsScreen')
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        <Text style={{ fontSize: 22, fontWeight: "bold" }}>NASS THE GROUP</Text>
      </View>

      {/* Bottom Section with Wave */}
      <PanGestureHandler onGestureEvent={onSwipe}>
        <View style={styles.bottomSection}>
          <Svg height={height} width={width} style={StyleSheet.absoluteFill}>
            <AnimatedPath animatedProps={animatedProps} fill="#1E4A92" />
          </Svg>

          {!isSwipe && <View style={styles.textContainer}>
            <Text style={styles.swipeText}>Swipe up</Text>
            <Text style={styles.subText}>To be Ready for Job</Text>
          </View>}
        </View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // White bg top section
  },
  topSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSection: {
    height: '100%', // just for gesture area
    justifyContent: "flex-end",
  },
  textContainer: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  swipeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  subText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
});
