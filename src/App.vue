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
      <sui-menu-item>
        <router-link to="documents">Документы</router-link>
      </sui-menu-item>
      <sui-menu-item>
        <router-link to="education">Образование</router-link>
      </sui-menu-item>
      <sui-menu-item>
        <router-link to="trips">Экскурсии</router-link>
      </sui-menu-item>
    </sui-menu>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}

</script>

<style>

</style>
