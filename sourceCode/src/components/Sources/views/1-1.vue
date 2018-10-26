<template>
  <div>
    <Row>
      <Col span="24">
        <Divider type="vertical"/>
        <a href="#" @click="AddRol = true">新建</a>
        <Divider type="vertical"/>
        <a href="#" @click="deleteRole">删除</a>
        <Divider type="vertical"/>
        <a href="#">刷新</a>
      </Col>
      <Col span="24">
        <Table border ref="selection" :columns="columns" :data="data" @on-select='handleSelect'></Table>
        <Modal
          v-model="modal"
          title="User Info"
          @on-ok="ok"
        >
          <Divider>角色名</Divider>
          <Input v-model="name" placeholder="Enter name"></Input>
          <Divider>角色描述</Divider>
          <Input v-model="newDesc" placeholder="Enter desc"></Input>
          <Divider>权限</Divider>
          <Select v-model="newRights" multiple>
            <Option v-for="item in rights" :value="item.rightsData" :key="item.rightsData">{{item.rightsDesc}}</Option>
          </Select>
        </Modal>
        <Drawer
          title="Create"
          v-model="AddRol"
          width="720"
          :mask-closable="false"
          :styles="styles"
        >
          <Form>
            <Row :gutter="32">
              <Col span="12">
                <FormItem label="权限" label-position="top">
                  <Select v-model="newRights" multiple>
                    <Option v-for="item in rights" :value="item.rightsData" :key="item.rightsData">{{item.rightsDesc}}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="12">
                <FormItem label="角色名" label-position="top">
                  <Input v-model="addName" placeholder="Enter name"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row :gutter="32">
            </Row>
            <FormItem label="描述" label-position="top">
              <Input type="textarea" v-model="addDesc" :rows="4" placeholder="please enter the description" />
            </FormItem>
          </Form>
          <div class="demo-drawer-footer">
            <Button style="margin-right: 8px" @click="AddRol = false">Cancel</Button>
            <Button type="primary" @click="addRole">Submit</Button>
          </div>
        </Drawer>
      </Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: "1-1",
    data() {
      return {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '角色ID',
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
            title: '角色描述',
            key: 'desc'
          },
          {
            title: '权限',
            key: 'rights'
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
                }, '修改')
              ]);
            }
          }
        ],
        data: [
          {
            id: '1',
            desc: '商户管理员',
            rights: '1-1;1-2'
          },
          {
            id: '2',
            desc: '',
            rights: '2-1'
          },
          {
            id: '3',
            desc: '',
            rights: '3-1'
          },
          {
            id: '4',
            desc: '',
            rights: '4-1'
          }
        ],
        rights:[
          {
            rightsData:'1',
            rightsDesc:'权限管理',
          },
          {
            rightsData:'1-1',
            rightsDesc:'角色管理',
          },
          {
            rightsData:'1-2',
            rightsDesc:'资源管理',
          },
          {
            rightsData:'1-3',
            rightsDesc:'用户管理',
          },
          {
            rightsData:'1-4',
            rightsDesc:'待办事项',
          },
          {
            rightsData:'2',
            rightsDesc:'商户管理',
          },
          {
            rightsData:'2-1',
            rightsDesc:'商户信息',
          },
          {
            rightsData:'2-2',
            rightsDesc:'商户审核',
          },
          {
            rightsData:'3',
            rightsDesc:'店铺管理',
          },
          {
            rightsData:'3-1',
            rightsDesc:'店铺信息',
          },
          {
            rightsData:'3-2',
            rightsDesc:'店铺审核',
          },
          {
            rightsData:'4',
            rightsDesc:'食品管理',
          },
          {
            rightsData:'4-1',
            rightsDesc:'食品信息',
          },
          {
            rightsData:'4-2',
            rightsDesc:'上架审核',
          },
        ],
        styles: {
          height: 'calc(100% - 55px)',
          overflow: 'auto',
          paddingBottom: '53px',
          position: 'static'
        },
        select: '',
        modal: false,
        newDesc: '',
        name: '',
        newRights: '',
        id: '',
        delArr:[],
        AddRol:false,
        addName:'',
        addDesc:'',
      }
    },
    methods: {
      /**
       * @time  2018/10/25 17:01
       * @author  Bill Wang <1826001146@qq.com>
       * @desc  更新state
       * @param index {number}
       * @todo  获得表格中选中的索引，然后更新状态，以方便修改
       */
      show(index) {
        this.newDesc = this.data[index].desc;
        this.name = this.data[index].name;
        this.newRights = this.data[index].rights;
        this.id = this.data[index].id;
        this.modal = true;
      },
      /**
       * @time  2018/10/24 21:27
       * @author  Bill Wang <1826001146@qq.com>
       * @desc  处理表格选项
       * @param  selection {object} row {object}
       * @todo 获取用户选取索引
       */
      handleSelect(selection, row) {
        console.log(selection.constructor)
        /**
         * @time  2018/10/25 18:03
         * @author  Bill Wang <1826001146@qq.com>
         * @desc  这儿有一个骚操作就是利用map集合返回最终的数组，将一个最终删除的数组状态保存在v-model数据中，方便随时更新
         */
        this.delArr = selection.map((item, index) => {
          return item.id
        });
        console.log(this.delArr)
      },
      filterMethod(value, option) {
        return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
      },
      /**
       * @time  2018/10/25 17:00
       * @author  Bill Wang <1826001146@qq.com>
       * @desc  修改角色的方法
       * @param  null {object}
       * @todo 修改角色方法
       */
      ok() {
        console.log(this.newRights);
        this.$http.post('/role/updateRole.action', {
          name: this.name,
          desc: this.newDesc,
          rights: this.newRights,
          id: this.id,
        })
          .then((data) => {
            console.log(data);
            this.$http.post('/role/showAll.action')
              .then((data1) => {
                console.log('查询角色')
                this.data = data1.data;
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      },
      /**
       * @time  2018/10/25 16:59
       * @author  Bill Wang <1826001146@qq.com>
       * @desc  删除角色的方法
       * @param null {object}
       * @todo  删除角色并且实时刷新
       */
      deleteRole(){
        console.log(this.delArr);
          this.$http.post('/role/deleteRoles.action',{
            idArr:this.delArr
          })
            .then((data)=>{
              console.log(data);
              this.$http.post('/role/showAll.action')
                .then((data1) => {
                  console.log('查询角色')
                  this.data = data1.data;
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err)=>{
              console.log(err);
            });
      },
      addRole(){
           this.$http.post('/role/addRole.action',
             {
               name:this.addName,
               rights:this.newRights,
               desc:this.addDesc,
             }
           )
             .then((data)=>{
               console.log(data);
               this.$http.post('/role/showAll.action')
                 .then((data1) => {
                   console.log('查询角色')
                   this.data = data1.data;
                 })
                 .catch((err) => {
                   console.log(err);
                 });
             })
             .catch((err)=>{
               console.log(err);
             });
      }
    },
    mounted() {
      /**
       * @time  2018/10/24 21:28
       * @author  Bill Wang <1826001146@qq.com>
       * @desc  在组件初始化的时候发送ajax请求，向后台获取角色信息数据
       * @todo  渲染表格数据
       */
      this.$http.post('/role/showAll.action')
        .then((data) => {
          console.log('查询角色');
          this.data = data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    }


  }
</script>

<style scoped>
  .demo-drawer-footer{
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    border-top: 1px solid #e8e8e8;
    padding: 10px 16px;
    text-align: right;
    background: #fff;
  }
</style>
