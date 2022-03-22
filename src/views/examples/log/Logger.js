/**
 * 公共日志处理
 */
import {Platform} from 'react-native';
import moment from 'moment';
import fs, {
  DocumentDirectoryPath,
  ExternalDirectoryPath,
  ExternalStorageDirectoryPath,
  CachesDirectoryPath,
  LibraryDirectoryPath,
} from 'react-native-fs';
import Global from '../Global';
import {logger} from 'react-native-logs';
import {rnFsFileAsync} from 'react-native-logs/dist/transports/rnFsFileAsync';
// import { colorConsoleAfterInteractions }  from "react-native-logs/dist/transports/colorConsoleAfterInteractions";

console.log('DocumentDirectoryPath:', DocumentDirectoryPath);
console.log('ExternalDirectoryPath:', ExternalDirectoryPath);
console.log('ExternalStorageDirectoryPath:', ExternalStorageDirectoryPath);
console.log('CachesDirectoryPath:', CachesDirectoryPath);
console.log('LibraryDirectoryPath:', LibraryDirectoryPath);

// 日志保留天数
const logRetainDays = 7;
// 当前日期
const today = moment().format('YYYY-MM-DD');
// 日志存储路径
const loggerPath =
  Platform.OS === 'ios'
    ? `${LibraryDirectoryPath}/logs`
    : `${ExternalStorageDirectoryPath}/org/trueland/rng/logs`;
// 日志文件名前缀
const loggerNamePrefix = 'RNG_LOG_';
// （当天）日志名称
const loggerName = `${loggerNamePrefix}${today}`;
// 日志文件扩展名
const loggerExt = '.log';
// （当天）日志文件全路径
const fullPath = `${loggerPath}/${loggerName}${loggerExt}`;

var log = null;

/**
 * 自定义transport，将log转换为 console.log
 * logger会将对象转换为字符串，使用此自定义transport，
 * 以保证在浏览器调试console中能直接浏览对象
 * @param {*} msg
 * @param {*} level
 */
const customTransport = (msg, level /* , options */) => {
  // console.log("msg:", msg);
  // console.log("level:", level);
  // console.log("options:", options);
  console.log(
    `${moment().format('YYYY-MM-DD HH:mm:ss SSS')} | ${level.text} | `,
    msg,
  );
};

/**
 * 清理过期日志
 */
const cleanOverdueLogs = () => {
  let retainFileNames = `${loggerNamePrefix}${today}${loggerExt}`;
  for (let i = 1; i <= logRetainDays; i++) {
    // 日期减 i 天
    let retainDay = moment().subtract(i, 'days').format('YYYY-MM-DD');
    retainFileNames += `;${loggerNamePrefix}${retainDay}${loggerExt}`;
  }
  // console.log("retainFileNames:", retainFileNames);
  fs.readDir(loggerPath)
    .then(result => {
      // console.log(result);
      for (let file of result) {
        // console.log(file);
        if (file.isFile() && retainFileNames.indexOf(file.name) === -1) {
          fs.unlink(`${loggerPath}/${file.name}`)
            .then(() => {
              console.log(
                `Delete overdue log ${loggerPath}/${file.name} successfully.`,
              );
            })
            .catch(err => {
              console.log(
                `Delete overdue log ${loggerPath}/${file.name} error : `,
                err.message,
              );
            });
        }
      }
    })
    .catch(e => {
      console.log('Read logs folder error : ', e);
    });
};

/**
 * 初始化日志工具
 */
const initLogger = () => {
  const config = {
    transport: (msg, level, options) => {
      // colorConsoleAfterInteractions(msg, level, options);
      try {
        rnFsFileAsync(msg, level, options);
      } catch (e) {
        console.log('Log rnFsFileAsync() : ', e);
      }
      customTransport(msg, level, options);
    },
    transportOptions: {
      dateFormat: 'local',
      hideLevel: false,
      loggerName: loggerName,
      loggerPath: loggerPath,
    },
  };
  log = logger.createLogger(config);

  // 根据Global里的运行模式变更日志级别
  if (Global.mode === Global.MODE_DEV) {
    log.setSeverity('debug');
  } else if (Global.mode === Global.MODE_TEST) {
    log.setSeverity('info');
  } else {
    log.setSeverity('info');
    // log.setSeverity("error");
  }

  // 清理过期日志
  cleanOverdueLogs();
};

/**
 * 初始化日志环境
 */
const initLoggerEnv = async () => {
  const existLogFile = await fs.exists(`${fullPath}`);
  if (!existLogFile) {
    const existLogDir = await fs.exists(`${loggerPath}`);
    if (!existLogDir) {
      await fs.mkdir(`${loggerPath}`);
    }
    await fs.writeFile(fullPath, `MWM trolley APP Logs - ${today}\n`, 'utf8');
  }
  // 初始化日志工具
  initLogger();
  return true;
};

export {initLoggerEnv, log};
