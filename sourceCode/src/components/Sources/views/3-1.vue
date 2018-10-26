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
        name: "3-1",
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

        ],
        data: [
          {
            id: '7878',
            name: '121',
            certificate: '15151',
            address: '甘肃兰州',
            telephone: '4454545',
          }
        ],
      }
    },
      mounted(){
          this.$http.post('/shop/showAllCheckedShop.action')
            .then((data)=>{
              this.data = data.data;
            })
            .catch((err) =>{
              console.log(err);
            });
      }
    }
</script>

<style scoped>

</style>
