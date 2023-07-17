<template>
  <div class="container">
    {{ name }}
    <span>vue3</span>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const name = ref('zs')
    return {
      name
    }
  }
}
</script>

<style lang="less" scoped></style>