module.exports = {
  // 基础类型输入框配置
  base: {
    name: {
      title: '收货人',
      placeholder: '名字'
    },
    tel: {
      error: true,
      title: '联系电话',
      inputType: 'number',
      placeholder: '请输入手机号'
    },
    address: {
      title: '详细地址',
      type: 'textarea',
      placeholder: '请输入详细地址'
    }
  }
};
