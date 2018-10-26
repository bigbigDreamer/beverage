<template>
    <div>
      <Submenu name="3">
        <template slot="title">
          <Icon type="md-appstore"></Icon>
          店铺管理
        </template>
        <MenuItem name="3-1">店铺信息</MenuItem>
        <MenuItem name="3-2">审核店铺</MenuItem>
      </Submenu>
    </div>
</template>

<script>
    export default {
        name: "storesManage"
    }
</script>

<style scoped>

</style>
