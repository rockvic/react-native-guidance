/**
 * Description : 多语言 - 英文语言包资源文件
 *               Languages - English resource file
 * Created on : 2022/1/9
 * Author : Victor Huang
 */

export default {
  base: {
    ok: 'Ok',
    confirm: 'Done',
    cancel: 'Cancel',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    submit: 'Submit',
    reset: 'Reset',
    replace: 'Replace',
    delete: 'Delete',
    openCameraRoll: 'Open Camera Roll',
    openSystemSettings: 'Open System Settings{{extInfo}}',
    fromCameraRoll: 'From Camera Roll',
    openCamera: 'Open Camera',
    takePicture: 'Take Picture',
    takeVideo: 'Take Video',
    discardChangesAlert: {
      title: 'Discard changes?',
      message: 'You have unsaved changes. Are you sure to discard them and leave the screen?',
      cancelBtnText: 'Don\'t leave',
      discardBtnText: 'Discard',
    },
    choosedItems_one: 'Choosed {{count}} item',
    choosedItems_other: 'Choosed {{count}} items',
    email: 'Email',
    newPassword: 'New Password',
    emailInputPlaceholder: 'Please enter your email',
    password: 'Password',
    passwordInputPlaceholder: 'Please enter your password',
  },
  navigation: {
    backText: 'Back',
    androidExitInfo: 'Pressing back again will exit the app.',
  },
  home: {
    tabName: {
      tutorial: 'Tutorial',
      search: 'Search',
      me: 'Me',
    },
  },
  turorial: {
    title: 'React Native Guidance',
  },
  search: {
    title: 'Search Tutorials',
  },
  me: {
    title: 'Me',
    dftAccountName: 'Must Not Be Named',
    stat: {
      openedTitle: 'Opened',
      openedUnit: 'times',
      totalTCTitle: 'Total',
      currentTCTitle: 'Current',
      hours: 'hrs', // hrs mins secs
      minutes: 'mins',
    },
    history: 'History',
  },
  profile: {
    title: 'Profile',
    avatar: 'Avatar',
    alias: 'Alias',
    setAlias: 'Set Alias',
  },
  changeBg: {
    title: 'Choose Background',
  },
  cameraRoll: {
    title: 'Camera Roll',
    permissionTitle: 'Album access requires authorization',
    permissionDeniedDesc: 'You have not obtained the album access permission, please authorize it first.',
    permissionNeverAskAgainDesc: 'You have set the permission to " Disable and no more queries ". You can access the Settings page to obtain the storage permission of the device.',
    requestPermission: 'Get Permission',
    allPhotos: 'All photos',
  },
  chooseAlbum: {
    title: 'Choose Album',
  },
  signIn: {
    title: 'Sign In',
    forgetPassword: 'Forget password? ',
    noAccount: 'Don\'t have a RNG account yet? ',
    toSignUp: 'Sign Up',
    success: 'Sign in successful!',
    valiInfo: {
      invalidEmail: 'That doesn\'t look like an email address.',
      pwdLessThan6: 'Your password needs 6+ characters.',
      wrongAcc: 'The account you entered does not exist.',
      wrongPwd: 'You entered a wrong password, please try again.',
    },
  },
  signUp: {
    title: 'Sign Up',
    tips: 'This is an example of a simulated registration. The data you fill in will be stored in the local storage with MD5 encryption, which will not cause leakage. Please use it with confidence.',
    accList: 'Accounts',
    success: 'Account created successfully! Signing in has been done automatically.',
    valiInfo: {
      existAccTitle: 'Duplicate account',
      existAccMsg: 'The account you entered already exists, please enter another email address to register. If you have forgotten the password of an existing account, please reset the password.',
      countErrTitle: 'Exceeded number of accounts',
      countErrMsg: 'Only 10 accounts are allowed to be stored locally. Please select an existing account to replace, or delete the existing account.',
    },
  },
  changePassword: {
    title: 'Change Password',
    success: 'Password changed successfully, please remember your new password!',
    valiInfo: {
      samePwd: 'The new password cannot be the same as the old password',
    },
  },
  resetPassword: {
    title: 'Reset Password',
    tips: 'This is a functional without business logic, which can be rewritten according to your own business in actual work!',
    alert: {
      title: 'Reset complete',
      message: 'The password has been reset to 111111, Please sign in now and change your password!',
    },
  },
};
