<template>
    <div class="app-layout">
      <header class="header">
        <div><img src="../assets/logo.svg"></div>
        <div>My shirt shop</div>
      </header>
      <router-view />
    </div>
</template>

<script>
    export default {
        name: "AppLayout"
    }
</script>

<style lang="stylus">
@import "../style/main";
</style>

<style lang="stylus" scoped>
  .header {
    .img {
      width: 64px;
      height: 64px;
    }
  }
</style>
