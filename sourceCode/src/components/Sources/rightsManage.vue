<template>
    <div>
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-navigate"></Icon>
          权限管理
        </template>
        <MenuItem name="1-1">角色管理</MenuItem>
        <MenuItem name="1-2">资源管理</MenuItem>
        <MenuItem name="1-3">用户管理</MenuItem>
        <MenuItem name="1-4">代办事项</MenuItem>
      </Submenu>
    </div>
</template>

<script>
    export default {
        name: "rightsManage"
    }
</script>

<style scoped>

</style>
