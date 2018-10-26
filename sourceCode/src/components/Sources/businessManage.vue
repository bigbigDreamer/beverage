<template>
    <div>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-keypad"></Icon>
          商户管理
        </template>
        <MenuItem name="2-1">商户信息</MenuItem>
        <MenuItem name="2-2">审核商户</MenuItem>
      </Submenu>
    </div>
</template>

<script>
    export default {
        name: "businessManage"
    }
</script>

<style scoped>

</style>
