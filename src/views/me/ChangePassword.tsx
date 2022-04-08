/**
 * Description : 修改密码
 * Created on : 2022/4/6
 * Author : Victor Huang
 */

import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Platform,
  TouchableWithoutFeedback,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-root-toast';
import md5 from 'blueimp-md5';

import type { RootStackScreenProps } from '../../navigator/types';
import type { StateType } from '../../store/reducers';
import type { UserType } from '../../store/reducers/base/authReducer';

import Global from '../../Global';
import px from '../../utils/px';
import Icon from '../../components/EasyIcon';
import log from '../../utils/Logger';
import { setCurrUserInfo, setUserInfo } from '../../store/actions/base/authAction';

function ChangePassword({ navigation, route }: RootStackScreenProps<'ChangePassword'>) {
  const oldPwdEle: MutableRefObject<TextInput | null> = useRef(null);
  const newPwdEle: MutableRefObject<TextInput | null> = useRef(null);

  const { currUser, users } = useSelector((state: StateType) => state.auth);
  
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [showOldPwd, setShowOldPwd] = useState<boolean>(false);
  const [showNewPwd, setShowNewPwd] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [focusedEle, setFocusedEle] = useState<MutableRefObject<TextInput | null>>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [oldPassword, setOldPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [oldPwdValiInfo, setOldPwdValiInfo] = useState<string>('');
  const [newPwdValiInfo, setNewPwdValiInfo] = useState<string>('');

  useEffect(() => {
    setDisabled(oldPassword.length < 6 || newPassword.length < 6);
  }, [oldPassword, newPassword]);
  
  useEffect(() => {
    // 收到注册请求状态时，调用注册逻辑
    if (submitting)
      changePassword();
  }, [submitting]);

  /**
   * 设置当前获取focus的元素
   * @param ref 
   */
  function onFocus(ref: MutableRefObject<TextInput | null>) {
    setFocusedEle(ref);
  }

  /**
   * 表单验证
   * @returns 验证结果
   */
  function validate() {
    log.debug(oldPassword, newPassword);
    setOldPwdValiInfo('');
    setNewPwdValiInfo('');
    if (md5(oldPassword) !== (currUser as UserType).password) {
      setOldPwdValiInfo(t('signIn.valiInfo.wrongPwd'));
      oldPwdEle.current?.focus();
      return false;
    } else if (oldPassword === newPassword) {
      setNewPwdValiInfo(t('changePassword.valiInfo.samePwd'));
      newPwdEle.current?.focus();
      return false;
    } else
      return true;
  }

  /**
   * 请求注册
   */
  function requestSubmit() {
    if (disabled || submitting || !validate())
      return;
    setSubmitting(true);
    // 隐藏键盘
    Keyboard.dismiss();
  }

  /**
   * 提交修改密码
   */
  function changePassword() {
    const user = { ...(currUser as UserType), password: md5(newPassword) }
    dispatch(setCurrUserInfo(user));
    dispatch(setUserInfo(user.account, user));
    Toast.show(t('changePassword.success'));
    navigation.goBack();
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'} />
      <KeyboardAwareScrollView
        style={styles.rootScroll}
        keyboardShouldPersistTaps='always'
        enableOnAndroid
      >
        <TouchableWithoutFeedback
          onPress={() => Keyboard.dismiss()}
          accessible={false}
        >
          <View style={styles.SignInCard}>
            <Text style={styles.label}>{t('base.password')}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                ref={oldPwdEle}
                keyboardType='default'
                placeholder={t('base.passwordInputPlaceholder')}
                placeholderTextColor={Global.colors.PLACEHOLDER_TEXT}
                style={styles.input}
                value={oldPassword}
                maxLength={16}
                onChangeText={value => setOldPassword(value)}
                onFocus={() => onFocus(oldPwdEle)}
                secureTextEntry={!showOldPwd}
                returnKeyType='next'
                onSubmitEditing={() => newPwdEle?.current?.focus()}
              />
              <TouchableOpacity onPress={() => setShowOldPwd(!showOldPwd)}>
                <Icon iconLib='fa5' name={showOldPwd ? 'eye-slash' : 'eye'} width={px(90)} height={px(90)}
                  size={px(36)} color={Global.colors.PLACEHOLDER_TEXT} solid
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.valiInfo}>{oldPwdValiInfo}</Text>
            <Text style={styles.label}>{t('base.password')}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                ref={newPwdEle}
                keyboardType='default'
                placeholder={t('base.passwordInputPlaceholder')}
                placeholderTextColor={Global.colors.PLACEHOLDER_TEXT}
                style={styles.input}
                value={newPassword}
                maxLength={16}
                onChangeText={value => setNewPassword(value)}
                onFocus={() => onFocus(newPwdEle)}
                secureTextEntry={!showNewPwd}
                returnKeyType='send'
                onSubmitEditing={requestSubmit}
              />
              <TouchableOpacity onPress={() => setShowNewPwd(!showNewPwd)}>
                <Icon iconLib='fa5' name={showNewPwd ? 'eye-slash' : 'eye'} width={px(90)} height={px(90)}
                  size={px(36)} color={Global.colors.PLACEHOLDER_TEXT} solid
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.valiInfo}>{newPwdValiInfo}</Text>
            <TouchableOpacity style={styles.btn} activeOpacity={disabled ? 1 : .2} onPress={requestSubmit}>
              <LinearGradient
                start={{ x: 0, y: .5 }}
                end={{ x: 1, y: .5 }}
                colors={disabled ?
                  [Global.colors.INFO, Global.colors.INFO] :
                  [Global.colors.PRIMARY_GRADIENT, Global.colors.PRIMARY]
                }
                style={styles.btnGradientBg}>
                {submitting ?
                  <ActivityIndicator color='white' /> :
                  <Text style={[styles.btnText, { color: disabled ? Global.colors.PLACEHOLDER_TEXT : 'white' }]}>
                    {t('base.submit')}
                  </Text>
                }
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  // 滚动区域
  rootScroll: {
    width: '100%',
    height: '100%',
  },
  // form area
  label: {
    fontSize: px(28),
    fontWeight: '600',
    color: Global.colors.REGULAR_TEXT,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Global.colors.BORDER_BASE,
    borderBottomWidth: px(1),
  },
  input: {
    flex: 1,
    borderWidth: 0,
    textAlignVertical: 'center',
    height: px(90),
    fontSize: px(42),
    fontWeight: '600',
    color: Global.colors.PRIMARY_TEXT,
  },
  valiInfo: {
    fontSize: px(28),
    lineHeight: px(32),
    color: Global.colors.DANGER,
    marginTop: px(10),
    marginBottom: px(20),
  },
  SignInCard: {
    margin: px(30),
    padding: px(30),
  },
  // 按钮
  btn: {
    marginVertical: px(20),
    borderRadius: px(16),
    overflow: 'hidden',
  },
  btnGradientBg: {
    width: '100%',
    height: px(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: px(16),
  },
  btnText: {
    fontSize: px(32),
    fontWeight: '600',
    color: 'white',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: px(20),
  },
  tipsText: {
    fontSize: px(28),
    color: Global.colors.REGULAR_TEXT,
    fontWeight: '600',
    lineHeight: px(50),
  },
  linkText: {
    color: Global.colors.PRIMARY,
  },
});

export default ChangePassword;
