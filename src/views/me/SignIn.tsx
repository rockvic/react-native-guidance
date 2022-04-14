/**
 * Description : 登录
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
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import md5 from 'blueimp-md5';
import { v4 as uuidv4 } from 'uuid';
import Toast from 'react-native-root-toast';

import type { RootStackScreenProps } from '../../navigator/types';
import type { StateType } from '../../store/reducers';
import type { UserType } from '../../store/reducers/base/authReducer';

import Global from '../../Global';
import px from '../../utils/px';
import Icon from '../../components/EasyIcon';
import { testEmail } from '../../utils/Validation';
import Images from '../../assets/Images';
import { signIn as signInAction } from '../../store/actions/base/authAction';
import log from '../../utils/Logger';

function SignIn({ navigation, route }: RootStackScreenProps<'SignIn'>) {
  const accEle: MutableRefObject<TextInput | null> = useRef(null);
  const pwdEle: MutableRefObject<TextInput | null> = useRef(null);
  
  const { users } = useSelector((state: StateType) => state.auth);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const headerHeight = px(140);

  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [focusedEle, setFocusedEle] = useState<MutableRefObject<TextInput | null>>();
  const [formData, setFormData] = useState<{ account: string, password: string }>({ account: route.params?.account || '', password: '' });
  const [emailValiInfo, setEmailValiInfo] = useState<string>('');
  const [pwdValiInfo, setPwdValiInfo] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    setFormData({ ...formData, account: route.params?.account || '' });
  }, [route]);

  useEffect(() => {
    setDisabled(formData.account.length === 0 || formData.password.length < 6);
  }, [formData]);

  useEffect(() => {
    // 收到登录请求状态时，调用登录逻辑
    if (submitting)
      signIn();
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
    setEmailValiInfo('');
    setPwdValiInfo('');
    if (formData.account && !testEmail(formData.account)) {
      setEmailValiInfo(t('signIn.valiInfo.invalidEmail'));
      accEle.current?.focus();
      return false;
    } else if (formData.password && formData.password.length < 6) {
      setPwdValiInfo(t('signIn.valiInfo.pwdLessThan6'));
      pwdEle.current?.focus();
      return false;
    } else
      return true;
  }

  /**
   * 请求登录
   */
  function requestSignIn() {
    if (disabled || submitting || !validate())
      return;
    setSubmitting(true);
    // 隐藏键盘
    Keyboard.dismiss();
  }

  /**
   * 登录
   */
  async function signIn() {
    // 对用户信息进行 md5 加密
    const user = {
      account: md5(formData.account),
      password: md5(formData.password),
    };
    const findUser = users.filter((item: UserType) => {
      return item.account === user.account;
    });
    log.debug('SignIn.signIn() > users, user, findUser : ', users, user, findUser);
    if (findUser?.length === 0) {
      setEmailValiInfo(t('signIn.valiInfo.wrongAcc'));
      accEle.current?.focus();
      setSubmitting(false);
      return;
    } else if (user.password !== findUser[0].password) {
      setPwdValiInfo(t('signIn.valiInfo.wrongPwd'));
      pwdEle.current?.focus();
      setSubmitting(false);
      return;
    } else {
      dispatch(signInAction(uuidv4(), findUser[0]));
      setSubmitting(false);
      Toast.show(t('signIn.success'));
      navigation.navigate('Home');
    }
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'} />
      <View style={[styles.header, { height: headerHeight }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon iconLib='fa5' name='times' width={headerHeight} height={headerHeight}
            size={px(32)} color={Global.COLORS.PRIMARY_TEXT}
          />
        </TouchableOpacity>
        <Image source={Images.textLogo} style={[styles.textLogo, { height: headerHeight / 2 }]} />
        <View style={{ width: headerHeight }} />
      </View>
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
            <Text style={styles.label}>{t('base.email')}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                ref={accEle}
                keyboardType='email-address'
                placeholder={t('base.emailInputPlaceholder')}
                placeholderTextColor={Global.COLORS.PLACEHOLDER_TEXT}
                style={styles.input}
                value={formData.account}
                maxLength={256}
                onChangeText={value => setFormData({ ...formData, account: value })}
                onFocus={() => onFocus(accEle)}
                autoFocus
                returnKeyType='next'
                onSubmitEditing={() => pwdEle?.current?.focus()}
              />
              {focusedEle?.current === accEle?.current && formData.account ? <TouchableOpacity
                onPress={() => setFormData({ ...formData, account: '' })}
              >
                <Icon iconLib='fa5' name='times-circle' width={px(90)} height={px(90)} 
                  size={px(36)} color={Global.COLORS.PLACEHOLDER_TEXT} solid
                />
              </TouchableOpacity> : null}
            </View>
            <Text style={styles.valiInfo} numberOfLines={1}>{emailValiInfo}</Text>
            <Text style={styles.label}>{t('base.password')}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                ref={pwdEle}
                keyboardType='default'
                placeholder={t('base.passwordInputPlaceholder')}
                placeholderTextColor={Global.COLORS.PLACEHOLDER_TEXT}
                style={styles.input}
                value={formData.password}
                maxLength={16}
                onChangeText={value => setFormData({ ...formData, password: value })}
                onFocus={() => onFocus(pwdEle)}
                secureTextEntry={!showPwd}
                returnKeyType='send'
                onSubmitEditing={requestSignIn}
              />
              <TouchableOpacity onPress={() => setShowPwd(!showPwd)}>
                <Icon iconLib='fa5' name={showPwd ? 'eye-slash' : 'eye'} width={px(90)} height={px(90)} 
                  size={px(36)} color={Global.COLORS.PLACEHOLDER_TEXT} solid
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.valiInfo} numberOfLines={1}>{pwdValiInfo}</Text>
            <TouchableOpacity style={styles.btn} activeOpacity={disabled ? 1 : .2} onPress={requestSignIn}>
              <LinearGradient
                start={{ x: 0, y: .5 }}
                end={{ x: 1, y: .5 }}
                colors={disabled ?
                  [Global.COLORS.INFO, Global.COLORS.INFO] :
                  [Global.COLORS.PRIMARY_GRADIENT, Global.COLORS.PRIMARY]
                }
                style={styles.btnGradientBg}>
                {submitting ?
                  <ActivityIndicator color='white' /> :
                  <Text style={[styles.btnText, { color: disabled ? Global.COLORS.PLACEHOLDER_TEXT : 'white' }]}>
                    {t('base.signIn')}
                  </Text>
                }
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkContainer}
              onPress={() => navigation.navigate('ResetPassword', { account: formData.account })}
            >
              <Text style={[styles.tipsText, styles.linkText]}>{t('signIn.forgetPassword')}</Text>
            </TouchableOpacity>
            <View style={styles.linkContainer}>
              <Text style={styles.tipsText}>{t('signIn.noAccount')}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp', { account: formData.account })}>
                <Text style={[styles.tipsText, styles.linkText]}>{t('signIn.toSignUp')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  // header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    // width: '100%',
    // backgroundColor: 'lightgray',
  },
  textLogo: {
    flex: 1,
    resizeMode: 'contain',
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
    color: Global.COLORS.REGULAR_TEXT,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: Global.COLORS.BORDER_BASE,
    borderBottomWidth: px(1),
  },
  input: {
    flex: 1,
    borderWidth: 0,
    textAlignVertical: 'center',
    height: px(90),
    fontSize: px(42),
    fontWeight: '600',
    color: Global.COLORS.PRIMARY_TEXT,
  },
  valiInfo: {
    fontSize: px(28),
    lineHeight: px(32),
    color: Global.COLORS.DANGER,
    marginTop: px(10),
    marginBottom: px(20),
  },
  SignInCard: {
    margin: px(30),
    padding: px(30),
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: px(20),
  },
  tipsText: {
    fontSize: px(28),
    color: Global.COLORS.REGULAR_TEXT,
    fontWeight: '600',
    lineHeight: px(50),
  },
  linkText: {
    color: Global.COLORS.PRIMARY,
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
});

export default SignIn;
