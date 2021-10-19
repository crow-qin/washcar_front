import _ from 'loadsh';
import reg from './RegExp.util.js';

// 默认
let _rules = [];
let _trigger = 'submit';

const validatorUtil = {
  TRIGGER: {
    SUBMIT: 'submit',
    CHANGE: 'change',
    BLUR: 'blur',
  },

  generate(trigger) {
    trigger = trigger || _trigger;
    const rules = [];
    rules.push({
      required: _rules.some(({ required }) => required),
      validator: ((rules) => (rule, value, callback) => {
        for(const i in rules) {
          const rule = rules[i];
          if(_.isFunction(rule.validator)) {
            if(!rule.validator(value)) {
              callback(new Error(rule.message));
              return;  
            }
          }
        }
        callback();
      })(_rules),
      trigger,
    });
    _rules = [];
    return rules;
  },
  // 必填
  required(message) {
    _rules.push({
      required: true,
      validator: value => reg.required(value),
      message: message || '不能为空',
    });
    return this;
  },
  // 手机号码
  phone(message) {
    _rules.push({
      required: true,
      validator: value => reg.phone(value),
      message: message || '不符合手机格式'
    });
    return this;
  },
  min(min, message) {
    _rules.push({
      required: true,
      validator: value => reg.min(value, min),
      message: message || `最小值为${min}`,
    });
    return this;
  },
  digit(message) {
    _rules.push({
      required: true,
      validator: value => !isNaN(value) && !/^0+[0-9]+$/.test(value),
      message: message || '请输入数字', 
    });
    return this;
  },
  // 小数位
  float(decimals, message) {
    _rules.push({
      required: true,
      validator: value => reg.float(value, decimals),
      message: message || `最多${decimals}位小数`
    });
    return this;
  }
};

export default validatorUtil;
