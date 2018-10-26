<template>
    <div>
      <div>
        <Row>
          <Col>
            <Divider type="vertical"/>
            <a href="#" @click="unDo" style="font-size: 14px">注销</a>
          </Col>
          <Col>
            <Table :columns="columns" :data="data" border @on-select = 'handleSelect'></Table>
          </Col>
        </Row>
      </div>
    </div>
</template>

<script>
    export default {
        name: "2-1",
      data () {
        return {
          columns: [
            {
              type: 'selection',
            },
            {
              title: 'ID',
              key: 'id'
            },
            {
              title: '商户名',
              key: 'username'
            },
            {
              title: '密码',
              key: 'password'
            },
            {
              title: '联系电话',
              key: 'telephone'
            },
            {
              title: '审核状态',
              key: 'isvalidate'
            },
          ],
          data: [
            {
              id: 1,
              username:'',
              password: '1-1',
              telephone: '110',
              isvalidate:'1'
            },
          ],
          idArr:[],
        }
    },
      methods:{
        /**
         * @time  2018/10/26 17:12
         * @author  Bill Wang <1826001146@qq.com>
         * @desc  处理表格选中某一项的数据
         */
        handleSelect(collection){
            this.idArr = collection.map(item => item.id);
            console.log(this.idArr);
        },
        unDo(){
          this.$http.post('/shopper/deleteShoppers.action',{
            id:this.idArr,
          })
            .then((data)=>{
              console.log(data);
              this.$http.post('/shopper/showAll.action')
                .then((data)=>{
                  this.data = data.data;
                })
                .catch((err)=>{
                  console.log(err);
                });
            })
            .catch((err)=>{
              console.log(err);
            })
        },
      },
      mounted(){
        /**
         * @time  2018/10/26 11:44
         * @author  Bill Wang <1826001146@qq.com>
         * @desc  在组件初始化的时候去调用api
         */
          this.$http.post('/shopper/showAll.action')
            .then((data)=>{
              this.data = data.data;
            })
            .catch((err)=>{
              console.log(err);
            });
      }
    }
</script>

<style scoped>

</style>
