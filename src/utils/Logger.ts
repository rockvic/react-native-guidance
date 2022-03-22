/**
 * 公共日志处理
 */
import {
  logger,
  consoleTransport,
  transportFunctionType,
} from 'react-native-logs';
import moment from 'moment';

// debug/release mode
console.log('__DEV__:', __DEV__);
console.log('process.env.NODE_ENV:', process.env.NODE_ENV);

/**
 * 自定义transport，将log转换为 console.log
 * logger会将对象转换为字符串，使用此自定义transport，
 * 以保证在浏览器调试console中能直接浏览对象
 * @param props {
    msg: any;
    rawMsg: any;
    level: {
        severity: number;
        text: string;
    };
    extension?: string | null | undefined;
    options?: any;
  }
 * @returns true|false
 */
const customTransport: transportFunctionType = props => {
  // console.log('Logger.customTransport() > props:', props);
  console.log(
    `${moment().format('YYYY-MM-DD HH:mm:ss SSS')} | ${props.level.text} : `,
    ...props.rawMsg,
  );
  return true;
};

// 默认配置
const defaultConfig = {
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3,
  },
  // 开发模式日志级别设置为 'debug'，发布模式日志级别设置为 'info'(info warn error 都记录)
  severity: __DEV__ ? 'debug' : 'info',
  // 开发模式使用自定义日志输出函数，发布模式使用 consoleTransport
  transport: __DEV__ ? customTransport : consoleTransport,
  transportOptions: {
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright',
    },
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  enabled: true,
};

const log = logger.createLogger(defaultConfig);

export default log;
