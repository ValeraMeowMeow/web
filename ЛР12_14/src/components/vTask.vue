<template>
  <div class="vTask">
    <div class="task__head">{{ title }}</div>
    <div class="vList__form">
      <div class="form__text">
        <p>{{ description }}</p>
      </div>
      <div class="form__title_text">
        <p>Дата и время начала</p>
      </div>
      <div class="form__text">
        <p>{{ time_start.toLocaleString() }}</p>
      </div>
      <div v-if="isReady" class="form__title_text">
        <p>Ушло времяни</p>
      </div>
      <div v-if="isReady" class="form__text">
        <p>{{ getEndTime() }}</p>
      </div>
      <div class="form__title_text">
        <p>Ответственный</p>
      </div>
      <div class="form__text">
        <p>{{ task_manager }}</p>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>

export default {
  name: "vTask",
  props: {
    id: {
      type: Number,
      default: -1,
    },
    title: {
      type: String,
      default: "Задача",
    },
    isReady: {
      type: Boolean,
      default: false,
    },
    task_manager: {
      type: String,
      default: "Пример владельца"
    },
    time_start: {
      type: Date,
      default: null
    },
    description: {
      type: String,
      default: 'Пример описания'
    },
    time_end: {
      type: Date,
      default: null
    }
  },
  data() {
    return {
    };
  },
  methods: {
    getStartTime: function () {
      return this.time_start.toLocaleString();
    },
    getEndTime: function () {
      var mills;

      if (this.time_end === null)
        mills = new Date() - this.time_start;
      else
        mills = this.time_end - this.time_start;

      var sec = Math.floor(mills / 1000);
      var min = Math.floor(sec / 60);
      var hours = Math.floor(min / 60);
      var days = Math.floor(hours / 24);
      sec = sec - min * 60;
      min = min - hours * 60;
      hours = hours - days * 24;
      return `Дни: ${days}, часы: ${hours}, минуты: ${min}, секунды: ${sec}`;
    },
  },
};
</script>

<style>
.task__head {
  font-weight: bold;
  font-size: 20px;
  text-transform: uppercase;
  text-align: center;
  color: inherit;
  padding: 0;
  margin-left: 20px;
  margin-top: 5px;
  margin-bottom: 20px;
  max-width: auto;
  word-wrap: break-word;
}
.vList__form {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0px;
}
.vList__form p {
  margin: 10px;
  padding: 0;
}
.form__title_text {
  font-weight: bold;
}
.form__text {
  margin-left: 10px;
}
</style>