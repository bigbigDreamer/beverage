<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark"  @on-select="github">
          <div class="layout-logo">
            <Icon type="ios-pizza-outline"  size="48"/>
            Catering  BMS
          </div>
          <div class="layout-nav">
            <MenuItem name="前端" >
              <Icon type="logo-github" size="26"></Icon>
              前端代码库
            </MenuItem>
            <MenuItem name="后端">
              <Icon type="logo-github" size="26"></Icon>
              后端代码库
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1" theme="light" width="auto" :open-names="['1']" @on-select="roleManager">
            <rightsManage v-show="rightsManage"/>
            <businessManage v-show="businessManage"/>
            <storesManage v-show="storesManage"/>
            <foodManage v-show="foodManage"/>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  import businessManage from '../Sources/businessManage'
  import foodManage from '../Sources/foodManage'
  import rightsManage from '../Sources/rightsManage'
  import storesManage from '../Sources/storesManage'
  import {mapState, mapActions} from 'vuex'

  export default {
    name: "Admin",
    data() {
      return {
        rightsManage: true,
        businessManage: true,
        storesManage: true,
        foodManage: true,
      }
    },
    methods: {
      /**
       * @time  2018/10/20 18:12
       * @author  Bill Wang <1826001146@qq.com>
       * @desc  路由跳转的处理方法
       * @param  name {string} - 路由信息
       * @todo 根据用户点击的菜单目录进行路由跳转
       */
      roleManager(name) {
        //console.log(this.source.businessManage)
        this.$router.replace({name});
      },
      /**
       * @time  2018/10/26 9:33
       * @author  Bill Wang <1826001146@qq.com>
       * @desc  github地址跳转
       */
      github(name){
          if (name === '前端') {
            location.href = 'https://github.com/bigbigDreamer/beverage';
          } else  if (name === '后端'){
            location.href = 'https://github.com/245455758/catering';
          }
      },
      ...mapActions([
        'loginJudge'
      ]),
    },
    components: {
      businessManage,
      foodManage,
      rightsManage,
      storesManage,
    },
    computed: {
      // 使用对象展开运算符将此对象混入到外部对象中
      ...mapState([
        'usesIdentity'
      ])
    },
    /**
     * @time  2018/10/20 18:15
     * @author  Bill Wang <1826001146@qq.com>
     * @desc mounted钩子函数用来初始化vuex state中的usesIdentity数据
     * @param null
     * @todo  初始化数据
     */
    mounted() {
      console.log(this.usesIdentity);
    }
  }
</script>

<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    width: 250px;
    height: 30px;
    color: white;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
    font-family: 'Vladimir Script';
    font-size: 28px;
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>
