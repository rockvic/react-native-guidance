/**
 * Description : 带底端操作区的模态窗口
 * Created on : 2022/4/7
 * Author : Victor Huang
 */

import React, { forwardRef, ReactNode, useEffect, useImperativeHandle, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableOpacity,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';

import Global from '../Global';
import px from '../utils/px';
import Icon from './EasyIcon';
import { } from 'react-native-gesture-handler';

type Props = {
  title?: string;
  children: ReactNode;
};

export interface ModalType {
  show: () => void;
  hide: () => void;
};

const BottomModal = forwardRef<ModalType, Props>(({ title, children }, ref) => {
  const insets = useSafeAreaInsets();

  const [visible, setVisible] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  let paddingBottom = Platform.OS === 'android' ? insets.bottom : (
    showKeyboard ? keyboardHeight : insets.bottom
  );

  useEffect(() => {
    const showKL = Keyboard.addListener("keyboardDidShow", (e) => {
      setShowKeyboard(true);
      setKeyboardHeight(e.endCoordinates.height);
    });
    const hideKL = Keyboard.addListener("keyboardDidHide", () => {
      setShowKeyboard(false);
      setKeyboardHeight(0);
    });
    return () => {
      showKL.remove();
      hideKL.remove();
    }
  }, []);

  const show = () => setVisible(true);
  const hide = () => setVisible(false);

  useImperativeHandle(ref, () => ({ show, hide }));

  return (
    <Modal
      visible={visible}
      style={styles.modal}
      animationType='slide'
      onRequestClose={hide}
      transparent
    >
      <TouchableWithoutFeedback onPress={() => hide()}>
        <View style={[StyleSheet.absoluteFill, styles.root]}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType='light'
            // ios
            blurAmount={20}
            // android
            blurRadius={15}
            overlayColor='transparent'
          />
          <View style={[styles.bottomContainer, { paddingBottom }]}>
            <TouchableOpacity activeOpacity={1} style={styles.innerTouch} onPress={(e) => { }}>
              <Text style={styles.title}>{title}</Text>
              {children}
              <TouchableOpacity style={styles.closeBtn} onPress={() => hide()}>
                <Icon iconLib='fa5' name='times' size={px(30)} color={Global.colors.PLACEHOLDER_TEXT} style={styles.btnIcon} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modal: {
  },
  root: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  bottomContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: px(70),
    borderTopRightRadius: px(70),
    // 阴影
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: px(10),
    shadowOpacity: 0.15,
    shadowColor: "#000000",
    elevation: 10,
  },
  innerTouch: {
  },
  title: {
    height: px(100),
    lineHeight: px(100),
    textAlign: 'center',
    fontSize: px(32),
    fontWeight: '700',
    color: Global.colors.PRIMARY_TEXT,
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnIcon: {
    width: px(100),
    height: px(100),
  },
});

export default BottomModal;
