<template>
  <div class="login">
    <h1>爬虫旅游票务管理中心商家版</h1>

    <div class="box">
      <div v-if="state">
        <h2>
          数据库中未查询到数据.....
        </h2>
        <div class="commit" @click="returnBack">
          返回搜索页
        </div>
      </div>
      
      <div class="result" v-for="(order,index) in result" :key="index">
        <ul >
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
        </ul>
        <div class="commit"  @click="exchange(order.orderId)">
          兑换门票
        </div>
       
      </div>
      
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Login',
    data () {
      return {
        result:{},
        state:true
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
      returnBack(){
        this.$router.push('/search');
      },
      exchange(id){
        this.$confirm('此操作将兑换门票, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.exchangeTicket(id);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消兑换'
          });          
        });
      },
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
            if(res.data.r<=0){
              this.$message.warning(res.data.msg);
              return
            }
            if(res.data.r==1){
              
               this.$alert('兑换成功', '', {
                confirmButtonText: '确定',
                callback: action => {
                    this.$router.push('/search');
                  
                }
              });
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
          console.log(res);  
          if(res.data.r<=0){
            this.$message.warning(res.data.msg);
            return
          }     
          this.state = false;
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
          console.log(res);       
          if(res.data.r<=0){
            this.$message.warning(res.data.msg);
            return
          }
          this.state = false;
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

  text-align: center;
}


.result{
  padding: 10px;
  color: #fff;
  /* border: 1px solid #333; */
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
.box .commit{
  cursor: pointer;
  width: 150px;
  height: 50px;
  line-height: 50px;
  margin: 45px auto;
  background: rgb(87, 192, 187);
  color: #fff;
}
</style>
