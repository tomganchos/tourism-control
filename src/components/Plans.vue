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
                <a is="sui-list-description" class="list-description">
                  <span v-if="item.month">На месяц</span>
                  <span v-else>Просто документ</span> | <span v-if="item.month">{{item.date | moment('MMMM YYYY')}}</span>
                  <span v-else>{{item.date | moment('YYYY')}}</span>
                </a>
              </sui-list-content>
            </sui-list-item>
          </sui-list>
        </div>
      </div>
      <div class="container-right">
        <div id="content-menu" v-bind:class="[classContentMenu]">
          <h2>{{header}}</h2>
          <div class="content-group">
            <strong class="label">Название документа</strong>
            <sui-input placeholder="Введите название..." v-model="namePlan"></sui-input>
          </div>
          <div class="content-group">
            <strong class="label">Ссылка на документ</strong>
            <sui-input placeholder="https://..." v-model="docPlan"></sui-input>
          </div>
          <div class="content-group">
            <strong class="label">План на месяц</strong>
            <div class="checkbox">
              <sui-checkbox v-model="monthPlan"></sui-checkbox>
            </div>
          </div>
          <div class="content-group">
            <strong class="label">Дата</strong>
            <div class="ui input">
              <input id="date-input" type="date" v-model="datePlan">
            </div>
            <div class="date-description">*Описание о дате</div>
          </div>
          <div class="container-right-button">
            <sui-button positive v-bind:class="[changedButton]" @click="saveChangedPlan()">Сохранить изменения</sui-button>
            <sui-button color="red" v-bind:class="[changedButton]" @click="deletePlan()">Удалить документ</sui-button>
            <sui-button positive v-bind:class="[addButton]" @click="saveNewPlan()">Добавить документ</sui-button>
          </div>
        </div>
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
          monthPlan: false,
          docPlan: ''
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
        },
        getPlan(item) {
          console.log(item);
          this.header = 'Редактирование документа';
          this.changedButton = '';
          this.addButton = 'invisible-button';
          this.idPlan = item.id;
          this.namePlan = item.name;
          this.docPlan = item.doc;
          this.datePlan = moment(item.date).format('YYYY-MM-DD');
          this.monthPlan = item.month;
          this.classContentMenu = '';
        }
      }
    }
</script>

<style scoped>
  .ui.input {
    width: 100%;
    padding: 5px 10px 10px;
  }
  strong.label {
    padding: 10px;
    font-size: medium;
  }
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
  .container-right-button {
    text-align: center;
    margin: 5px 0 10px 0;
  }
  .header {
    text-align: center;
    font-weight: bolder;
    color: #4183c4;
    margin-bottom: 10px;
  }
  .list-icon {
    padding: 10px 0;
  }
  .list-header {
    text-align: left;
    padding: 3px 0;
  }
  .list-description {
    text-align: left;
    padding: 3px 0;
  }
  #content-menu.none {
    display: none;
  }
  h2 {
    margin: 10px;
  }
  .invisible-button {
    display: none;
  }
  .checkbox {
    margin: 3px 0 3px 5px;
  }
  .date-description {
    margin: -3px 0 10px 10px;
    font-size: 75%;
  }
</style>
