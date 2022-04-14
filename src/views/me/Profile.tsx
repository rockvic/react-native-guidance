/**
 * Description : 用户资料页
 * Created on : 2022/4/6
 * Author : Victor Huang
 */

import React, { MutableRefObject, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar, Image, TextInput, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import type { RootStackScreenProps } from '../../navigator/types';
import type { StateType } from '../../store/reducers';
import type { UserType } from '../../store/reducers/base/authReducer';

import Global from '../../Global';
import px from '../../utils/px';
import { signOut, setCurrUserInfo, setUserInfo } from '../../store/actions/base/authAction';
import Card from '../../components/Card';
import Icon from '../../components/EasyIcon';
import BottomModal, { ModalType } from '../../components/BottomModal';
import { ScrollView } from 'react-native-gesture-handler';

function Profile({ navigation, route }: RootStackScreenProps<'Profile'>) {
  const modal = useRef<ModalType>(null);

  const { currUser } = useSelector((state: StateType) => state.auth);
  const [alias, setAlias] = useState((currUser as UserType).alias);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  /**
   * 更新头像
   * @param uri 
   */
  function onChooseAvatar(uri: string[]) {
    const user = { ...(currUser as UserType), avatar: uri[0] }
    dispatch(setCurrUserInfo(user));
    dispatch(setUserInfo(user.account, user));
  }

  /**
   * 修改昵称
   */
  function updateAlias() {
    const user = { ...(currUser as UserType), alias: alias }
    dispatch(setCurrUserInfo(user));
    dispatch(setUserInfo(user.account, user));
    modal.current?.hide();
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle={'dark-content'} />
      <ScrollView>
        <Card style={styles.card}>
          <View style={styles.row}>
            <Icon iconLib='fa5' name='envelope' width={px(80)} height={px(60)} size={px(32)} color={Global.COLORS.REGULAR_TEXT} solid />
            <Text style={styles.label}>{t('base.email')}</Text>
            <Text style={[styles.value, { marginRight: px(20) }]}>{(currUser as UserType)?.accountMask}</Text>
          </View>
          <View style={styles.line} />
          <TouchableOpacity style={styles.row} onPress={() => {
            modal.current?.show();
          }}>
            <Icon iconLib='fa5' name='hat-wizard' width={px(80)} height={px(60)} size={px(32)} color={Global.COLORS.REGULAR_TEXT} />
            <Text style={styles.label}>{t('profile.alias')}</Text>
            <Text style={styles.value}>{(currUser as UserType)?.alias}</Text>
            <Icon iconLib='fa5' name='chevron-right' width={px(50)} height={px(50)} size={px(40)} color={Global.COLORS.PLACEHOLDER_TEXT} />
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity
            style={[styles.row, { borderBottomWidth: 0 }]}
            onPress={() => navigation.navigate('CameraRoll', { onChoosed: onChooseAvatar })}
          >
            <Icon iconLib='fa5' name='portrait' width={px(80)} height={px(60)} size={px(32)} color={Global.COLORS.REGULAR_TEXT} />
            <Text style={styles.label}>{t('profile.avatar')}</Text>
            <View style={styles.avatarCol}>
              <View style={styles.avatarContainer}>
                {(currUser as UserType).avatar ? 
                  <Image source={{ uri: (currUser as UserType).avatar }}
                    style={styles.avatar} resizeMode='cover' /> :
                  <Icon iconLib='fa5' name='robot' style={styles.avatar}
                    size={px(40)} color={Global.COLORS.SECONDARY_TEXT} solid
                  />
                }
              </View>
            </View>
            <Icon iconLib='fa5' name='chevron-right' width={px(50)} height={px(50)} size={px(40)} color={Global.COLORS.PLACEHOLDER_TEXT} />
          </TouchableOpacity>
          <View style={styles.line} />
          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('ChangePassword')}>
            <Icon iconLib='fa5' name='user-lock' width={px(80)} height={px(60)} size={px(32)} color={Global.COLORS.REGULAR_TEXT} />
            <Text style={styles.label}>{t('base.password')}</Text>
            <Text style={styles.value}>{t('changePassword.title')}</Text>
            <Icon iconLib='fa5' name='chevron-right' width={px(50)} height={px(50)} size={px(40)} color={Global.COLORS.PLACEHOLDER_TEXT} />
          </TouchableOpacity>
        </Card>
        <Card style={[styles.card, { marginBottom: px(80) }]}>
          <TouchableOpacity style={styles.btnRow} onPress={() => {
            dispatch(signOut());
            navigation.navigate('Home');
          }}>
            <Text style={[styles.btnText]}>{t('base.signOut')}</Text>
          </TouchableOpacity>
        </Card>
      </ScrollView>
      <BottomModal ref={modal} title={t('profile.setAlias')}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={alias}
            maxLength={50}
            onChangeText={value => setAlias(value)}
            autoFocus
          />
          <TouchableOpacity onPress={updateAlias}>
            <Icon iconLib='fa5' name='check' size={px(30)} width={px(120)} height={px(90)} color={Global.COLORS.PRIMARY} />
          </TouchableOpacity>
        </View>
      </BottomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  card: {
    marginTop: px(50),
    marginHorizontal: px(40),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: px(30),
    paddingHorizontal: px(20),
  },
  line: {
    height: px(1),
    backgroundColor: Global.COLORS.BORDER_BASE,
  },
  label: {
    flex: .5,
    fontSize: px(32),
    color: Global.COLORS.PRIMARY_TEXT,
    fontWeight: '700',
  },
  value: {
    flex: 1,
    fontSize: px(28),
    color: Global.COLORS.REGULAR_TEXT,
    textAlign: 'right',
  },
  avatarCol: {
    flex: 1,
    alignItems: 'flex-end',
  },
  avatarContainer: {
    width: px(100),
    height: px(100),
    borderRadius: px(16),
    backgroundColor: Global.COLORS.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatar: {
    width: px(100),
    height: px(100),
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: px(30),
  },
  btnText: {
    fontSize: px(32),
    color: Global.COLORS.DANGER,
    fontWeight: '700',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: px(30),
    paddingBottom: px(80),
  },
  input: {
    flex: 1,
    textAlignVertical: 'center',
    fontSize: px(28),
    fontWeight: '600',
    color: Global.COLORS.PRIMARY_TEXT,
    height: px(90),
    borderWidth: px(1),
    borderColor: Global.COLORS.BORDER_LIGHT,
    borderRadius: px(16),
    paddingHorizontal: px(20),
    backgroundColor: Global.COLORS.BACKGROUND,
  },
});

export default Profile;
