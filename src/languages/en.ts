/**
 * Description : 多语言 - 英文语言包资源文件
 *               Languages - English resource file
 * Created on : 2022/1/9
 * Author : Victor Huang
 */

export default {
  base: {
    confirm: 'OK',
    cancel: 'Cancel',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    submit: 'Submit',
    reset: 'Reset',
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
    emailInputPlaceholder: 'Please input your email',
    password: 'Password',
    passwordInputPlaceholder: 'Please input your password',
  },
  navigation: {
    backText: 'Back',
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
  },
  profile: {
    title: 'Profile',
    avatar: 'Avatar',
    alias: 'Alias',
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
    valiInfo: {
      invalidEmail: 'That doesn\'t look like an email address.',
      pwdLessThan6: 'Your password needs 6+ characters.',
    },
  },
  signUp: {
    title: 'Sign Up',
    tips: 'This is an example of a simulated registration. The data you fill in will be stored in the local storage with MD5 encryption, which will not cause leakage. Please use it with confidence.',
  },
  changePassword: {
    title: 'Change Password',
  },
  resetPassword: {
    title: 'Reset Password',
  },
};
