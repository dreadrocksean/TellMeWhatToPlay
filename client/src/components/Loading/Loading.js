import React, { useState, useEffect, useRef } from "react";
import { View, Animated } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

const barCount = 7;
const maxHeight = 130;
const style = {
  // borderRadius: maxHeight / 2,
  height: maxHeight,
  width: maxHeight
};

const Loading = ({ color, size }) => {
  const heightsRef = useRef(
    [...Array(barCount)].map(() => new Animated.Value(0))
  );
  const sequencesRef = useRef([]);
  const [animOn, setAnimOn] = useState(false);

  useEffect(() => {
    if (!animOn) startAnimations();
    setAnimOn(true);
    return () => {
      heightsRef.current.forEach(h => h.stopAnimation());
      sequencesRef.current.forEach(seq => seq.stop());
      setAnimOn(false);
    };
  }, []);

  const startAnimations = () => {
    const allSeqs = [];
    heightsRef.current.forEach((h, i) => {
      h.stopAnimation();
      const animateSequence = () => {
        const seq = Animated.sequence([
          Animated.timing(h, {
            toValue: (Math.random() * maxHeight) / 2 + maxHeight / 2,
            duration: Math.random() * 100
          }),
          Animated.timing(h, {
            toValue: (Math.random() * maxHeight) / 2,
            duration: Math.random() * 350 + 350
          })
        ]);
        if (sequencesRef.current[i]) sequencesRef.current[i].stop();
        sequencesRef.current[i] = seq;
        sequencesRef.current[i].start(animateSequence);
      };
      animateSequence();
    });
  };

  return (
    <View style={[styles.root, style]}>
      {[...Array(barCount)].map((_, i) => (
        <Animated.View
          key={i}
          style={[styles.bar, { height: heightsRef.current[i] }]}
        />
      ))}
    </View>
  );
};

Loading.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string
};

export default Loading;
