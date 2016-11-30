<template>
    <div class="container">
        <div class="login-top">
            <div class="login-top-logo"></div>
        </div>
        <div class="login-content">
            <div class="g-login-content tel-phone">
                <label for="telphone"></label>
                <input type="text" id='telphone' name="telphone" placeholder="请输入手机号码" v-model="telphone">
            </div>
            <div class="g-login-content password">
                <label for="password"></label>
                <input type="text" id='password' name="password" placeholder="请输入登录密码"
                v-model="password">
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
    import ajax from '../utils/ajax'
    export default {
       methods: {
        // 登录
           login () {
              ajax.postDataToApi({
                  url: '/v1/authentication/login/',
                  body: {
                      account: this.telphone,
                      password: this.password,
                  }
              },(response) => {
                 // 获取登录成功后的用户信息并存入vuex的user
                  console.log('www1')
                    ajax.getDataFromApi({
                        url: 'v1/authentication/detection',
                    },(response) => {
                        console.log(response.data.body)
                    },(error) => {
                      console.log('dddasdsadsad')
                    })
              },(error) => {
                 
              })
            }
       },
       data () {
           return {
               telphone: '',
               password: '',
           }
       }
    }
     require('../assets/scss/login.scss')
</script>