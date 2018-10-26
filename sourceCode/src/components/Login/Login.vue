<template>
     <div id="app">
      <Row>
          <Col span="8" push="4">
            <Carousel  loop autoplay>
              <CarouselItem v-for="(image,index) in images" loop :key="index">
                <img :src="image"/>
              </CarouselItem>
            </Carousel>
          </Col>
        <Col span="7" push="4">
          <Card style="width:398px;height: 335px" :bordered="true" >
            <div style="text-align:center">
              <h2>Catering service platform</h2>
              <h5><Icon type="ios-contacts" size="24" color='burlywood'/>参与人员</h5>
              <h5><Icon type="ios-bookmark" size="24"/>后端开发<Icon type="ios-at" size="24" />储亚波</h5>
              <h5><Icon type="ios-bookmark-outline" size="24"/>前端开发<Icon type="ios-at" size="24" />王彬林</h5>
            </div>
            <Form :label-width="80">
              <FormItem  prop="name" >
                <Input v-model="formValidate.name" placeholder="Enter your name" prefix="ios-contact-outline"></Input>
              </FormItem>
              <FormItem  prop="password" >
                <Input v-model="formValidate.password" placeholder="Enter your password" type="password" prefix="ios-unlock"></Input>
              </FormItem>
              <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 12px">Reset</Button>
                <Icon type="ios-outlet-outline"  size="20" style="margin-left: 8px"/><span @click="modal = true">没有账号？</span>
                <Modal
                  title="餐饮平台注册界面"
                  v-model="modal"
                  class-name="vertical-center-modal"
                  ok-text="注册"
                  cancel-text="再想想"
                  @on-ok="register"
                  :loading="loading"
                >
                  <FormItem  prop="name" >
                    <Input v-model="formValidate.name" placeholder="Enter your name" prefix="ios-contact-outline"></Input>
                  </FormItem>
                  <FormItem  prop="password" >
                    <Input v-model="formValidate.password" placeholder="Enter your password" type="password" prefix="ios-unlock"></Input>
                  </FormItem>
                  <FormItem  prop="phone" >
                    <Input v-model="formValidate.phone" placeholder="Enter your phone"  prefix="ios-phone-portrait"></Input>
                  </FormItem>
                </Modal>
              </FormItem>
            </Form>
          </Card>
        </Col>
      </Row>
     </div>
</template>

<script>
  import {mapActions} from 'vuex'
    export default {
        name: "Login",
      data(){
          return {
            images:[
              'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=77322764,4130849457&fm=200&gp=0.jpg',
              'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3085112252,2588052486&fm=200&gp=0.jpg',
              'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=944770887,1592456752&fm=26&gp=0.jpg',
              'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4033708133,2447645703&fm=26&gp=0.jpg'
            ],
            loop:true,
            autoplay:true,
            formValidate:{
              name:'',
              password:'',
              phone:''
            },
            modal:false,
            loading: true,
          }
      },
      methods: {
        /**
         * @time  2018/10/20 18:17
         * @author  Bill Wang <1826001146@qq.com>
         * @desc  登陆路由请求
         * @param null
         * @todo  发送ajax请求后台返回状态
         */
        ...mapActions([
          'loginJudge'
        ]),
        handleSubmit () {
          this.$http.post('/api/submit.action',{
            name:this.formValidate.name,
            password:this.formValidate.password
          })
            .then((data)=>{
              //let json = JSON.parse(data.data);
              console.log(data.data);
              if (data.data.res === true){
              this.loginJudge(data.data.rights);
              this.$Message.success('Success!!!');
              this.$router.push({path:'/admin'});}
            })
            .catch((err)=>{
              console.log(err);
            })

        },
        /**
         * @time  2018/10/20 18:17
         * @author  Bill Wang <1826001146@qq.com>
         * @desc  重置表单信息
         */
        handleReset (name) {
          this.formValidate.name = '';
          this.formValidate.mail = '';
        },
        /**
         * @time  2018/10/20 18:18
         * @author  Bill Wang <1826001146@qq.com>
         * @desc 注册普通用户的ajax请求
         */
        register(){
          console.log('开始请求')
          this.$http.post('/api/register.action', {
            name: this.formValidate.name,
            password: this.formValidate.password,
            telephone: this.formValidate.phone,
          })
            .then((data) => {
              let json = JSON.parse(data.data);
              console.log(data.res);
              console.log(data);
              console.log('ceshi');
              if (json.res === true) {
                this.loading = false;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
</script>

<style lang="less">
  #app{
    margin-top: 100px;
    Icon[type='ios-bookmark']{
      color: burlywood;
    }
  }
</style>
