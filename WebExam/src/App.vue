<template>
  <div id="app" class="app">
    <div class="header">
      <div class="header-content">
        <div class="title-kanban">
          <div class="title__img">
            <img srcset="./assets/logo.png 1.3x" alt="Логотип" width="40px" height="40px">
          </div>
          <h1 class="title__name-dev">ToDoList || Лобанова Валерия</h1>
        </div>
        <div class="edit-schema">
          <p>Темная тема</p>
          <toggle-button
              @change="editSchema"
              color="#2c3e50"
              :labels="true"
              :font-size="18"
              :width='60'
              :height="30"
              aria-label="Изменить тему"
          />
        </div>
      </div>
    </div>
    <div class="main">
      <button
          @click="openModal"
          type="button"
          class="btn btn-dark d-block mx-auto"
          data-toggle="modal"
          data-target="#exampleModal"
          aria-label="Добавить задачу"
      >
        Добавить задачу
      </button>
      <div class="list_cards">
        <div v-for="(item, i) in listTasks" :key="i"
             :class="
           item.type === 'one' ?
           'list-item__card card-one' :
           item.type === 'two' ?
            'list-item__card card-two' :
            'list-item__card card-three'"
        >
          <p class="list-item__number">{{ i + 1 }}</p>
          <p class="list-item__text_bold">{{ item.description }}</p>
          <button
              @click="deleteItem(i)"
              class="item__button"
              aria-label="Удалить задачу"
          >
            <img class="table__img-basket" src="./assets/basket.svg" alt="Удаление">
          </button>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal-shadow" @click.self="closeModal">
      <AddTask
          @close-modal="closeModal"
          @add-task="addTask"
      />
    </div>
    <footer>
      <div class="footer-content">
        <div class="name">Лобанова Валерия Вячеславовна</div>
        <div class="group">191-361</div>
        <div class="date">16.10.2021</div>
      </div>
    </footer>
  </div>
</template>

<script>

import AddTask from './components/AddTask';
import {ToggleButton} from 'vue-js-toggle-button'

import Vue from 'vue';

Vue.component('ToggleButton', ToggleButton)

export default {
  name: 'App',
  components: {AddTask},
  data() {
    return {
      listTasks: [],
      showModal: false,
      clicked: false
    }
  },
  methods: {
    /**
     * Закрытие окна для изменения задачи.
     */
    closeModal() {
      this.showModal = false
      document.getElementById('app').style.pointerEvents = "auto"
    },
    openModal() {
      this.showModal = true
    },
    addTask(description_task, type_task) {
      this.listTasks.unshift({description: description_task, type: type_task});
    },
    deleteItem(id) {
      this.listTasks.splice(id, 1)
    },
    editSchema() {
      if (this.clicked) {
        document.documentElement.style.setProperty('--color-base-blue', '#313a8d');
        document.documentElement.style.setProperty('--color-background', 'white');
      } else {
        document.documentElement.style.setProperty('--color-base-blue', '#869af3');
        document.documentElement.style.setProperty('--color-background', '#1d2752');
      }
      this.clicked = !this.clicked
    }
  }
}
</script>

<style>

:root {
  --color-title-gray: #6652c0;
  --color-base-blue: #313a8d;
  --color-background-blue: #d3ddfd;
  --color-life-dark: #283158;
  --color-background: white;
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  min-height: 5vh;
  background-color: var(--color-base-blue);
}

.header-content {
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
  color: var(--color-background);
  align-items: center;
  margin: 0 auto;
}

.title-kanban {
  display: flex;
  gap: 20px;
}

.title__img {
  display: flex;
  align-items: center;
}

.edit-schema {
  display: flex;
  gap: 20px;
  align-items: center;
}

.edit-schema p, label{
  margin-bottom: 0;
}

.main {
  padding: 50px 20px;
  min-height: 90vh;
  background-color: var(--color-background);
}

.item__button {
  display: flex;
  align-self: flex-end;
  padding: 3px;
  background-color: rgb(241, 112, 6);
  color: white;
  border: 1px solid rgb(241, 112, 6);;
  border-radius: 5px;
  max-width: 28px;
  justify-self: end;
}

.list_cards {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  grid-template-columns: auto;
  gap: 10px;
}

.list-item__card {
  background-color: var(--color-base-blue);
  color: var(--color-background);
  padding: 10px;
  display: grid;
  border: 1px solid #2c3e50;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.card-one {
  width: 300px;
}

.card-two {
  width: 270px;
}

.card-three {
  width: 240px;
}

.list-item__number {
  text-align: left;
}

.list-item__text_bold {
  font-weight: bold;
}

.table__img-basket {
  max-width: 20px;
}

.title__name-dev {
  font-size: 1.8em;
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: 'Century Gothic', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

footer {
  min-height: 5vh;
  background-color: var(--color-base-blue);
}

.footer-content {
  color: var(--color-background);
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
  padding: 20px 50px;
  font-family: 'Century Gothic', 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}


@media (max-width: 900px) {
  .title__name-dev {
    font-size: 1.5em;
  }
}

@media (max-width: 800px) {
  .list_cards {
    justify-content: center;
  }
}

@media (max-width: 650px) {
  .header-content {
    flex-direction: column;
    padding: 5px 10px;
  }

  .title__name-dev {
    font-size: 1.2em;
  }
}

@media (max-width: 550px) {
  .footer-content {
    flex-direction: column;
    gap: 10px;
  }
}
</style>
