<template>
    <div>
      <div class="container-full">
        <div class="container-left">
          <div class="container-left-button">
            <sui-button primary @click="newPublication()">Добавить новость</sui-button>
          </div>
          <div>
            <sui-list divided>
              <sui-list-item v-for="item in publications" :key="item.id" @click="getPublication(item)">
                <sui-list-icon name="pencil" vertical-align="middle" class="list-icon"/>
                <sui-list-content>
                  <a is="sui-list-header" class="list-header">{{item.name}}</a>
                  <a is="sui-list-description" class="list-description">{{item.journal}} | {{item.date | moment('DD.MM.YYYY')}}</a>
                </sui-list-content>
              </sui-list-item>
            </sui-list>
          </div>
        </div>
        <div class="container-right">
          <div id="content-menu" v-bind:class="[classContentMenu]">
            <h2>{{header}}</h2>
            <div class="content-group">
              <strong class="label">Название публикации</strong>
              <sui-input placeholder="Введите название..." v-model="namePublication"></sui-input>
            </div>
            <div class="content-group">
              <strong class="label">Ссылка на публикацию</strong>
              <sui-input placeholder="https://..." v-model="linkPublication"></sui-input>
            </div>
            <div class="content-group">
              <strong class="label">Название ресурса</strong>
              <sui-input placeholder="Например: ПЛН, ГТРК, КурьерЪ,.." v-model="journalPublication"></sui-input>
            </div>
            <div class="content-group">
              <strong class="label">Дата</strong>
              <div class="ui input">
                <input id="date-input" type="date" v-model="datePublication">
              </div>
            </div>
            <div class="container-right-button">
              <sui-button positive v-bind:class="[changedButton]" @click="saveChangedPublication()">Сохранить изменения</sui-button>
              <sui-button color="red" v-bind:class="[changedButton]" @click="deletePublication()">Удалить публикацию</sui-button>
              <sui-button positive v-bind:class="[addButton]" @click="saveNewPublication()">Добавить публикацию</sui-button>
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
      name: "Publications",
      data() {
          return {
            publications: [],
            classContentMenu: 'none',
            header: '',

            changedButton: '',
            addButton: '',

            idPublication: '',
            namePublication: '',
            linkPublication: '',
            datePublication: '',
            journalPublication: '',
          }
      },
      created() {
        this.getPublications();
      },
      methods: {
        newPublication() {
          this.header = 'Добавление публицации';
          this.changedButton = 'invisible-button';
          this.addButton = '';
          this.namePublication = '';
          this.linkPublication = '';
          this.datePublication = '';
          this.journalPublication = '';
          this.classContentMenu = '';
        },
        getPublication(item) {
          console.log(item);
          this.header = 'Редактирование публикации';
          this.changedButton = '';
          this.addButton = 'invisible-button';
          this.idPublication = item.id;
          this.namePublication = item.name;
          this.linkPublication = item.link;
          this.datePublication = moment(item.date).format('YYYY-MM-DD');
          this.journalPublication = item.journal;
          this.classContentMenu = '';
        },
        saveChangedPublication() {
          let body = {
            id: this.idPublication,
            name: this.namePublication,
            link: this.linkPublication,
            date: moment(this.datePublication).format('YYYY-MM-DDTHH:mm:SS.sss'),
            journal: this.journalPublication
          };
          axios.put(host + '/publications', body, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
            .then((response) => {
              console.log(response);
              this.getPublications();
              this.idPublication = '';
              this.namePublication = '';
              this.linkPublication = '';
              this.datePublication = '';
              this.journalPublication = '';
              this.classContentMenu = 'none';
            })
            .catch((error) => {
              console.log(error);
            })
        },
        saveNewPublication() {
          let body = {
            name: this.namePublication,
            link: this.linkPublication,
            date: moment(this.datePublication).format('YYYY-MM-DDTHH:mm:SS.sss'),
            journal: this.journalPublication
          };
          axios.post(host + '/publications', body, {
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
            .then((response) => {
              console.log(response);
              this.getPublications();
              this.idPublication = '';
              this.namePublication = '';
              this.linkPublication = '';
              this.datePublication = '';
              this.journalPublication = '';
              this.classContentMenu = 'none';
            })
            .catch((error) => {
              console.log(error);
            });
        },
        deletePublication() {
          axios.delete(host + '/publications', {
            params: {
              id: this.idPublication,
            },
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          })
            .then((response) => {
              console.log(response);
              this.getPublications();
              this.idPublication = '';
              this.namePublication = '';
              this.linkPublication = '';
              this.datePublication = '';
              this.journalPublication = '';
              this.classContentMenu = 'none';
            })
            .catch((error) => {
              console.log(error);
            });
        },
        getPublications() {
          axios.get(host + '/publications')
            .then(response => {
              this.publications = response.data.map((item) => {
                return {
                  name: item.name,
                  link: item.link,
                  date: item.date,
                  journal: item.journal,
                  id: item._id
                }
              });
            })
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
  .content-group {

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

</style>
