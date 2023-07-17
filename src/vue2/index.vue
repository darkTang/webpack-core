<template>
  <div class="container">
    {{ name }}--{{ age }}
    <span>vue2</span>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      name: 'zs',
      age: 12
    }
  }
}
</script>

<style lang="less" scoped>
.container span {
  color: red;
}
</style>