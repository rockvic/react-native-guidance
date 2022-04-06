/**
 * Description :
 * Created on : 2022/1/1
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
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-root-toast';
import md5 from 'blueimp-md5';
import { v4 as uuidv4 } from 'uuid';

import type { RootStackScreenProps } from '../../navigator/types';
import type { UserType } from '../../store/reducers/base/authReducer';

import Global from '../../Global';
import px from '../../utils/px';
import Icon from '../../components/EasyIcon';
import { testEmail } from '../../utils/Validation';
import { signUp as signUpAction, signIn } from '../../store/actions/base/authAction';
import { filterEmail } from '../../utils/Filters';
import { StateType } from '../../store/reducers';

function SignUp({ navigation, route }: RootStackScreenProps<'SignUp'>) {
  const accEle: MutableRefObject<TextInput | null> = useRef(null);
  const pwdEle: MutableRefObject<TextInput | null> = useRef(null);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { users } = useSelector((state: StateType) => state.auth);

  const [showPwd, setShowPwd] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [focusedEle, setFocusedEle] = useState<MutableRefObject<TextInput | null>>();
  const [formData, setFormData] = useState<{ account: string, password: string }>({ account: route.params.account, password: '' });
  const [emailValiInfo, setEmailValiInfo] = useState<string>('');
  const [pwdValiInfo, setPwdValiInfo] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    setDisabled(formData.account.length === 0 || formData.password.length < 6);
  }, [formData]);

  useEffect(() => {
    // 收到注册请求状态时，调用注册逻辑
    if (submitting)
      signUp();
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
    if (formData.account && !testEmail(formData.account)) {
      setEmailValiInfo(t('signIn.valiInfo.invalidEmail'));
      accEle.current?.focus();
      return false;
    } else if (formData.password && formData.password.length < 6) {
      setPwdValiInfo(t('signIn.valiInfo.pwdLessThan6'));
      pwdEle.current?.focus();
      return false;
    } else {
      setEmailValiInfo('');
      setPwdValiInfo('');
      return true;
    }
  }

  /**
   * 请求注册
   */
  function requestSignUp() {
    if (disabled || submitting || !validate())
      return;
    setSubmitting(true);
    // 隐藏键盘
    Keyboard.dismiss();
  }

  /**
   * 注册
   */
  async function signUp() {
    Keyboard.dismiss();
    // 对用户信息进行 md5 加密
    const user = {
      account: md5(formData.account),
      accountMask: filterEmail(formData.account),
      password: md5(formData.password),
    };
    const findUser = users.filter((item: UserType) => {
      return item.account === user.account;
    });
    if (findUser && findUser.length > 0) {
      Alert.alert(
        "账户重复",
        "您输入的账户已经存在，请输入其它电子邮箱进行注册。如果您遗忘了已有账户的密码，请通过“重置密码”功能进行密码重置。",
        [
          // { text: "Cancel", onPress: () => {}, style: "cancel" },
          { text: "OK", onPress: () => {} }
        ]
      );
      accEle?.current?.focus();
      setSubmitting(false);
      return;
    }
    // 缓存注册用户
    dispatch(signUpAction(user));
    // 直接登录
    // 此处使用临时的 uuid 作为 token，实际应用中，应发起后台登录获取 token
    dispatch(signIn(uuidv4(), user));
    setSubmitting(false);
    Toast.show('账户创建成功！');
    navigation.navigate('Home');
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
            <Text style={styles.label}>{t('base.email')}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                ref={accEle}
                keyboardType='email-address'
                placeholder={t('base.emailInputPlaceholder')}
                placeholderTextColor={Global.colors.PLACEHOLDER_TEXT}
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
                  size={px(36)} color={Global.colors.PLACEHOLDER_TEXT} solid
                />
              </TouchableOpacity> : null}
            </View>
            <Text style={styles.valiInfo}>{emailValiInfo}</Text>
            <Text style={styles.label}>{t('base.password')}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                ref={pwdEle}
                keyboardType='default'
                placeholder={t('base.passwordInputPlaceholder')}
                placeholderTextColor={Global.colors.PLACEHOLDER_TEXT}
                style={styles.input}
                value={formData.password}
                maxLength={16}
                onChangeText={value => setFormData({ ...formData, password: value })}
                onFocus={() => onFocus(pwdEle)}
                secureTextEntry={!showPwd}
                returnKeyType='send'
                onSubmitEditing={requestSignUp}
              />
              <TouchableOpacity onPress={() => setShowPwd(!showPwd)}>
                <Icon iconLib='fa5' name={showPwd ? 'eye-slash' : 'eye'} width={px(90)} height={px(90)}
                  size={px(36)} color={Global.colors.PLACEHOLDER_TEXT} solid
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.valiInfo}>{pwdValiInfo}</Text>
            <TouchableOpacity style={styles.btn} onPress={requestSignUp}>
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
            <View style={styles.tipsContainer}>
              <Icon iconLib='fa5' name='info-circle' size={px(32)} color={Global.colors.DANGER} />
              <Text style={styles.tips}>{t('signUp.tips')}</Text>
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
  // tips
  tipsContainer: {
    flexDirection: 'row',
    marginTop: px(20),
  },
  tips: {
    flex: 1,
    marginLeft: px(6),
    fontSize: px(24),
    lineHeight: px(34),
    color: Global.colors.SECONDARY_TEXT,
  },
});

export default SignUp;
