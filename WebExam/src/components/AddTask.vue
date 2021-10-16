<template>
  <div class="modal-main">
    <div class="modal-close">
      <button
          v-on:click="$emit('close-modal')" aria-label="закрыть модальное окно"
      >&#10006;
      </button>
    </div>
    <div class="modal-content">
      <form class="modal__form" action="" @submit.prevent="onSaveTask">
        <label for="edit-description"> Описание</label>
        <textarea id="edit-description"
                  class="modal__description"
                  v-model="description_task"
                  placeholder="Описание..."
                  aria-label="Описание задачи"
        ></textarea>
        <label for="edit-status">Статус</label>
        <select name="" id="edit-status" v-model="type_task" aria-label="Тип задачи">
          <option value="one">Уровень важности 1</option>
          <option value="two">Уровень важности 2</option>
          <option value="three">Уровень важности 3</option>
        </select>

        <button class="modal-form_button" type="submit" aria-label="Сохранить параметры"
                :disabled="(description_task.length === 0) || (type_task.length === 0)">
          Сохранить
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddTask",
  data() {
    return {
      description_task: "",
      type_task: ""
    }
  },
  methods: {
    onSaveTask() {
      this.$emit('add-task',
          this.description_task,
          this.type_task)
      this.$emit('close-modal')
    }
  }
}
</script>
<style scoped>

.modal-main {
  z-index: 9999;
  background: white;
  border-radius: 20px;
  border: var(--color-title-gray) solid 2px;
  width: 35%;
  position: absolute;
  padding: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-close {
  text-align: right;
  margin: 10px 10px 0px 20px;
}

.modal-form_button:disabled {
  margin-top: 30px;
  background-color: #313a8d;
}

.modal-close button {
  background-color: #2C3E50FF;
  border: #2C3E50FF;
  border-radius: 50%;
  height: 35px;
  width: 36px;
  font-size: 1em;
  color: white;
  cursor: pointer;
}

.modal-close button:active, .modal-close button:focus {
  outline: none;
}

.modal__form {
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal__description {
  width: 90%;
  max-width: 400px;
}

.modal-content {
  display: flex;
  justify-content: center;
  border: 0;
}

.modal-content label {
  display: inline-block;
  color: #252c69;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
}

.modal-content input {
  padding-left: 5px;
  margin: 0 auto;
  font-size: 1em;
  color: #252c69;
}

.modal-content select {
  padding-left: 5px;
  width: 90%;
  max-width: 400px;
  background-color: var(--color-background-blue);
  border: #252c69 solid 1px;
  border-radius: 5px;
  height: 40px;
  font-size: 1em;
  color: #252c69;
}

.modal-content input::placeholder {
  padding-left: 5px;
  margin: 0 auto;
  font-size: 1em;
  color: #252c69;
}


.modal-content button {
  display: grid;
  margin: 10px auto;
  color: white;
  background-color: #252c69;
  border: #252c69 solid 2px;
  border-radius: 5px;
  width: 150px;
  font-size: 1.2em;
}

@media (max-width: 1000px) {
  .modal-main {
    width: 50%;
  }
}

@media (max-width: 700px) {
  .modal-main {
    width: 60%;
  }
}

@media (max-width: 600px) {
  .modal-main {
    width: 90%;
  }

  .modal-content input, .modal-content select {
    width: 250px;
  }
}

</style>
