/**
 * Description : 重置密码
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
   Alert,
   FlatList,
 } from 'react-native';
 import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
 import LinearGradient from 'react-native-linear-gradient';
 import { useTranslation } from 'react-i18next';
 import { useDispatch, useSelector } from 'react-redux';
 import md5 from 'blueimp-md5';
 
 import type { RootStackScreenProps } from '../../navigator/types';
 import type { UserType } from '../../store/reducers/base/authReducer';
 import type { StateType } from '../../store/reducers';
 
 import Global from '../../Global';
 import px from '../../utils/px';
 import Icon from '../../components/EasyIcon';
 import { testEmail } from '../../utils/Validation';
 import { setUserInfo } from '../../store/actions/base/authAction';

function ResetPassword({ navigation, route }: RootStackScreenProps<'ResetPassword'>) {
  const accEle: MutableRefObject<TextInput | null> = useRef(null);

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { users } = useSelector((state: StateType) => state.auth);

  const [account, setAccount] = useState<string>(route.params?.account || '');
  const [accountValiInfo, setAccountValiInfo] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [focusedEle, setFocusedEle] = useState<MutableRefObject<TextInput | null>>();
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    setDisabled(account.length === 0);
  }, [account]);

  useEffect(() => {
    // 收到注册请求状态时，调用注册逻辑
    if (submitting)
      resetPassword();
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
    setAccountValiInfo('');
    if (account && !testEmail(account)) {
      setAccountValiInfo(t('signIn.valiInfo.invalidEmail'));
      accEle.current?.focus();
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
   * 重置密码
   */
  function resetPassword() {
    const findUser = users.filter((item: UserType) => {
      return item.account === md5(account);
    });
    if (findUser?.length === 0) {
      setAccountValiInfo(t('signIn.valiInfo.wrongAcc'));
      accEle.current?.focus();
      setSubmitting(false);
      return;
    }
    findUser[0].password = md5('111111');
    dispatch(setUserInfo(findUser[0].account, findUser[0]));
    Alert.alert(
      t('resetPassword.alert.title'),
      t('resetPassword.alert.message'),
      [
        { text: t('base.ok'), onPress: () => navigation.navigate('SignIn', { account }) }
      ]
    );
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
                placeholderTextColor={Global.COLORS.PLACEHOLDER_TEXT}
                style={styles.input}
                value={account}
                maxLength={256}
                onChangeText={value => setAccount(value)}
                onFocus={() => onFocus(accEle)}
                autoFocus
                returnKeyType='done'
                onSubmitEditing={requestSubmit}
              />
              {focusedEle?.current === accEle?.current && account ?
                <TouchableOpacity onPress={() => {
                  setAccount('');
                  setAccountValiInfo('');
                }}>
                  <Icon iconLib='fa5' name='times-circle' width={px(90)} height={px(90)}
                    size={px(36)} color={Global.COLORS.PLACEHOLDER_TEXT} solid
                  />
                </TouchableOpacity> : null
              }
            </View>
            <Text style={styles.valiInfo}>{accountValiInfo}</Text>
            <TouchableOpacity style={styles.btn} activeOpacity={disabled ? 1 : .2} onPress={requestSubmit}>
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
                    {t('base.submit')}
                  </Text>
                }
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.tipsContainer}>
              <Icon iconLib='fa5' name='info-circle' size={px(32)} color={Global.COLORS.DANGER} />
              <Text style={styles.tips}>{t('resetPassword.tips')}</Text>
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
    color: Global.COLORS.SECONDARY_TEXT,
  },
});

export default ResetPassword;
