<template>
  <div class="test-size-wrapper">
    <size-wrapper>
      <div class="hehe">hehe</div>
    </size-wrapper>
  </div>
</template>

<script>
import sizeWrapper from '@/components/size-wrapper'

export default {
  components: { sizeWrapper }
}
</script>

<style>
.hehe {
  width: 30vw;
  height: 100px;
  text-align: center;
  line-height: 100px;
}
</style>
