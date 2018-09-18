<template>
  <div class="login">
    <h1>爬虫旅游票务管理中心商家版</h1>

    <div class="box">
      
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
        <el-form-item prop="mobile">
          <el-input v-model="ruleForm.mobile" placeholder="请填写你的手机号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请填写你的密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
        </el-form-item>
        <div class="commit" @click="submitForm('ruleForm')"  v-loading.fullscreen.lock="fullscreenLoading">
          登录
        </div>
      </el-form>
    </div>
    
  </div>
</template>
<script>
  export default {
    name: 'Login',
    data () {
      return {
        fullscreenLoading: false,
        ruleForm: {
          mobile: '',
          password: ''
        },
         rules: {
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.fullscreenLoading = true;
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
            console.log(res);  
            this.fullscreenLoading = false;
            //状态码判断
            if(res.data.r != 1){
              this.$message.warning(res.data.msg);
              return
            }
            if(res.data.data.token){
              localStorage.setItem('token',res.data.data.token);  
               this.$router.push('/search');

            }
        }).catch((error) => {
          console.error('出错了', error);
        });
    
      }
    }
  
  }
</script>
<style scoped>

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
