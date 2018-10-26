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
              title: '商户名',
              key: 'name',
              render: (h, params) => {
                return h('div', [
                  h('Icon', {
                    props: {
                      type: 'person'
                    }
                  }),
                  h('strong', params.row.name)
                ]);
              }
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
          ]
        }
      },
      methods: {
        show (index) {
          this.$Modal.info({
            title: '店铺信息',
            okText:'审查通过',
            content: `Name：${this.data[index].name}<br>Certificate：${this.data[index].certificate}<br>Address：${this.data[index].address}<br>Telephone：${this.data[index].telephone}`
          })
        },
        remove (index) {
          this.data.splice(index, 1);
        }
      },
      mounted(){
       /* this.$http.post('/shop/findAll.action')
          .then((data)=>{
            let json = JSON.parse(data.data)
             this.data = json.shops;
            console.log(data.data);
          })
          .catch((err)=>{
            console.log(err);
          });*/
      }
    }
</script>

<style scoped>

</style>
