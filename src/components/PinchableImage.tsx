import React from 'react';
import { Animated, ImageStyle } from 'react-native';
import {
  HandlerStateChangeEvent,
  PinchGestureHandler,
  PinchGestureHandlerEventPayload,
  State,
} from 'react-native-gesture-handler';

type Props = {
  uri: string;
  width: number;
  height: number;
  style?: ImageStyle;
}

function PinchableImage({uri, width, height, style}: Props) {
  let baseScale = new Animated.Value(1);
  let pinchScale = new Animated.Value(1);
  let scale: Animated.AnimatedInterpolation = Animated.multiply(baseScale, pinchScale);
  let lastScale = 1;

  const baseStyle = {
    width: width,
    height: height,
    resizeMode: 'contain',
    transform: [
      { perspective: 200 },
      { scale: scale },
    ],
  };
  // Image styles
  const imgStyles: ImageStyle = [baseStyle, style && style] as ImageStyle;
  
  const onPinchGestureEvent = Animated.event(
    [{ nativeEvent: { scale: pinchScale } }],
    { useNativeDriver: true }
  );

  function onPinchHandlerStateChange(event: HandlerStateChangeEvent<PinchGestureHandlerEventPayload>) {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      lastScale *= event.nativeEvent.scale;
      baseScale.setValue(lastScale);
      pinchScale.setValue(1);
    }
  };

  return (
    <PinchGestureHandler
      onGestureEvent={onPinchGestureEvent}
      onHandlerStateChange={onPinchHandlerStateChange}>
      <Animated.Image
        source={{ uri: uri }}
        style={imgStyles}
      />
    </PinchGestureHandler>
  );
}

export default PinchableImage;
