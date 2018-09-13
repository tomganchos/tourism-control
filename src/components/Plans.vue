<template>
  <div>
    <div class="header">Планы</div>
    <div class="container-full">
      <div class="container-left">
        <div class="container-left-button">
          <sui-button primary @click="newPlan()">Добавить документ</sui-button>
        </div>
        <div>
          <sui-list divided>
            <sui-list-item v-for="item in plans" :key="item.id" @click="getPlan(item)">
              <sui-list-icon name="pencil" vertical-align="middle" class="list-icon"/>
              <sui-list-content>
                <a is="sui-list-header" class="list-header">{{item.name}}</a>
                <a is="sui-list-description" class="list-description">{{item.doc}} | {{item.date | moment('MMMM YYYY')}}</a>
              </sui-list-content>
            </sui-list-item>
          </sui-list>
        </div>
      </div>
      <div class="container-right">
        <!--<div id="content-menu" v-bind:class="[classContentMenu]">-->
          <!--<h2>{{header}}</h2>-->
          <!--<div class="content-group">-->
            <!--<strong class="label">Название публикации</strong>-->
            <!--<sui-input placeholder="Введите название..." v-model="namePublication"></sui-input>-->
          <!--</div>-->
          <!--<div class="content-group">-->
            <!--<strong class="label">Ссылка на публикацию</strong>-->
            <!--<sui-input placeholder="https://..." v-model="linkPublication"></sui-input>-->
          <!--</div>-->
          <!--<div class="content-group">-->
            <!--<strong class="label">Название ресурса</strong>-->
            <!--<sui-input placeholder="Например: ПЛН, ГТРК, КурьерЪ,.." v-model="journalPublication"></sui-input>-->
          <!--</div>-->
          <!--<div class="content-group">-->
            <!--<strong class="label">Дата</strong>-->
            <!--<div class="ui input">-->
              <!--<input id="date-input" type="date" v-model="datePublication">-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="container-right-button">-->
            <!--<sui-button positive v-bind:class="[changedButton]" @click="saveChangedPublication()">Сохранить изменения</sui-button>-->
            <!--<sui-button color="red" v-bind:class="[changedButton]" @click="deletePublication()">Удалить публикацию</sui-button>-->
            <!--<sui-button positive v-bind:class="[addButton]" @click="saveNewPublication()">Добавить публикацию</sui-button>-->
          <!--</div>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  let moment = require('moment');

  const host = 'http://localhost:3012';

    export default {
      name: "Plans",
      data() {
        return {
          plans: [],
          classContentMenu: 'none',
          header: '',

          changedButton: '',
          addButton: '',

          idPlan: '',
          namePlan: '',
          datePlan: '',
          month: false,
          doc: ''
        }
      },
      created() {
        this.getPlans();
      },
      methods: {
        getPlans() {
          axios.get(host + '/plans')
            .then(response => {
              this.plans = response.data.map((item) => {
                return {
                  id: item._id,
                  name: item.name,
                  date: item.date,
                  month: item.month,
                  doc: item.doc
                }
              })
            });
          this.plans.forEach(function (item) {
            console.log(moment(item.date));
          })
        }
      }
    }
</script>

<style scoped>
  .container-full {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .container-left {
    width: 450px;
    height: 600px;
    overflow-y: scroll;
    padding: 5px;
    background-color: rgba(33, 133, 208, 0.1);
    border: 2px solid rgba(33, 133, 208, 0.2);
    border-radius: 5px 0 0 5px;
  }
  .container-left-button {
    text-align: center;
    margin: 5px 0 10px 0;
  }
  .container-right {
    width: 450px;
    background-color: rgba(33, 133, 208, 0.1);
    border: 2px solid rgba(33, 133, 208, 0.2);
    border-radius: 0 5px 5px 0;
  }
  .header {
    text-align: center;
    font-weight: bolder;
    color: #4183c4;
    margin-bottom: 10px;
  }
</style>
