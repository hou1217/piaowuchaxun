<template>
  <div class="login">
    <h1>爬虫旅游票务管理中心商家版</h1>

    <div class="box">
      <input type="text" placeholder="请填写你的手机号" v-model="ruleForm.mobile">
      <br>
      <input type="password" placeholder="请填写你的密码" v-model="ruleForm.password">
      <div class="commit" @click="submitForm('ruleForm')">登陆</div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Login',
    data () {
      return {
        ruleForm: {
          mobile: '',
          password: ''
        },
      }
    },
    methods: {
      submitForm(formName) {
        let _this = this;
        const options = {
          method: 'POST',
          url:"http://app.tianxiayunyou.com:8092/api/loginByPwd",
          params:{
            mobile: this.ruleForm.mobile,
            password: this.ruleForm.password
          }
        };
        console.log(options);
        this.$axios(options).then((res) => {
            console.log(res.data.data);  
            localStorage.setItem('token',res.data.data.token);     
            this.$router.push('/search');
        }).catch((error) => {
          console.error('出错了', error);
        });
    
      }
    }
  
  }
</script>
<style>

h1{
  color: #fff;
  text-align: center;
}
.box{
  width: 300px;
  height: 600px;
  margin: 150px auto;
  text-align: center;
}
.box input{
  width: 300px;
  padding-left: 15px;
  height: 25px;
  border-radius: 10px;
}
.box input:nth-child(1){
  margin-bottom: 15px;
}
.box .commit{
  width: 150px;
  height: 50px;
  line-height: 50px;
  margin: 45px auto;
  background: rgb(87, 192, 187);
  color: #fff;
}
</style>
