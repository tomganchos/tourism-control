<template>

  <div class="container">
    <div class="container-scroll">
      <div class="container-scroll__add-button">
        <sui-button primary>Добавить новость</sui-button>
      </div>
      <div class="container-scroll__list">
        <div v-for="item in docs" class="news" :key="item.id">
          <div class="news-name">
            {{ item.title}}
          </div>
          <div class="news-date">
            {{ getDate(item.date) }}
          </div>
        </div>
      </div>
    </div>
    <div class="container-info">
      <div class="container-info__blocks">
        <div class="block">
          <div class="label">Название новости</div>
          <sui-input v-model="title" size="mini"/>
        </div>
        <div class="block">
          <div class="label">Дата новости</div>
          <sui-input v-model="date" type="date" size="mini"/>
        </div>
        <div class="block">
          <div class="label">Текст новости</div>
          <textarea class="input-text" v-model="description"/>
        </div>

        <div class="block">
          <sui-checkbox label="Итоги" v-model="result"/>
        </div>

        <div class="block">
          <div class="label">Документы</div>
          <div class="block-list">
            <div v-for="link in links" class="block-item">
              <sui-input class="block-item__title"
                         placeholder="Название документа"
                         v-model="link.title" size="mini"/>
              <sui-input class="block-item__link"
                         placeholder="Ссылка на документ"
                         v-model="link.link" size="mini"/>
            </div>
            <div class="block-button">
              <sui-button primary @click="addDoc()">Добавить документ</sui-button>
              <sui-button v-if="links.length !== 0" negative
                          @click="removeDoc()">Убрать</sui-button>
            </div>
          </div>
        </div>

        <div class="block">
          <div class="label">Изображения</div>
          <sui-input type="file" multiple v-model="images"/>
        </div>
      </div>
      <div class="container-info__buttons">
        <sui-button negative v-on:click="removeNews()">Удалить новость</sui-button>
        <sui-button primary v-on:click="addNews()">Сохранить новость</sui-button>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  import axios from 'axios'
    export default {
        name: "News",
      data() {
          return {

            title: '',
            date: '',
            description: '',
            docs: [],
            links: [],
            images: null,
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
            this.docs = response.data
            console.log(this.docs)
          })
      },
      methods: {
        addNews: function () {

          // if (this.name !== '' && this.date !== '') {
          //   axios.post('http://localhost:3012/news', {
          //         name: this.name,
          //         date: this.date + 'T00:00:00.000',
          //     description: description.text,
          //         selection: this.section
          //         }).then((response) => {
          //     console.log(response);
          //   });
          //   axios.post("http://localhost:3012/news", '', {
          //     headers: {
          //       'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify({
          //       name: this.name,
          //       date: this.date + 'T00:00:00.000',
          //       description: this.description,
          //       selection: this.section
          //       })
          //   }).then(function (response) {
          //     console.log(response.data);
          //     console.log(response.status);
          //   }).catch(function (error) {
          //     console.log(error.status);
          //     if (response.status === 401) {
          //       console.log(401);
          //     }
          //   })
          // } else {
          //   console.log('else');
          // }
          console.log(this.title);
          console.log(this.date);
          console.log(this.description);
          console.log(this.images);
          console.log(this.result);
          console.log(this.current);
        },
        removeNews: function() {
          console.log('remove')
        },
        addDoc() {
          this.links.push({
            title: '',
            link: ''
          })
        },
        removeDoc() {
          this.links.pop()
        },
        getDate(date) {
          return moment(date).locale('ru').format('DD MMMM YYYY')
        }
      }
    }
</script>

<style scoped>
  .input-text {
    border: 1px solid rgba(34,36,38,.15);
    color: rgba(0,0,0,.87);
    border-radius: .28571429rem;
    width: 470px;
    height: 150px;
  }
  .container {
    height: calc(100vh - 60px);
    display: flex;
    justify-content: center;
  }

  .container-scroll {
    width: 400px;
  }

  .container-scroll__add-button {
    display: flex;
    justify-content: center;
    padding: 10px;
  }
  .container-scroll__list {
    height: calc(100vh - 116px);
    overflow-y: scroll;
  }
  .container-info {
    width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .container-info__blocks {
    overflow: auto;
  }
  .container-info__buttons {
    display: flex;
    margin: 15px;
    justify-content: flex-end;
  }

  .news {
    display: flex;
    flex-direction: column;
    padding: 5px 10px;
  }
  .news:hover {
    background-color: #2185d0;
    color: #fff;
    cursor: pointer;
  }
  .news-name {
    font-weight: bold;
  }

  .block {
    margin: 15px;
  }
  .block .label {
    font-weight: bold;
    margin-bottom: 5px;
  }
  .block .input {
    width: 100%;
  }
  .block .input[type="date"] {
    width: auto;
    height: 38px;
  }
  .block textarea {
    width: 100%;
  }
  .block-item {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    margin-bottom: 15px;
  }
  .block-item .block-item__link, .block-item .block-item__title {
    width: 45%;
  }
  .block-button {
    margin-top: 5px;
  }

</style>
