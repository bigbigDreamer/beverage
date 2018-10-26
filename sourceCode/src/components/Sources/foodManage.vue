<template>
    <div>
      <Submenu name="4">
        <template slot="title">
          <Icon type="ios-pizza-outline"></Icon>
          食品管理
        </template>
        <MenuItem name="4-1">食品信息</MenuItem>
        <MenuItem name="4-2">上架审核</MenuItem>
      </Submenu>
    </div>
</template>

<script>
    export default {
        name: "foodManage",
      data(){
           return {

           }
      }
    }
</script>

<style scoped>

</style>
