/**
 * Description : 多语言 - 中文简体语言包资源文件
 *               Languages - Chinese (Simplified) resource file
 * Created on : 2022/1/8
 * Author : Victor Huang
 */

export default {
  base: {
    ok: '确定',
    confirm: '确认',
    cancel: '取消',
    signUp: '注册',
    signIn: '登录',
    signOut: '退出',
    submit: '提交',
    reset: '清除',
    replace: '替换',
    delete: '删除',
    openCameraRoll: '从相册选取',
    openSystemSettings: '打开设置界面{{extInfo}}',
    fromCameraRoll: '来自相册',
    openCamera: '打开相机',
    takePicture: '拍照',
    takeVideo: '录制视频',
    discardChangesAlert: {
      title: '丢弃更改内容？',
      message: '此界面中的部分数据已经更改，您确认不保存数据直接退出吗？',
      cancelBtnText: '暂不退出',
      discardBtnText: '丢弃并退出',
    },
    choosedItems_one: '已选中 {{count}} 项',
    choosedItems_other: '已选中 {{count}} 项',
    email: '电子邮箱',
    emailInputPlaceholder: '请输入您的电子邮箱',
    password: '密码',
    newPassword: '新密码',
    passwordInputPlaceholder: '请输入您的密码',
  },
  navigation: {
    backText: '返回',
    androidExitInfo: '再按一次后退将退出应用',
  },
  home: {
    tabName: {
      tutorial: '教程',
      search: '搜索',
      me: '我的',
    },
  },
  turorial: {
    title: 'React Native Guidance',
  },
  search: {
    title: '搜教程',
  },
  me: {
    title: '我的',
    dftAccountName: 'Must Not Be Named',
    stat: {
      openedTitle: '打开',
      openedUnit: '次',
      totalTCTitle: '总耗时',
      currentTCTitle: '本次耗时',
      hours: '小时',
      minutes: '分钟',
    },
    history: '浏览记录',
  },
  profile: {
    title: '个人资料',
    avatar: '头像',
    alias: '昵称',
    setAlias: '设置昵称',
  },
  changeBg: {
    title: '选择背景',
  },
  cameraRoll: {
    title: '相册',
    permissionTitle: '相册访问需授权',
    permissionDeniedDesc: '您还未获取相册访问权限，请先进行授权。',
    permissionNeverAskAgainDesc: '您已将该权限设置为“禁止后不再询问”，请打开设置界面获取此设备的存储权限。',
    requestPermission: '点击获取权限',
    allPhotos: '所有照片',
  },
  chooseAlbum: {
    title: '选择相册',
  },
  signIn: {
    title: '登录',
    forgetPassword: '忘记密码？',
    noAccount: '没有 RNG 账户？',
    toSignUp: '注册一个',
    success: '登录成功！',
    valiInfo: {
      invalidEmail: '这看起来不是一个合规的电子邮箱地址',
      pwdLessThan6: '密码长度不能小于 6 位',
      wrongAcc: '您输入的账号不存在',
      wrongPwd: '您输入的密码不正确，请重新输入',
    },
  },
  signUp: {
    title: '注册新账户',
    tips: '这是一个模拟注册的例子，您填写的数据都会以 MD5 加密存放在本地存储中，不会造成泄露，请放心使用！',
    accList: '账户列表',
    success: '账户创建成功！已自动为您完成登录操作。',
    valiInfo: {
      existAccTitle: '账户重复',
      existAccMsg: '您输入的账户已经存在，请输入其它电子邮箱进行注册。如果您遗忘了已有账户的密码，请通过“重置密码”功能进行密码重置。',
      countErrTitle: '账户数量超限',
      countErrMsg: '本地最多只允许存储 10 个账户，请选择已存在的账户进行替换，或删除现有账户。',
    },
  },
  changePassword: {
    title: '修改密码',
    success: '密码修改成功，请牢记您的新密码！',
    valiInfo: {
      samePwd: '新密码不能与老密码相同',
    },
  },
  resetPassword: {
    title: '重置密码',
    tips: '这是一个毫无业务逻辑的功能界面，实际工作中可按照自己的业务逻辑重新编写！',
    alert: {
      title: '重置完成',
      message: '密码已重置为 111111，请立即重新登录并更改密码！',
    },
  },
};
