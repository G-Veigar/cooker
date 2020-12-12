<template>
  <div class="wrapper">
    <div class="inner-wrapper">
      <div class="inner"></div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.wrapper {
  width: 100%;
  height: 100vh;
}
.inner-wrapper {
  width: 200%;
  height: 200%;
  position: relative;
}
.inner {
  width: 300px;
  height: 500px;
  background-color: #eee;
  border: 1px solid #aaa;
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>
