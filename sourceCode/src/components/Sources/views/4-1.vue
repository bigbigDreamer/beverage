<template>
    <div>
      <Row>
        <Col span="6" v-for="(item ,index) in allInfo" :KEY="index">
          <Card style="width:250px">
            <div style="text-align:center">
              <img :src='`http://websitdevelopment.cn:8080/catering1-0.0.1-SNAPSHOT/`+item.picPath'  style="width: 220px;height: 137px;" >
              <div style="font-size: 16px">
                <Icon type="md-pizza"  size="24"/>{{item.name}} <span>
               <InputNumber
                 :max="10000"
                 v-model="item.price"
                 :formatter="value => `$ ${value}`.replace(/B(?=(d{3})+(?!d))/g, ',')"
                 :parser="value => value.replace(/$s?|(,*)/g, '')"></InputNumber>
              </span>
              </div>
              <h3>{{item.information}}</h3>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
</template>

<script>
    export default {
        name: "4-1",
      data(){
          return {
            value:120,
            allInfo:[
              {
                id:'',
                information:'',
                name:'',
                picPath:'',
                price:'',
                shopId:'',
                typeId:'',
              }
            ]
          }
      },
      mounted() {
            this.$http.post('/goods/showAll.action')
              .then((data)=>{
                console.log(data)
                this.allInfo = data.data;
                console.log()
                this.picPath = `http://websitdevelopment.cn:8080/catering1-0.0.1-SNAPSHOT/${data.data[0].picPath}`;
              })
              .catch((err)=>{
                console.log(err)
              })
      }
    }
</script>

<style scoped>

</style>
