<template>
  <div id="app">
    <sui-menu>
      <sui-menu-item>
        <router-link to="news">Новости</router-link>
      </sui-menu-item>
      <sui-menu-item>
        <router-link to="plans">План</router-link>
      </sui-menu-item>
      <sui-menu-item>
        <router-link to="publications">Публикации</router-link>
      </sui-menu-item>
    </sui-menu>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
</style>
