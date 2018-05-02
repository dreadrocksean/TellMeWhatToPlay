
import { Animated, Easing } from 'react-native';

export const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

export const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    // screenInterpolator: sceneProps => {
    //   const { position, layout, scene, index, scenes } = sceneProps;

    //   const thisSceneIndex = scene.index;
    //   const height = layout.initHeight;
    //   const width = layout.initWidth;

    //   // We can access our navigation params on the scene's 'route' property
    //   let thisSceneParams = scene.route.params || {};

    //   const translateX = position.interpolate({
    //     inputRange: [thisSceneIndex - 1, thisSceneIndex],
    //     outputRange: [width, 0],
    //   });

    //   const translateY = position.interpolate({
    //     inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
    //     outputRange: [height, 0, 0]
    //   })

    //   const opacity = position.interpolate({
    //     inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
    //     outputRange: [0, 1, 1],
    //   })

    //   const scale = position.interpolate({
    //     inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
    //     outputRange: [4, 1, 1]
    //   })

    //   const slideFromRight = { transform: [{ translateX }] }
    //   const scaleWithOpacity = { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] }
    //   const slideInFromBottom = { transform: [{ translateY }] }

    //   if (thisSceneParams.plain) return slideFromRight
    //   else if (index < 2) return slideInFromBottom
    //   else return scaleWithOpacity
    // },
    screenInterpolator: sceneProps => {
      const { position, layout, scene, index, scenes } = sceneProps;
      const toIndex = index;
      const thisSceneIndex = scene.index;
      const lastSceneIndex = scenes[scenes.length - 1].index;
      const height = layout.initHeight;
      const width = layout.initWidth;

      // console.log('Scene Indices', thisSceneIndex, toIndex, lastSceneIndex);

// INTERPOLATIONS
      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      });

      const revTranslateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [-width, 0, 0]
      });
      const translateY = position.interpolate({
        inputRange: [0, thisSceneIndex],
        outputRange: [height, 0]
      });
      const revTranslateY = position.interpolate({
        inputRange: [0, thisSceneIndex],
        outputRange: [height, 0]
      });
      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
        outputRange: [0, 1, 1],
      });

      const scale = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [4, 1, 1]
      });

// TRANSFORMS
      const scaleWithOpacity = { opacity, transform: [{ scaleX: scale }, { scaleY: scale }] };
      const slideFromRight = { transform: [{ translateX }] };
      const slideFromLeft = { transform: [{ translateX: revTranslateX }] };
      const slideFromBottom = { transform: [{ translateY }] };
      const slideFromTop= { transform: [{ translateY: revTranslateY }] };


      // if (scene.index === toIndex) {return;}

      // Test whether we're skipping back more than one screen
      // and slide from bottom if true
      if (lastSceneIndex - toIndex > 1) {
        // Hide all screens in between
        if (scene.index !== lastSceneIndex) {return { opacity: 0 };}
        return scaleWithOpacity;
      }
      if (toIndex - scene.index > 0) {
        return slideFromLeft;
      }
      // return scaleWithOpacity;
      return slideFromRight;
    },
  };
};