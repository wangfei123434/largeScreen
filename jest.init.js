const vueUtils = require('@vue/test-utils');
const Element = require('element-plus');
const locale = require("element-plus/lib/locale/lang/zh-cn");
vueUtils.config.global.plugins = [[Element, { locale }]]