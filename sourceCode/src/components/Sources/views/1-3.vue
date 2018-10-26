<template>
  <div>
  <Row>
    <Col span="24">
      <Divider type="vertical"/>
      <a href="#" @click="AddU = true">新建</a>
      <Divider type="vertical"/>
      <a href="#" @click="deleteUser">删除</a>
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
        <Divider>用户名</Divider>
        <Input v-model="name" placeholder="Enter name"></Input>
        <Divider>电话</Divider>
        <Input v-model="newPhone" placeholder="Enter phone"></Input>
        <Divider>角色分配</Divider>
        <Select v-model="newRoles" multiple >
          <Option v-for="item in roles" :value="item.id" :key="item.id">{{item.desc}}</Option>
        </Select>
      </Modal>
      <Drawer
        title="Create"
        v-model="AddU"
        width="720"
        :mask-closable="false"
        :styles="styles"
      >
        <Form>
          <Row :gutter="32">
            <Col span="12">
              <FormItem label="角色" label-position="top">
                <Select v-model="newRoles" multiple>
                  <Option v-for="item in roles" :value="item.id" :key="item.id">{{item.desc}}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="用户名" label-position="top">
                <Input v-model="addName" placeholder="Enter name"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="32">
          </Row>
          <FormItem label="电话" label-position="top">
            <Input type="textarea" v-model="addPhone" :rows="4" placeholder="please enter the description" />
          </FormItem>
        </Form>
        <div class="demo-drawer-footer">
          <Button style="margin-right: 8px" @click="AddU = false">Cancel</Button>
          <Button type="primary" @click="addUser">Submit</Button>
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
            title: '用户ID',
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
            title: '用户名',
            key: 'username'
          },
          {
            title: '电话',
            key: 'telephone'
          },
          {
            title: '角色',
            key: 'password'
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
            username: '商户管理员',
            telephone: '1-1;1-2',
            password:''
          },
        ],
        roles:[
          {
            id:'1',
            desc:'权限管理',
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
        newPhone: '',
        name: '',
        newRoles: '',
        id: '',
        delArr:[],
        AddU:false,
        addName:'',
        addPhone:'',
      }
    },
    methods: {
      show(index) {
        this.newPhone = this.data[index].telephone;
        this.name = this.data[index].username;
        this.newRoles = this.data[index].password;
        this.id = this.data[index].id;
        this.modal = true;
      },
      handleSelect(selection, row) {
        console.log(selection.constructor)
        /**
         * @time  2018/10/25 21:07
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
       * @time  2018/10/26 11:40
       * @author  Bill Wang <1826001146@qq.com>
       * @desc  更新用户信息
       * @param  null {object}
       * @todo  调用API去实现更新
       */
      ok() {
        console.log(this.newRoles);
        console.log(this.id)
        this.$http.post('/api/updateUser.action', {
          username: this.name,
          telephone: this.newPhone,
          role: this.newRoles,
          id: this.id,
        })
          .then((data) => {
            console.log(data);
            this.$http.post('/api/showAll.action')
              .then((data)=>{
                console.log(data);
                this.data = data.data.users;
                this.roles = data.data.roles;
              })
              .catch((err)=>{
                console.log(err);
              })
          })
          .catch((err) => {
            console.log(err);
          });
      },
      /**
       * @time  2018/10/26 11:43
       * @author  Bill Wang <1826001146@qq.com>
       * @desc  删除用户
       */
      deleteUser(){
        console.log(this.delArr);
        this.$http.post('/api/deleteUsers.action',{
          idArr:this.delArr
        })
          .then((data)=>{
            console.log(data);
            this.$http.post('/api/showAll.action')
              .then((data)=>{
                console.log(data);
                this.data = data.data.users;
                this.roles = data.data.roles;
              })
              .catch((err)=>{
                console.log(err);
              })
          })
          .catch((err)=>{
            console.log(err);
          });
      },
      /**
       * @time  2018/10/25 20:40
       * @author  Bill Wang <1826001146@qq.com>
       * @desc  添加用户
       */
      addUser(){
        console.log(this.newRoles);
        this.$http.post('/api/addUser.action',
          {
            username:this.addName,
            role:this.newRoles,
            telephone:this.addPhone,
          }
        )
          .then((data)=>{
            console.log(data);
            this.$http.post('/api/showAll.action')
              .then((data)=>{
                console.log(data);
                this.data = data.data.users;
                this.roles = data.data.roles;
              })
              .catch((err)=>{
                console.log(err);
              });
            this.AddU = false;
          })
          .catch((err)=>{
            console.log(err);
          });
      }
    },
    mounted() {
      /**
       * @time  2018/10/25 20:37
       * @author  Bill Wang <1826001146@qq.com>
       * @desc  初始化表格数据
       * @param
       * @todo
       */
         this.$http.post('/api/showAll.action')
           .then((data)=>{
             console.log(data);
             this.data = data.data.users;
             this.roles = data.data.roles;
           })
           .catch((err)=>{
             console.log(err);
           })
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
