/**
 * 所有公用过滤器
 */

/**
 * 格式化卡号，显示卡号后4位，前面所有数字显示为 *
 * @param  {[string]}
 * @return {[string]}
 */
export function filterCardNumLast4(cn: string) {
  if (cn !== null) { return `**** **** ${cn.substr(cn.length - 4)}`; }
}

/**
 * 格式化身份证号，显示前4位及后4位，中间的所有数字显示为 *
 * @param  {[type]}
 * @return {[type]}
 */
export function filterIdCard(cn: string) {
  let rtn = '';
  if (cn !== null) {
    rtn = cn.substr(0, 4);
    rtn += ' ****** ****** ';
    rtn += cn.substr(cn.length - 4);
  }
  return rtn;
}

/**
 * 格式化电话号码，显示前3位及后4位，中间的所有数字显示为 *
 * @param  {[type]}
 * @return {[type]}
 */
export function filterMobile(cn: string) {
  let rtn = '';
  if (cn !== null) {
    rtn = cn.substr(0, 3);
    rtn += ' **** ';
    rtn += cn.substr(cn.length - 4);
  }
  return rtn;
}

/**
 * 格式化卡号为每4为加一空格
 */
export function filterBankCard(cn: string) {
  let rtn = '';
  for (let i = 0; cn && i <= cn.length; i++) {
    if (i !== 0 && i % 4 === 0) { rtn += ' '; }
    rtn += cn.substr(i, 1);
  }
  return rtn;
}

/**
 * 格式化电子邮箱格式为 xx****@xxxx.com
 * @param {*} email 
 * @returns 
 */
export function filterEmail(email: string) {
  if (!email) return '';
  const atIdx = email.indexOf('@');
  const account = email.substr(0, atIdx);
  const site = email.substr(atIdx, email.length - 1);
  console.log(account, site);
  return `${account.length > 2 ? account.substr(0, 2) : account}****${site}`;
}

/**
 * 数字格式化金额，整数位每三位用逗号隔开，小数点保留n位(默认保留两位)
 */
export function filterMoney(s: string, n: number) {
  if (s !== null && typeof s !== 'undefined') {
    n = n > 0 && n <= 20 ? n : 2;
    s = `${parseFloat((`${s}`).replace(/[^\d\.-]/g, '')).toFixed(n)}`;
    let l = s.split('.')[0].split('').reverse(),
      r = s.split('.')[1];
    let t = '';
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
    }
    return `${t.split('').reverse().join('')}.${r}`;
  }
  return null;
}
