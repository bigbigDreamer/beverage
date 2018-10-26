<template>
  <div>
    <Row>
      <Col>
        <Transfer
          :titles="['商家列表', '合格列表']"
          :data="data3"
          :target-keys="targetKeys3"
          :list-style="listStyle"
          :render-format="render3"
          :operations="['撤销','审核通过']"
          filterable
          @on-change="handleChange3"
          @on-selected-change = 'handleSelect'
        >
          <div :style="{float: 'right', margin: '5px'}">
            <Button size="small" @click="reloadMockData">Refresh</Button>
          </div>
        </Transfer>
        <Modal
          v-model="modal"
          title="商户信息"
          style="text-align: center;"
        >
          <span style="font-size: 22px">
            <Row>
            <Col span="12" push="3">
             &nbsp;&nbsp;&nbsp; <Icon type="ios-albums-outline" size="28"/>ID：
            </Col>
            <Col span="5">
            {{id}}
            </Col>
              </Row>
            </span>
          <span style="font-size: 22px">
            <Row>
            <Col span="12" push="2">
             <Icon type="logo-vimeo"size="28"/>身份证号：
            </Col>
            <Col span="5">
            {{cardId}}
            </Col>
              </Row>
            </span>
          <span style="font-size: 22px">
            <Row>
            <Col span="12" push="2" >
             <Icon type="md-at" size="28"/>联系地址：
            </Col>
            <Col span="5">
            {{address}}
            </Col>
              </Row>
            </span>
          <span style="font-size: 22px">
            <Row>
            <Col span="12" push="2">
              <Icon type="md-call" size="28"/>电话号码：
            </Col>
            <Col span="5">
            {{telephone}}
            </Col>
              </Row>
            </span>
        </Modal>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "store",
    data () {
      return {
        data3: [],
        targetKeys3: [],
        listStyle: {
          width: '450px',
          height: '400px'
        },
        mockData2:[],
        modal:false,
        id:'',
        cardId:'',
        address:'',
        telephone:'',
      }
    },
    methods: {
      /**
       * @time  2018/10/26 16:30
       * @author  Bill Wang <1826001146@qq.com>
       * @desc  处理选项移动的方法
       * @param  newTargetKeys - 左边向右移动的key ,direction - 移动方向 ['right'/'left'],moveKeys - 右边向左边移动的key
       * @todo  在移动的时候发送数据给后台处理，让后台爱去判定是否审核
       */
      handleChange3 (newTargetKeys,direction,moveKeys) {
        console.log(newTargetKeys);
        console.log(direction);
        console.log(moveKeys);
        if(direction === 'right') {
          this.$http.post('/shopper/validateUser.action',{
            id:newTargetKeys
          })
            .then((data)=>{
              console.log(data);
              this.targetKeys3 = newTargetKeys;
            })
            .catch((err)=>{
              console.log(err);
            })
        } else if (direction === 'left') {
          this.$http.post('/shopper/undoValidate.action',{
            id:moveKeys
          })
            .then((data)=>{
              console.log(data);
              this.targetKeys3 = newTargetKeys;
            })
            .catch((err)=>{
              console.log(err);
            })
        }

      },
      /**
       * @time  2018/10/26 16:33
       * @author  Bill Wang <1826001146@qq.com>
       * @desc  处理选定穿梭框目录列表时的modal显示
       * @param  sourceSelectedKeys - 左侧key, targetSelectedKeys -右侧key
       * @todo
       */
      handleSelect(sourceSelectedKeys, targetSelectedKeys){
          this.$http.post('/shopper/showDetail.action',{
            id:sourceSelectedKeys
          })
            .then((data)=>{
              this.id = data.data.id;
              this.cardId = data.data.cardId;
              this.address = data.data.address;
              this.telephone = data.data.telephone;
              this.modal = true;
            })
            .catch((err)=>{
              console.log(err);
            });
      },
      render3 (item) {
        return item.key + ' - ' + item.description;
      },
      reloadMockData () {
        //this.targetKeys3 = this.getTargetKeys();
      }
    },
    beforeMount(){
      /**
       * @time  2018/10/26 17:03
       * @author  Bill Wang <1826001146@qq.com>
       * @desc  初始化数据的时候，遍历数据库所有未审核的商户
       * @param null {object}
       * @todo  初始化数据
       */
      this.$http.post('/shopper/showAllUnChecked.action')
        .then((data)=>{
          this.data3 = data.data.entity;
        })
        .catch((err)=>{
          console.log(err);
        })
    }
  }
</script>

<style scoped>

</style>
