export default {
  required(value) {
    if (Array.isArray(value)) return value.length > 0;
    if (!value && value !== 0) return false;
    return value.toString().trim();
  },
  // 手机号码
  phone(value) {
    let valueString = value.toString();
    if (valueString.length !== 11) return false;
    return /^1[3456789]\d{9}$/.test(value);
  },
  min(value, args) {
    // value 为空时不执行
    if(!value && value + '' !== '0') return true;
    return value >= args;
  },
  // 数字
  number(value) {
    const reg = /^([0-9]*)$/;
    return !value || reg.test(value);
  },
  float(value, args = '') {
    const reg = new RegExp(`^((([1-9][0-9]*)|0)(\\.\\d{1,${args}})?)?$`);
    return reg.test(value);
  },
};