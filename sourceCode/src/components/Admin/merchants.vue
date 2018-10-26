<template>
  <div>
    <Row>
      <Col>
        <Transfer
          :titles="['商家列表', '合格列表']"
          :data="data"
          :target-keys="targetKeys"
          :list-style="listStyle"
          :render-format="render"
          :operations="['撤销','审核通过']"
          filterable
          @on-change="handleChange">
          <div :style="{float: 'right', margin: '5px'}">
            <Button size="small" @click="reloadMockData">Refresh</Button>
          </div>
        </Transfer>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "store",
    data () {
      return {
        data: this.getMockData(),
        targetKeys: this.getTargetKeys(),
        listStyle: {
          width: '450px',
          height: '400px'
        }
      }
    },
    methods: {
      getMockData () {
        let mockData = [];
        mockData.push({
          key: "商家1",
          label: '商家1' ,
          description:"兰州理工大学",
        });
        mockData.push({
          key: "商家2",
          label: '商家2' ,
          description:"西北师范大学",
        });
        mockData.push({
          key: "商家3",
          label: '商家3' ,
          description:"兰州交通大学",
        });
        return mockData;
      },
      getTargetKeys () {
        return this.getMockData()
          .filter(() => Math.random() * 2 > 1)
          .map(item => item.key);
      },
      handleChange (newTargetKeys) {
        this.targetKeys = newTargetKeys;
      },
      render (item) {
        return item.label + ' - ' + item.description;
      },
      reloadMockData () {
        this.data = this.getMockData();
        this.targetKeys = this.getTargetKeys();
      }
    }
  }
</script>

<style scoped>

</style>
