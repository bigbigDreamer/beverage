<template>
     <div>
       <Row>
         <Col>
           <Table border :columns="columns" :data="data"></Table>
         </Col>
       </Row>
     </div>
</template>

<script>
    export default {
        name: "merchants",
      data () {
        return {
          columns: [
            {
              title: 'ID',
              key: 'id',
              render: (h, params) => {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'person'
                    }
                  }),
                  h('strong', params.row.id)
                ]);
              }
            },
            {
              title: '店铺名',
              key: 'name'
            },
            {
              title: '经营许可证',
              key: 'certificate'
            },
            {
              title: '地址',
              key: 'address'
            },
            {
              title: '电话',
              key: 'telephone'
            },
            {
              title: '操作',
              key: 'action',
              width: 150,
              align: 'center',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.show(params.index)
                      }
                    }
                  }, '审查'),
                  h('Button', {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.remove(params.index)
                      }
                    }
                  }, '注销')
                ]);
              }
            }
          ],
          data: [
            {
              id:'7878',
              name:'121',
              certificate:'15151',
              address:'甘肃兰州',
              telephone:'4454545',
            }
          ],
          index:''
        }
      },
      methods: {
        show (index) {
          this.index = index;
          console.log('id'+this.data[index].id)
          this.$http.post('/shop/validateShop.action',{
            id:this.data[index].id,
          })
            .then((data)=>{
              console.log(data);
              this.$http.post('/shop/showAll.action')
                .then((data)=>{
                  this.data = data.data;
                  console.log(data.data);
                })
                .catch((err)=>{
                  console.log(err);
                });
            })
            .catch((err)=>{
              console.log(err);
            })
          console.log(this.index)
          this.$Modal.info({
            title: '店铺信息',
            okText:'审查通过',
            content: `Name：${this.data[index].name}<br>Certificate：${this.data[index].certificate}<br>Address：${this.data[index].address}<br>Telephone：${this.data[index].telephone}`,
            onOk(){
               console.log('成功');
            }
          })
        },
        /**
         * @time  2018/10/26 19:33
         * @author  Bill Wang <1826001146@qq.com>
         * @desc  删除店铺
         * @param index {number}
         * @todo 执行删除店铺，并进行数据实时刷新
         */
        remove (index) {
          console.log('id'+this.data[index].id)
          this.$http.post('/shop/deleteShop.action',{
            id:this.data[index].id,
          })
            .then((data)=>{
              console.log(data);
              this.$http.post('/shop/showAll.action')
                .then((data)=>{
                  this.data = data.data;
                  console.log(data.data);
                })
                .catch((err)=>{
                  console.log(err);
                });
            })
            .catch((err)=>{
              console.log(err);
            })
          this.data.splice(index, 1);
        }
      },
      mounted(){
       this.$http.post('/shop/showAll.action')
          .then((data)=>{
             this.data = data.data;
            console.log(data.data);
          })
          .catch((err)=>{
            console.log(err);
          });
      }
    }
</script>

<style scoped>

</style>
