/**
 * Description : 用户资料页
 * Created on : 2022/1/1
 * Author : Victor Huang
 */

import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import type { RootStackScreenProps } from '../../navigator/types';
import type { StateType } from '../../store/reducers';
import type { UserType } from '../../store/reducers/base/authReducer';

import Card from '../../components/Card';
import Icon from '../../components/EasyIcon';
import Global from '../../Global';
import px from '../../utils/px';

function Profile({ navigation, route }: RootStackScreenProps<'Profile'>) {
  const { currUser } = useSelector((state: StateType) => state.auth);
  const { t } = useTranslation();

  return (
    <View style={styles.root}>
      <StatusBar barStyle={'dark-content'} />
      <Card style={styles.card}>
        <TouchableOpacity style={styles.row}>
          <Icon iconLib='fa5' name='envelope' width={px(80)} height={px(60)} size={px(32)} color={Global.colors.REGULAR_TEXT} solid />
          <Text style={styles.label}>{t('base.email')}</Text>
          <Text style={[styles.value, { marginRight: px(20) }]}>{(currUser as UserType).accountMask}</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.row}>
          <Icon iconLib='fa5' name='hat-wizard' width={px(80)} height={px(60)} size={px(32)} color={Global.colors.REGULAR_TEXT} />
          <Text style={styles.label}>{t('profile.alias')}</Text>
          <Text style={styles.value}>{(currUser as UserType).alias}</Text>
          <Icon iconLib='fa5' name='chevron-right' width={px(50)} height={px(50)} size={px(40)} color={Global.colors.PLACEHOLDER_TEXT} />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={[styles.row, { borderBottomWidth: 0 }]}>
          <Icon iconLib='fa5' name='portrait' width={px(80)} height={px(60)} size={px(32)} color={Global.colors.REGULAR_TEXT} />
          <Text style={styles.label}>{t('profile.avatar')}</Text>
          <View style={styles.avatarCol}>
            <View style={styles.avatarContainer}>
              <Icon iconLib='fa5' name='robot' width={px(60)} height={px(60)} size={px(40)}
                color={Global.colors.SECONDARY_TEXT} solid
              />
            </View>
          </View>
          <Icon iconLib='fa5' name='chevron-right' width={px(50)} height={px(50)} size={px(40)} color={Global.colors.PLACEHOLDER_TEXT} />
        </TouchableOpacity>
      </Card>
      <Card style={styles.card}>
        <TouchableOpacity style={styles.btnRow} onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.btnText}>{t('changePassword.title')}</Text>
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity style={styles.btnRow}>
          <Text style={[styles.btnText, { color: Global.colors.DANGER }]}>{t('base.signOut')}</Text>
        </TouchableOpacity>
      </Card>
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
    backgroundColor: Global.colors.BORDER_BASE,
  },
  label: {
    flex: .5,
    fontSize: px(32),
    color: Global.colors.PRIMARY_TEXT,
    fontWeight: '700',
  },
  value: {
    flex: 1,
    fontSize: px(28),
    color: Global.colors.REGULAR_TEXT,
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
    backgroundColor: Global.colors.BACKGROUND,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: px(30),
  },
  btnText: {
    fontSize: px(32),
    color: Global.colors.PRIMARY,
    fontWeight: '700',
  },
});

export default Profile;
