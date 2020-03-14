<template>
    <div>
      <h2>Страница добавления информации на сайт ПОЦДиЮТиЭ</h2>
    </div>
</template>

<script>
    export default {
        name: "LandingPage",
      data() {
          return {
            // items: ['Новости', 'План', 'Публикации']
          }
      },
      methods: {
        isActive(name) {
          return this.active === name;
        },
        select(name) {
          this.active = name;
        },
      },
    }
</script>

<style scoped>

</style>
