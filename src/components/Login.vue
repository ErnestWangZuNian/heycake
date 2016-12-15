<template>
    <div class="container">
        <div class="login-top">
            <div class="login-top-logo"></div>
        </div>
        <div class="login-content">
            <div class="g-login-content tel-phone">
                <label for="telphone"></label>
                <input type="number" id='telphone' name="telphone" placeholder="请输入手机号码" v-model="telphone" @focus="focusMethod('telphone')" @blur="blurMethod('telphone')">
            </div>
            <div class="g-login-content password">
                <label for="password"></label>
                <input type="password" id='password' name="password" placeholder="请输入登录密码" v-model="password" @focus="focusMethod('password')" @blur="blurMethod('password')">
            </div>
            <div class="g-login-content login-tip">
                <i></i>
                <span>未注册手机将自动创建为Heycake账户</span>
            </div>
            <div class="login-btn" @click='login'>
                登录/ 注册
            </div>
            <div class="login-intro">
              <p> 说明：登录/注册说明您已同意《heycake用户协议》</p>
              <p>找回密码，请致电：<strong>400-1139-499</strong></p>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    import { Toast,MessageBox } from 'mint-ui'
    import ajax from '../utils/ajax'
    export default {
      components: {
        Toast,
        MessageBox
      },
       methods: {
        // 登录
           login () {
             // 初始化用户信息
              let userInfo = {
                isLogin: false,
                userId: null
              }
              if(this.validator.telphone.isFlag && this.validator.password.isFlag){
                ajax.postDataToApi({
                  url: '/v1/authentication/login',
                  body: {
                    account: this.telphone,
                    password: this.password,
                  }
                },(response) => {
                  let token = response.data.body.session_token
                  userInfo.userId = response.data.body.user_id
                  // 获取登录成功后的用户信息并存入vuex的user
                  ajax.getDataFromApi({
                    url: '/v1/authentication/detection',
                    header: {'X-Overpowered-Token':token}
                  },(response) => {
                    Number(response.data.body) === 1 ? response.data.body = true :
                    response.data.body = false
                    let loginFlag = response.data.body
                    userInfo.isLogin = loginFlag
                    localStorage.setItem('userInfo', JSON.stringify(userInfo))
                    this.$store.dispatch('setUserInfo',userInfo)
                    location.href = '/#/site/index'
                  })
                },(error) => {
                  let err = error.data.code
                  if(err == '100002'){
                    Toast({
                      message: '密码错误，请重新输入',
                      position: 'top',
                    })
                    this.password = ''
                    this.validator.password.isFlag = false
                  }
                })
              }else{
                if(!this.validator.telphone.isFlag){
                  Toast({
                    message: this.validator.telphone.errText,
                    position: 'top',
                  })
                }else if(!this.validator.password.isFlag){
                  Toast({
                    message: this.validator.password.errText,
                    position: 'top',
                  })
                }
              }
            },
         //验证方法
         //验证focus
         focusMethod(currentObj){
           switch (currentObj){
             case 'telphone':
               this.validator.telphone.errIsShow = false
               break;
             case 'password':
               this.validator.password.errIsShow = false
               break;
           }
         },
         //验证blur
         blurMethod(currentObj){
           switch (currentObj){
             case 'telphone':
               let telRe = /^1[3|4|5|8]\d{9}$/
               let formDataTel = this.telphone
               let validatorTel = this.validator.telphone

               if(formDataTel === ''){
                 validatorTel.errText = '手机号码不能为空'
                 validatorTel.isFlag = false
               }else if(!telRe.test(formDataTel)){
                 validatorTel.errText = '请输入正确的手机号码'
                 validatorTel.isFlag = false
               }else{
                 validatorTel.isFlag = true
               }
               break;
             case 'password':
               let formDataCity = this.password
               let validatorCity = this.validator.password
               if(formDataCity === ''){
                 validatorCity.errText = '密码不能为空'
                 validatorCity.isFlag = false
               }else{
                 validatorCity.isFlag = true
               }
               break;
           }
         },
       },
       computed: {
          ...mapGetters({
              loginFlag: 'isLogin'
            }),
       },
       data () {
           return {
               telphone: '',
               password: '',
               validator:{
                 telphone:{
                   errText:'手机号码不能为空',
                   errIsShow: false,
                   isFlag: false
                 },
                 password:{
                   errText:'密码不能为空',
                   errIsShow: false,
                   isFlag: false
                 }
               }
           }
       }
    }
     require('../assets/scss/login.scss')
</script>
