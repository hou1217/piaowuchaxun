<template>
  <div class="login">
    <h1>爬虫旅游票务管理中心商家版</h1>

    <div class="box">
      <div class="choose">
        <div @click="changeToNum">查询码</div>
        <div @click="changeToMobile">手机号</div>
      </div>
      <input type="text" placeholder="请输入8位数字查询码" v-model="number" v-if="numberState">
      <input type="text" placeholder="请输入手机号" v-model="mobile" v-if="mobileState">
      <div class="commit" v-if="numberState">
        <router-link :to="{
          path:'/result',
          query:{code:number}
          }" >
          查询
        </router-link> 
      </div>
      <div class="commit" v-if="mobileState">
        <router-link :to="{
          path:'/result',
          query:{id:mobile}
          }"  class="query">
          查询
        </router-link>
      </div>
      
    </div>
    
  </div>
</template>
<script>
  export default {
    name: 'Login',
    data () {
      return {
        number:"",
        mobile:"",
        mobileState:false,
        numberState:true,
      }
    },
    methods: {
      changeToMobile(){
        this.mobileState = true;
        this.numberState = false;
      },
      changeToNum(){
        this.numberState = true;
        this.mobileState = false;
      }
    }
  
  }
</script>
<style scoped>
*{
  padding: 0;
  margin: 0;
}
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

.box .choose{
  display: flex;
  margin-bottom: 30px;
  cursor: pointer;
}
.choose div{
  padding: 10px;
  border: 1px solid #333;
  background-color: #ccc;
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
.query{
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
}
</style>
