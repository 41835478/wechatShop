//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    this.appInitial();
    return false;
    // 获取用户信息
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: function(res) {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onPageLoad: function (event) {
    let pageInstance = this.getAppCurrentPage();
    pageInstance.dataInitial();
    pageInstance.suspensionBottom();
  },
  // 初始化
  appInitial: function () {
    let that = this;

    this._getSystemInfo({
      success: function (res) {
        that.setSystemInfoData(res);
      }
    });
  },
  // 全局数据
  globalData: {
    appId: 'VPzgdVvg8T',
    formData: null,
    userInfo: {},
    systemInfo: null,
    sessionKey: '',
    isLogin: false,
    userInfo: null,
    isLogin: false,
    locationInfo: {
      latitude: '',
      longitude: '',
      address: ''
    },
    urlLocationId: '',
    wxParseOldPattern: '_listVesselRichText_',
    cdnUrl: '',
    defaultPhoto: 'http://cdn.jisuapp.cn/zhichi_frontend/static/webapp/images/default_photo.png',
    siteBaseUrl: 'https://wechat.cidianpu.com',
    appTitle: '茶具淘',
    appDescription: '茶具自销',
    appLogo: 'http://cdn.jisuapp.cn/zhichi_frontend/static/invitation/images/logo.png'
  },
  getAppId: function () {
    return this.globalData.appId;
  },
  getDefaultPhoto: function () {
    return this.globalData.defaultPhoto;
  },
  getSessionKey: function () {
    return this.globalData.sessionKey;
  },
  setSessionKey: function (session_key) {
    this.globalData.sessionKey = session_key;
    this.setStorage({
      key: 'session_key',
      data: session_key
    })
  },
  getWxParseOldPattern: function () {
    return this.globalData.wxParseOldPattern;
  },
  // 微信解析
  getWxParseResult: function (data, setDataKey) {
    var page = this.getAppCurrentPage();
    data = typeof data == 'number' ? '' + data : data;
    return WxParse.wxParse(setDataKey || this.getWxParseOldPattern(), 'html', data, page);
  },
  getAppTitle: function () {
    return this.globalData.appTitle;
  },
  getAppDescription: function () {
    return this.globalData.appDescription;
  },
  setLocationInfo: function (info) {
    this.globalData.locationInfo = info;
  },
  getLocationInfo: function () {
    return this.globalData.locationInfo;
  },
  getSiteBaseUrl: function () {
    return this.globalData.siteBaseUrl;
  },
  // 侧边栏
  suspensionBottom: function () {
    let pageInstance = this.getAppCurrentPage();
    for (let i in pageInstance.data) {
      if (/suspension/.test(i)) {
        let suspension = pageInstance.data[i],
          newdata = {};

        if (pageInstance.data.has_tabbar == 1) {
          newdata[i + '.suspension_bottom'] = (+suspension.suspension_bottom - 56) * 2.34;
        } else {
          newdata[i + '.suspension_bottom'] = (+suspension.suspension_bottom) * 2.34;
        }
        pageInstance.setData(newdata);
      }
    }
  },
  // 是否登录
  getIsLogin: function () {
    return this.globalData.isLogin;
  },
  // 设置登录状态
  setIsLogin: function (isLogin) {
    this.globalData.isLogin = isLogin;
  },
  // 是否登录
  isLogin: function () {
    return this.getIsLogin();
  },
  // 登录
  goLogin: function (options) {
    this._sendSessionKey(options);
  },
  // 获取用户信息
  getUserInfo: function () {
    return this.globalData.userInfo;
  },
  // 设置用户信息
  setUserInfoStorage: function (info) {
    for (var key in info) {
      this.globalData.userInfo[key] = info[key];//nickname,cover_thumb,user_token,telephone,province,city
    }
    this.setStorage({
      key: 'userInfo',
      data: this.globalData.userInfo
    })
  },
  // url跳转
  turnToPage: function (url, isRedirect) {
    var tabBarPagePathArr = this.getTabPagePathArr();
    if (tabBarPagePathArr.indexOf(url) != -1) {
      this.switchToTab(url);
      return;
    }
    if (!isRedirect) {
      wx.navigateTo({
        url: url
      });
    } else {
      wx.redirectTo({
        url: url
      });
    }
  },
  // 显示toast
  showToast: function (param) {
    wx.showToast({
      title: param.title,
      icon: param.icon,
      duration: param.duration || 1500,
      success: function (res) {
        typeof param.success == 'function' && param.success(res); // 成功回调
      },
      fail: function (res) {
        typeof param.fail == 'function' && param.fail(res);
      },
      complete: function (res) {
        typeof param.complete == 'function' && param.complete(res);
      }
    })
  },

  // 隐藏toast
  hideToast: function () {
    wx.hideToast();
  },
  // 获取系统信息
  getSystemInfoData: function () {
    let res;
    if (this.globalData.systemInfo) {
      return this.globalData.systemInfo;
    }
    try {
      res = this.getSystemInfoSync();
      this.setSystemInfoData(res);
    } catch (e) {
      this.showModal({
        content: '获取系统信息失败 请稍后再试'
      })
    }
    return res || {};
  },
  // 设置系统信息
  setSystemInfoData: function (res) {
    this.globalData.systemInfo = res;
  },
  // 系统分享
  onPageShareAppMessage: function (event) {
    let pageInstance = this.getAppCurrentPage();
    let pageRouter = pageInstance.page_router;
    let pagePath = '/pages/' + pageRouter + '/' + pageRouter;
    let desc = event.target ? event.target.dataset.desc : this.getAppDescription();

    pagePath += pageInstance.dataId ? '?detail=' + pageInstance.dataId : '';
    return this.shareAppMessage({ path: pagePath, desc: desc });
  },
  // 获取当前页面
  getAppCurrentPage: function () {
    var pages = getCurrentPages();
    return pages[pages.length - 1];
  },
  // 分享
  shareAppMessage: function (options) {
    var that = this;
    return {
      title: options.title || this.getAppTitle() || '小程序商城',
      desc: options.desc || this.getAppDescription() || '小程序商城',
      path: options.path,
      success: function () {
        //that.countUserShareApp();
      }
    }
  },
  // 支付
  wxPay: function (param) {
    var _this = this;
    wx.requestPayment({
      'timeStamp': param.timeStamp,
      'nonceStr': param.nonceStr,
      'package': param.package,
      'signType': 'MD5',
      'paySign': param.paySign,
      success: function (res) {
        _this.wxPaySuccess(param);
        typeof param.success === 'function' && param.success();
      },
      fail: function (res) {
        if (res.errMsg === 'requestPayment:fail cancel') {
          typeof param.fail === 'function' && param.fail();
          return;
        }
        if (res.errMsg === 'requestPayment:fail') {
          res.errMsg = '支付失败';
        }
        _this.showModal({
          content: res.errMsg
        })
        _this.wxPayFail(param, res.errMsg);
        typeof param.fail === 'function' && param.fail();
      }
    })
  },
  // 支付成
  wxPaySuccess: function (param) {
    var orderId = param.orderId,
      formId = param.package.substr(10);

    this.sendRequest({
      hideLoading: true,
      url: '/index.php?r=AppShop/SendXcxOrderCompleteMsg',
      data: {
        formId: formId,
        order_id: orderId
      }
    })
  },
  // 支付失败
  wxPayFail: function (param, errMsg) {
    var orderId = param.orderId,
      formId = param.package.substr(10);

    this.sendRequest({
      hideLoading: true,
      url: '/index.php?r=AppShop/SendXcxOrderCompleteMsg',
      data: {
        formId: formId,
        order_id: orderId,
        fail_reason: errMsg
      }
    })
  },
  // 重新发起页面
  reLaunch: function (options) {
    wx.reLaunch({
      url: options.url,
      success: options.success,
      fail: options.fail,
      complete: options.complete
    })
  },
  // 切换tab
  switchToTab: function (url) {
    wx.switchTab({
      url: url
    });
  },
  // 返回
  turnBack: function (options) {
    options = options || {};
    wx.navigateBack({
      delta: options.delta || 1
    });
  },
  // 链接到同一个公众号下的小程序
  navigateToXcx: function (param = {}) {
    let that = this;
    if (wx.navigateToMiniProgram) {
      wx.navigateToMiniProgram({
        appId: param.appId,
        path: param.path,
        fail: function (res) {
          if (res.errMsg != 'chooseImage:fail cancel') {
            that.showModal({
              content: '' + res.errMsg
            })
          }
        }
      });
    } else {
      this.showUpdateTip();
    }
  },
  // 设置页面标题
  setPageTitle: function (title) {
    wx.setNavigationBarTitle({
      title: title
    });
  },
  // 显示弹窗
  showModal: function (param) {
    wx.showModal({
      title: param.title || '提示',
      content: param.content,
      showCancel: param.showCancel || false,
      cancelText: param.cancelText || '取消',
      cancelColor: param.cancelColor || '#000000',
      confirmText: param.confirmText || '确定',
      confirmColor: param.confirmColor || '#3CC51F',
      success: function (res) {
        if (res.confirm) {
          typeof param.confirm == 'function' && param.confirm(res);
        } else {
          typeof param.cancel == 'function' && param.cancel(res);
        }
      },
      fail: function (res) {
        typeof param.fail == 'function' && param.fail(res);
      },
      complete: function (res) {
        typeof param.complete == 'function' && param.complete(res);
      }
    })
  },
  // 选择图片
  chooseImage: function (callback, count) {
    var that = this;
    wx.chooseImage({
      count: count || 1,
      sizeType: ['original', 'compressed'],// 原图，压缩
      sourceType: ['album', 'camera'], // 相册，相机
      success: function (res) {
        var tempFilePaths = res.tempFilePaths,
          imageUrls = [];

        that.showToast({
          title: '提交中...',
          icon: 'loading',
          duration: 10000
        });
        for (var i = 0; i < tempFilePaths.length; i++) {
          wx.uploadFile({
            url: that.globalData.siteBaseUrl + '/index.php?r=AppData/uploadImg',
            filePath: tempFilePaths[i],
            name: 'img_data',
            success: function (res) {
              var data = JSON.parse(res.data);
              if (data.status == 0) {
                imageUrls.push(data.data);
                if (imageUrls.length == tempFilePaths.length) {
                  that.hideToast();
                  typeof callback == 'function' && callback(imageUrls);
                }
              } else {
                that.hideToast();
                that.showModal({
                  content: data.data
                })
              }
            },
            fail: function (res) {
              that.hideToast();
              that.showModal({
                content: '' + res.errMsg
              });
            }
          })
        }
      },
      fail: function (res) {
        if (res.errMsg != 'chooseImage:fail cancel') {
          that.showModal({
            content: '' + res.errMsg
          })
        }
      }
    })
  },
  // 图片预览
  previewImage: function (options) {
    wx.previewImage({
      current: options.current || '',
      urls: options.urls || [options.current]
    })
  },
  // 打电话
  makePhoneCall: function (number, callback) {
    if (number.currentTarget) {
      var dataset = number.currentTarget.dataset;

      number = dataset.number;
    }
    wx.makePhoneCall({
      phoneNumber: number,
      success: callback
    })
  },
  // 获取位置信息
  getLocation: function (options) {
    wx.getLocation({
      type: 'wgs84',
      success: options.success,
      fail: options.fail
    })
  },
  // 打开地图选择位置。
  chooseLocation: function (options) {
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        options.success(res);
      },
      cancel: options.cancel,
      fail: options.fail
    });
  },
  // 使用微信内置地图查看位置。
  openLocation: function (options) {
    wx.openLocation(options);
  },
  // 设置剪贴板内容
  setClipboardData: function (options) {
    wx.setClipboardData({
      data: options.data || '',
      success: options.success,
      fail: options.fail,
      complete: options.complete
    })
  },
  // 获取剪贴板内容
  getClipboardData: function (options) {
    wx.getClipboardData({
      success: options.success,
      fail: options.fail,
      complete: options.complete
    })
  },
  // 显示当前页面转发按钮
  showShareMenu: function (options) {
    options = options || {};
    wx.showShareMenu({
      withShareTicket: options.withShareTicket || false,
      success: options.success,
      fail: options.fail,
      complete: options.complete
    });
  },
  // 扫码
  scanCode: function (options) {
    options = options || {};
    wx.scanCode({
      onlyFromCamera: options.onlyFromCamera || false, // 只允许相机扫码
      success: options.success,
      fail: options.fail,
      complete: options.complete
    })
  },
  // 页面滚动
  pageScrollTo: function (scrollTop) {
    if (wx.pageScrollTo) {
      wx.pageScrollTo({
        scrollTop: scrollTop
      });
    } else {
      this.showUpdateTip();
    }
  },
  showUpdateTip: function () {
    this.showModal({
      title: '提示',
      content: '您的微信版本不支持该功能，请升级更新后重试'
    });
  },
  // 获取用户当前设置信息
  getAuthSetting: function () {
    wx.getSetting({
      success: function (res) {
        return res.authSetting;
      },
      fail: function () {
        return {};
      }
    })
  },
  // 异步获取缓存
  getStorage: function (options) {
    options = options || {};
    wx.getStorage({
      key: options.key || '',
      success: function (res) {
        typeof options.success === 'function' && options.success(res);
      },
      fail: function () {
        typeof options.fail === 'function' && options.fail();
      },
      complete: function () {
        typeof options.complete === 'function' && options.complete();
      }
    })
  },
  // 异步设置缓存
  setStorage: function (options) {
    options = options || {};
    wx.setStorage({
      key: options.key || '',
      data: options.data || '',
      success: function () {
        typeof options.success === 'function' && options.success();
      },
      fail: function () {
        typeof options.fail === 'function' && options.fail();
      },
      complete: function () {
        typeof options.complete === 'function' && options.complete();
      }
    })
  },
  // 异步删除缓存
  removeStorage: function (options) {
    options = options || {};
    wx.removeStorage({
      key: options.key || '',
      success: function () {
        typeof options.success === 'function' && options.success();
      },
      fail: function () {
        typeof options.fail === 'function' && options.fail();
      },
      complete: function () {
        typeof options.complete === 'function' && options.complete();
      }
    })
  },
  // 创建动画
  createAnimation: function (options) {
    options = options || {};
    return wx.createAnimation({
      duration: options.duration,
      timingFunction: options.timingFunction,
      transformOrigin: options.transformOrigin,
      delay: options.delay
    });
  },
  // 获取用户地址原生界面
  chooseAddress: function (options) {
    options = options || {};
    wx.chooseAddress({
      success: function (res) {
        typeof options.success === 'function' && options.success(res);
      },
      fail: function () {
        typeof options.fail === 'function' && options.fail();
      },
      complete: function (res) {
        if (res && res.errMsg === 'chooseAddress:fail auth deny') {
          wx.showModal({
            title: '提示',
            content: '获取通信地址失败，这将影响您使用小程序，是否重新设置授权？',
            showCancel: true,
            cancelText: "否",
            confirmText: "是",
            success: function (res) {
              if (res.confirm) {
                wx.openSetting({
                  success: function (res) {
                    if (res.authSetting['scope.address'] === true) {
                      typeof options.success === 'function' && options.success(res);
                    }
                  }
                })
              } else if (res.cancel) {
                console.log('用户拒绝授权通信地址');
                typeof options.fail == 'function' && options.fail();
              }
            }
          })
        }
        typeof options.complete === 'function' && options.complete();
      }
    })
  },
  // 下载文件
  downloadFile: function (url, successfn) {
    wx.downloadFile({
      url: url,
      success: function (res) {
        successfn && successfn(res);
      }
    })
  },
  setPageUserInfo: function () {
    let currentPage = this.getAppCurrentPage();
    let newdata = {};

    newdata['userInfo'] = this.getUserInfo();
    currentPage.setData(newdata);
  },
  // 表单提交
  submitForm: function (event) {
    let dataset = event.currentTarget.dataset;
    let pageInstance = this.getAppCurrentPage();
    let _this = this;
    let form = dataset.form;
    let form_data = pageInstance.data.form_data;
    let field_info = pageInstance.data.field_info;
    let content = pageInstance.data.content;
    let formEleType = ['input-ele', 'textarea-ele', 'grade-ele', 'select-ele', 'upload-img', 'time-ele'];

    if (!util.isPlainObject(form_data)) {
      for (let index = 0; index < content.length; index++) {
        if (formEleType.indexOf(content[index].type) == -1) {
          continue;
        }
        let customFeature = content[index].customFeature,
          segment = customFeature.segment,
          ifMust = content[index].segment_required;

        if ((!form_data[segment] || form_data[segment].length == 0) && ifMust == 1) {
          _this.showModal({
            content: field_info[segment].title + ' 没有填写'
          });
          return;
        }
      }

      if (pageInstance.data.submitting) return;
      let newdata = {};
      newdata['submitting'] = true;
      pageInstance.setData(newdata);

      _this.sendRequest({
        hideLoading: true,
        url: '/index.php?r=AppData/addData',
        data: {
          form: form,
          form_data: form_data
        },
        method: 'POST',
        success: function (res) {
          _this.showToast({
            title: '提交成功',
            icon: 'success'
          });
        },
        complete: function () {
          let newdata = {};
          newdata['submitting'] = false;
          pageInstance.setData(newdata);
        }
      })
    } else {
      _this.showModal({
        content: '这个表单什么都没填写哦！'
      });
    }
  },
  // 表单上传
  uploadFormImg: function (event) {
    let dataset = event.currentTarget.dataset;
    let pageInstance = this.getAppCurrentPage();
    let datakey = dataset.datakey;
    let segment = dataset.segment;

    this.chooseImage(function (res) {
      let img_src = res[0];
      let newdata = pageInstance.data;
      typeof (newdata['content']) == 'object' ? '' : newdata['content'] = [];
      typeof (newdata[datakey]) == 'object' ? '' : newdata[datakey] = [];
      newdata[datakey].push(img_src);
      newdata['display_upload'] = false;
      newdata['content'].push(img_src);
      pageInstance.setData(newdata);
    });
  },
  // 删除上传的图片
  deleteUploadImg: function (event) {
    let dataset = event.currentTarget.dataset;
    let pageInstance = this.getAppCurrentPage();
    let index = dataset.index;
    let datakey = dataset.datakey;
    let newdata = pageInstance.data;
    this.showModal({
      content: '确定删除该图片？',
      confirm: function () {
        newdata['content'].splice(index, 1);
        newdata[datakey].splice(index, 1);
        pageInstance.setData(newdata);
      }
    })
  },
  // 选择地址
  selectLocal: function (event) {
    let id = event.currentTarget.dataset.id;
    let pageInstance = this.getAppCurrentPage();
    let newdata = pageInstance.data;

    newdata[id].hidden = typeof (pageInstance.data[id].hidden) == undefined ? false : !pageInstance.data[id].hidden;
    newdata[id].provinces = ['请选择']; 
    newdata[id].citys = ['请选择']; 
    newdata[id].districts = ['请选择']
    newdata[id].provinces_ids = [null]; newdata[id].city_ids = [null]; newdata[id].district_ids = [null];
    for (var i in newdata[id].areaList) {
      newdata[id].provinces.push(newdata[id].areaList[i].name);
      newdata[id].provinces_ids.push(newdata[id].areaList[i].region_id);
    }
    newdata[id].newlocal = '';
    pageInstance.setData(newdata);
  },
  // 处理数字
  handlingNumber: function (num) {
    num = +num;
    if (num > 1000000) { //大于百万直接用万表示
      return Math.floor(num / 10000) + '万';
    } else if (num > 10000) { //大于一万小于百万的保留一位小数
      return (num / 10000).toString().replace(/([0-9]+.[0-9]{1})[0-9]*/, "$1") + '万';
    } else {
      return num;
    }
  },
  // 转向搜索
  turnToSearchPage: function (event) {
    if (event.target.dataset.param) {
      this.turnToPage('/pages/advanceSearch/advanceSearch?param=' + event.target.dataset.param);
    } else {
      this.turnToPage('/pages/advanceSearch/advanceSearch?form=' + event.target.dataset.form);
    }
  },
  // 评论商品
  publishComment: function (event) {
    let dataset = event.currentTarget.dataset;
    let _this = this;
    let pageInstance = this.getAppCurrentPage();
    let compid = dataset.compid;
    let bbsData = pageInstance.data[compid];
    let comment = bbsData.comment;
    let param;

    if (!comment.text || !comment.text.trim()) {
      this.showModal({
        content: '请输入评论内容'
      })
      return;
    }

    comment.text = encodeURIComponent(comment.text);

    delete comment.showReply;
    comment.addTime = util.formatTime();

    param = {};
    param.nickname = _this.globalData.userInfo.nickname;
    param.cover_thumb = _this.globalData.userInfo.cover_thumb;
    param.user_token = _this.globalData.userInfo.user_token;
    param.page_url = pageInstance.page_router;
    param.content = comment;
    param.rel_obj = '';
    if (bbsData.customFeature.ifBindPage && bbsData.customFeature.ifBindPage !== 'false') {
      if (pageInstance.page_form && pageInstance.page_form != 'none') {
        param.rel_obj = pageInstance.page_form + '_' + pageInstance.dataId;
      } else {
        param.rel_obj = pageInstance.page_router;
      }
    } else {
      param.rel_obj = _this.getAppId();
    }

    this.sendRequest({
      url: '/index.php?r=AppData/addData',
      method: 'post',
      data: {
        form: 'bbs',
        form_data: param
      },
      success: function (res) {
        var commentList = pageInstance.data[compid].content.data || [],
          newdata = {};

        param.id = res.data;
        param.content.text = decodeURI(param.content.text)
        newdata[compid + '.content.data'] = [{
          form_data: param,
          count_num: 0
        }].concat(commentList);
        newdata[compid + '.content.count'] = +pageInstance.data[compid].content.count + 1;
        newdata[compid + '.comment'] = {};

        pageInstance.setData(newdata);
      }
    })
  },
  // 页面跳转
  turnToGoodsDetail: function (event) {
    let dataset = event.currentTarget.dataset;
    let id = dataset.id;
    let contact = dataset.contact;
    let goodsType = dataset.goodsType;
    let hidestock = dataset.hidestock;
    let isShowVirtualPrice = dataset.isshowvirtualprice;

    //this.turnToPage('/pages/goodsDetail/goodsDetail?detail=' + id + '&contact=' + contact + '&hidestock=' + hidestock + '&isShowVirtualPrice=' + isShowVirtualPrice);
    this.turnToPage('/pages/toStoreDetail/toStoreDetail?detail=' + id);
  },
  // 用户中心页面跳转
  userCenterTurnToPage: function (event) {
    let that = this;
    if (this.isLogin()) {
      this._userCenterToPage(event);
    } else {
      this.goLogin({
        success: function () {
          that._userCenterToPage(event);
        }
      });
    }
  },
  _userCenterToPage: function (event) {
    let dataset = event.currentTarget.dataset;
    let router = dataset.router;
    let openVerifyPhone = dataset.openVerifyPhone;
    let that = this;
    let goodsType = dataset.goodsType;
    let currentIndex = event.target.dataset.index;

    if (router === 'userCenter' && this.isLogin() !== true) {
      this.goLogin({
        success: function () {
          that.turnToPage('/pages/' + router + '/' + router + '?from=userCenterEle');
        }
      })
      return;
    }

    if (router === 'myOrder' && goodsType != undefined) {
      this.turnToPage('/pages/' + router + '/' + router + '?from=userCenterEle&goodsType=' + goodsType + '&currentIndex=' + currentIndex);
        return;
    }
    this.turnToPage('/pages/' + router + '/' + router + '?from=userCenterEle');
    
  },
  // session key
  _sendSessionKey: function (options) {
    var that = this;
    try {
      var key = wx.getStorageSync('session_key');
    } catch (e) {
      console.log('wx.getStorageSync session_key error');
      console.log(e);
    }

    if (! key) {
      console.log("check login key=====");
      this._login(options);
    } else {
      this.globalData.sessionKey = key;
      this.sendRequest({
        hideLoading: true,
        url: '/index.php?r=AppUser/onLogin',
        success: function (res) {
          if (!res.is_login) {
            that._login(options);
            return;
          } 
          that._requestUserInfo(res.is_login, options);
        },
        fail: function (res) {
          console.log('_sendSessionKey fail');
          typeof options.fail == 'function' && options.fail();
        }
      });
    }
  },
  _requestUserInfo: function (is_login, options) {
    if (is_login == 1) {
      this._requestUserSiteInfo(options); // 获取自身用户信息
    } else {
      this._requestUserWxInfo(options); // 获取微信用户信息
    }
  },
   // 获取自身用户信息
  _requestUserSiteInfo: function (options) {
    var that = this;
    this.sendRequest({
      hideLoading: true,
      url: '/index.php?r=AppData/getUserInfo',
      success: function (res) {
        if (res.data) {
          that.setUserInfoStorage(res.data);
        }
        that.setIsLogin(true);
        typeof options.success === 'function' && options.success();
      },
      fail: function (res) {
        console.log('_requestUserXcxInfo fail');
      }
    })
  },
  // 获取微信授权用户信息
  _requestUserWxInfo: function (options) {
    var that = this;

    wx.getUserInfo({
      success: function (res) {
        that._sendUserInfo(res.userInfo, options);
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '获取用户信息失败，这将影响您使用小程序，是否重新设置授权？',
          showCancel: true,
          cancelText: "否",
          confirmText: "是",
          success: function (res) {
            if (res.confirm) {
              wx.openSetting({
                success: function (res) {
                  if (res.authSetting['scope.userInfo'] === true) {
                    that._requestUserWxInfo(options);
                  }
                }
              })
            } else if (res.cancel) {
              console.log('用户取消授权个人信息');
              typeof options.fail == 'function' && options.fail();
            }
          }
        })
      }
    })
  },
  // 保存微信用户信息
  _sendUserInfo: function (userInfo, options) {
    var that = this;
    this.sendRequest({
      hideLoading: true,
      url: '/index.php?r=AppUser/LoginUser',
      method: 'post',
      data: {
        nickname: userInfo['nickName'],
        gender: userInfo['gender'],
        city: userInfo['city'],
        province: userInfo['province'],
        country: userInfo['country'],
        avatarUrl: userInfo['avatarUrl']
      },
      success: function (res) {
        that.setUserInfoStorage(res.data.user_info);
        typeof options.success === 'function' && options.success();
        that.setIsLogin(true);
      },
      fail: function (res) {
        console.log('_requestUserXcxInfo fail');
        typeof options.fail == 'function' && options.fail(res);
      }
    })
  },
  // 微信登录
  _login: function (options) {
    var that = this;

    wx.login({
      success: function (res) {
        if (res.code) {
          that._sendCode(res.code, options);
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail: function (res) {
        console.log('login fail: ' + res.errMsg);
      }
    })
  },
  // 以code 换session_key openid等
  _sendCode: function (code, options) {
    var that = this;
    this.sendRequest({
      hideLoading: true,
      url: '/index.php?r=AppUser/onLogin',
      data: {
        code: code
      },
      success: function (res) { // openid + session_key => 生成自己的session。api请求依据session
        that.setSessionKey(res.data);
        that._requestUserInfo(res.is_login, options);
      },
      fail: function (res) {
        console.log('_sendCode fail');
      }
    })
  },
  //请求api
  sendRequest: function (param, baseUrl) {
    let that = this;
    let data = param.data || {};
    let header = param.header;
    let requestUrl;

    if (data.app_id) {
      data._app_id = data.app_id;
    } else {
      data._app_id = data.app_id = this.getAppId();
    }

    if (!this.globalData.notBindXcxAppId) {
      data.session_key = this.getSessionKey();
    }

    if (baseUrl) {
      requestUrl = baseUrl + param.url;
    } else {
      requestUrl = this.globalData.siteBaseUrl + param.url;
    }

    if (param.method) {
      if (param.method.toLowerCase() == 'post') {
        data = this._modifyPostParam(data);
        header = header || {
          'content-type': 'application/x-www-form-urlencoded;'
        }
      }
      param.method = param.method.toUpperCase();
    }

    if (!param.hideLoading) {
      this.showToast({
        title: '请求中...',
        icon: 'loading'
      });
    }
    wx.request({
      url: requestUrl,
      data: data,
      method: param.method || 'GET',
      header: header || {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode && res.statusCode != 200) { // http 状态
          that.hideToast();
          that.showModal({
            content: '' + res.errMsg
          });
          typeof param.successStatusAbnormal == 'function' && param.successStatusAbnormal(res.data);
          return;
        }
        if (res.data.status) {
          if (res.data.status == 2 || res.data.status == 401) {
            // 未登录
            that.goLogin({
              success: function () {
                that.sendRequest(param, baseUrl);
              },
              fail: function () {
                typeof param.successStatusAbnormal == 'function' && param.successStatusAbnormal(res.data);
              }
            });
            return;
          }
          if (res.data.status != 0) {
            that.hideToast();
            that.showModal({
              content: '' + res.data.data,
              confirm: function () {
                typeof param.successShowModalConfirm == 'function' && param.successShowModalConfirm(res.data);
              }
            });
            typeof param.successStatusAbnormal == 'function' && param.successStatusAbnormal(res.data);
            return;
          }
        }
        typeof param.success == 'function' && param.success(res.data);
      },
      fail: function (res) {
        that.hideToast();
        that.showModal({
          content: '请求失败 ' + res.errMsg
        })
        typeof param.fail == 'function' && param.fail(res.data);
      },
      complete: function (res) {
        param.hideLoading || that.hideToast();
        typeof param.complete == 'function' && param.complete(res.data);
      }
    });
  },
  // post提交参数修改
  _modifyPostParam: function (obj) {
    let query = '';
    let name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
      value = obj[name];

      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += this._modifyPostParam(innerObj) + '&';
        }
      } else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += this._modifyPostParam(innerObj) + '&';
        }
      } else if (value !== undefined && value !== null) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  },
  // 获取系统信息
  _getSystemInfo: function (options) {
    wx.getSystemInfo({
      success: function (res) {
        typeof options.success === 'function' && options.success(res);
      },
      fail: function (res) {
        typeof options.fail === 'function' && options.fail(res);
      },
      complete: function (res) {
        typeof options.complete === 'function' && options.complete(res);
      }
    });
  },
})