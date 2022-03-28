/**
 * Description :
 * Created on : 2022/1/1
 * Author : Victor Huang
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  useWindowDimensions,
  PixelRatio,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import type { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../../navigator/RootStackParamList';
import Icon from '../../components/EasyIcon';
import log from '../../utils/Logger';
import bgs from '../../assets/images/bg';
import Global from '../../Global';
import { setUserBg } from '../../store/actions/base/baseAction';
import type { StateType } from '../../store/reducers';

type ChangeBgNavigationProp = StackNavigationProp<RootStackParamList, 'ChangeBg'>;
type Props = {
  navigation: ChangeBgNavigationProp,
};

const bgGap = 5;

const ChangeBg: React.FC<Props> = () => {
  const navigation = useNavigation<ChangeBgNavigationProp>();
  const { width } = useWindowDimensions();
  const { bgType, bgIdx } = useSelector((state: StateType) => state.base.config);
  const dispatch = useDispatch();

  function onBgImgPress(idx: number) {
    requestAnimationFrame(() => {
      log.debug('selected:', idx);
      dispatch(setUserBg({ bgType: 1, bgIdx: idx }));
    });
  }

  function renderBgs() {
    const bgWidth = ((width - bgGap * 4) / 3);
    const bgHeight = bgWidth * 10 / 16;
    return bgs.map((source, idx) => {
      return <TouchableOpacity
        key={`img_${idx}`}
        onPress={() => onBgImgPress(idx)}
      >
        <ImageBackground
          style={[styles.bg, { width: bgWidth, height: bgHeight }]}
          source={source}
          resizeMode='cover'
        >
          {idx === bgIdx ? <View style={styles.bgMask}>
            <View style={styles.checkCircle}>
              <Icon iconLib='fa5' name='check' size={10} color='#ffffff' />
            </View>
          </View> : null}
        </ImageBackground>
      </TouchableOpacity>
    });
  }

  return (
    <ScrollView style={styles.rootSv}>
      <View style={styles.bgsContainer}>
        {renderBgs()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootSv: {
  },
  bgsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingLeft: bgGap - (1 / PixelRatio.get()),
    paddingTop: bgGap,
  },
  bg: {
    marginRight: bgGap,
    marginBottom: bgGap,
    backgroundColor: 'white',
  },
  bgMask: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, .2)',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
    backgroundColor: Global.colors.IOS_BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
    marginBottom: 5,
  },
});

export default ChangeBg;
