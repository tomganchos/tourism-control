<template>
    <div class="news-panel">


      <container>
        <grid vertical="top" :rwd="{compact: 'stack'}">
          <grid-item size="1/2">

            <sui-segment>
              <div style="text-align: center; margin-bottom: 10px">
                <sui-button primary>Добавить новость</sui-button>
              </div>

              <div>
                <sui-list divided relaxed>
                  <sui-list-item v-for="item in docs" :key="item.id">
                    <sui-list-icon name="pen square" size="large" vertical-align="middle" />
                    <sui-list-content>
                      <a is="sui-list-header">{{item.name}}</a>
                      <a is="sui-list-description">{{item.date}}</a>
                    </sui-list-content>
                  </sui-list-item>
                </sui-list>
              </div>

              <div style="text-align: center; margin-top: 10px">
                <sui-button animated="vertical" primary>
                  <sui-button-content visible>Загрузить ещё</sui-button-content>
                  <sui-button-content hidden>
                    <sui-icon name="down arrow" />
                  </sui-button-content>
                </sui-button>
              </div>
            </sui-segment>
          </grid-item>

          <grid-item size="1/2">
            <sui-segment>
              <div>
                <div class="name-block">
                  <h3>Название новости</h3>
                  <sui-input class="input-name" v-model="name" placeholder="Введите название.." />
                </div>
                <div class="date-block">
                  <h3>Дата</h3>
                  <input class="input-date" v-model="date" type="date" placeholder="Введите название..">
                </div>
                <div class="text-block">
                  <h3>Текст новости</h3>
                  <textarea class="input-text" v-model="text"></textarea>
                </div>
                <div class="link-block">
                  <h3>Ссылки</h3>
                  <div>
                    <sui-button primary>Добавить документ</sui-button>
                    <sui-button negative>Удалить</sui-button>
                  </div>
                </div>
                <div class="image-block">
                  <h3>Ссылка на изображение</h3>
                  <div>Изображение должно быть горизонтальным</div>
                  <sui-input class="input-image" v-model="img" placeholder="Ссылка.." />
                </div>
                <div class="result-block">
                  <sui-checkbox class="checkbox-result" v-model="result" label="Итоги" />
                  <sui-dropdown
                    placeholder="Отдел"
                    selection
                    :options="listSections"
                    v-model="current"
                  />
                </div>
                <div class="buttons">
                  <sui-button primary v-on:click="addNews()">Отправить новость</sui-button>
                </div>
              </div>
            </sui-segment>
          </grid-item>
        </grid>
      </container>

    </div>
</template>

<script>
  import axios from 'axios'
    export default {
        name: "News",
      data() {
          return {

            name: '',
            date: '',
            text: '',
            docs: [],
            img: '',
            result: false,
            section: this.current,

            current: null,
            listSections: [{
              text: 'Краеведение',
              value: 'localHistory',
            }, {
              text: 'Туризм',
              value: 'tourism',
            }, {
              text: 'Музейная работа',
              value: 'museum',
            }, {
              text: 'Экскурсионная работа',
              value: 'trip',
            }],
          }
      },
      created() {
        axios.get("http://localhost:3012/news")
          .then(response => {
            this.docs = response.data.map((item) => {
              return {
                name: item.name,
                text: item.text,
                date: item.date
              }
            });
            console.log(this.docs)
          })
      },
      methods: {
          addNews: function () {

            if (this.name !== '' && this.date !== '') {
              axios.post('http://localhost:3012/news', {
                    name: this.name,
                    date: this.date + 'T00:00:00.000',
                    text: this.text,
                    selection: this.section
                    }).then((response) => {
                console.log(response);
              });
              axios.post("http://localhost:3012/news", '', {
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: this.name,
                  date: this.date + 'T00:00:00.000',
                  text: this.text,
                  selection: this.section
                  })
              }).then(function (response) {
                console.log(response.data);
                console.log(response.status);
              }).catch(function (error) {
                console.log(error.status);
                if (response.status === 401) {
                  console.log(401);
                }
              })
            } else {
              console.log('else');
            }
            console.log(this.name);
            console.log(this.date);
            console.log(this.text);
            console.log(this.img);
            console.log(this.result);
            console.log(this.current);
          }

      }
    }
</script>

<style scoped>
  .vfg-container {
    max-width: 1200px !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  .vfg-grid-item {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .ui.segment {
    text-align: left;
    min-width: 300px;
    max-width: 500px;
    margin: 5px 5px 200px 5px;
  }
  .news-panel {
    text-align: center;
    text-align: -moz-center;
    text-align: -webkit-center;
  }
  .input-name, .input-image {
    width: 470px;
  }
  .date-block, .text-block, .link-block, .image-block {
    margin-top: 10px;
  }
  .result-block {
    margin-top: 15px;
  }
  .input-date {
    border: 1px solid rgba(34,36,38,.15);
    color: rgba(0,0,0,.87);
    border-radius: .28571429rem;
    padding: .67857143em 1em;
    line-height: 1.21428571em;
    width: 154px;
  }
  .input-text {
    border: 1px solid rgba(34,36,38,.15);
    color: rgba(0,0,0,.87);
    border-radius: .28571429rem;
    width: 470px;
    height: 150px;
  }
  .checkbox-result {
    margin-right: 15px;
  }

  h3 {
    margin-bottom: 5px;
  }
</style>
