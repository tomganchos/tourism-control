<template>
  <div class="container">
    <div class="container-scroll">
      <div class="container-scroll__add-button">
        <sui-button primary>Добавить новость</sui-button>
      </div>
      <div class="container-scroll__list">
        <div v-for="item in list">
          {{ JSON.stringify(item)}}
        </div>
      </div>
    </div>
    <div class="container-info">
      <router-view/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "InfoPanel",
    props: { list: Array }
  }
</script>

<style scoped>

</style>
