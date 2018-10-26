<template>
     <div>
       <Row>
         <Col>
           <Table :columns="columns" :data="data" border></Table>
         </Col>
       </Row>
     </div>
</template>

<script>
    export default {
        name: "1-2",
      data () {
        return {
          columns: [
            {
              title: 'ID',
              key: 'id'
            },
            {
              title: '资源ID',
              key: 'sId'
            },
            {
              title: '资源名称',
              key: 'name'
            },
          ],
          data: [
            {
              id:1,
              sId:'1-1',
              name:'权限管理',
            },
          ]
        }
      },
      mounted() {
        /**
         * @time  2018/10/26 11:43
         * @author  Bill Wang <1826001146@qq.com>
         * @desc  在页面初始化的时候去获取所有资源信息
         */
          this.$http.post('/source/showAll.action')
            .then((data) => {
              console.log(data);
              this.data  = data.data;
            })
            .catch((err) => {
              console.log(err);
            });
      }
    }
</script>

<style scoped>

</style>
