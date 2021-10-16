<template>
  <div class="main">
    <p class="main__text text">Добавить новую задачу</p>
    <div class="main__form">
      <input
        id="options"
        class="theme_input"
        type="text"
        size="40"
        placeholder="Описание"
      />
      <button class="form__submit theme_submit" @click="createTask()">
        &#128929;
      </button>
    </div>
  </div>
</template>

<script>
import {eventHandler} from './../main'

export default {
  name: "vMain",
  methods: {
    createTask: function () {
        var description = document.getElementById('options').value;
        if (description === ''){
            eventHandler.$emit('createTask');
            return
        }
        eventHandler.$emit('createTask',description);
        document.getElementById('options').value = '';
    },
  },
};
</script>

<style>
.main {
  padding-left: 10%;
  padding-right: 10%;
}
#options {
  border-radius: 5px;
  height: 100%;
  padding: 15px;
}
.form__submit {
  margin-bottom: -5px;
  width: 45px;
  height: 45px;
  border-radius: 25px;
  border: 0px;

  font-size: 1.5rem;
}
.main__form {
  display: flex;
  flex-direction: row;
  gap: 20px;
}
.main__text{
    font-weight: bold;
}
</style>