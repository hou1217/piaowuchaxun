<template>
  <div class="login">
    <h1>爬虫旅游票务管理中心商家版</h1>

    <div class="box">
      <div class="result">
        <ul v-for="(order,index) in result" :key="index">
          <li>
            <div>门票名称</div>
            <div>数量</div>
            <div>状态</div>
           
          </li>
          <li v-for="(item, index) in order.tickets" :key="index">
            <div>
              {{order.ticketName}} 
              <span v-if="item.typeId==1">成人票</span>
              <span v-if="item.typeId==2">儿童票 </span>
              <span v-if="item.typeId==3"> 老人票</span>
            </div>
            <div>1</div>
            <div>{{item.statusName}}</div>
          </li>
          <div class="commit"  @click="exchangeTicket(order.orderId)">
            兑换门票
          </div>
          <!-- <div class="commit" v-if="result.status==0">
            <router-link :to="{
              path:'/search'
              }" >
              再次查询
            </router-link>
            
          </div> -->
          
        </ul>
        
       
      </div>
      
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Login',
    data () {
      return {
        result:{}
      }
    },
    mounted() {
      if(this.$route.query.code){
        this.getData();
      }else if(this.$route.query.id){
        this.getMobileData();
      }
      
    },
    methods: {
      exchangeTicket(id){
        const options = {
          method: 'POST',
          url:"http://app.tianxiayunyou.com:8092/api/OTACheckOrder",
          params:{
            token: localStorage.getItem("token"),
            id:id
          }
        };
        console.log(options);
        this.$axios(options).then((res) => {
            console.log(res);  
            // console.log();
            if(res.data.r==1){
              console.log('成功了');
            }     
        }).catch((error) => {
          console.error('出错了', error);
         
        });
      },
      getData(){
        const options = {
          method: 'GET',
          url:"http://app.tianxiayunyou.com:8092/api/OTAQueryOrdersBySmsCode",
          params:{
            code: this.$route.query.code,
            token:localStorage.getItem("token"),
          }
        };
        console.log(options);
        this.$axios(options).then((res) => {
          console.log(res.data.data.orders);       
          this.result = res.data.data.orders;
        }).catch((error) => {
          console.error('出错了', error);
         
        });
        // mock
      },
      getMobileData(){
        const options = {
          method: 'GET',
          url:"http://app.tianxiayunyou.com:8092/api/OTAQueryOrdersByMobile",
          params:{
            mobile: this.$route.query.id,
            token:localStorage.getItem("token"),
          }
        };
        console.log(options);
        this.$axios(options).then((res) => {
          console.log(res.data.data.orders);       
          this.result = res.data.data.orders;
        }).catch((error) => {
          console.error('出错了', error);
         
        });
        // mock
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
  width: 630px;
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

.result li{
  display: flex;
  align-items: center;
  height: 32px;
  line-height: 32px;
  
}
.result li  div{
  width: 33.333%;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style>
