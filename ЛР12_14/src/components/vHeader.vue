<template>
  <div class="header">
    <div class="header__head text">
      <p>Канбан</p>
    </div>
    <div class="header__theme_mode">
      <div class="theme_mode__head">
        <p class="text">Темная тема</p>
      </div>
      <div class="theme_mode__change_theme_button theme_1">
        <div
          id="switch_rotate_b"
          class="change_theme_button__switch"
          v-bind:class="[{ off: !lightMode }, 
                         { on: lightMode }]"
          v-on:click="switch_mode"
        ></div>
        <div class="switch">
          <p>ON</p>
          <p>OFF</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {eventHandler} from './../main'

export default {
  name: "vHeader",
  data() {
    return {
      lightMode: true,
    };
  },
  methods: {
    switch_mode: function () {
        this.lightMode = !this.lightMode;
        eventHandler.$emit('chancheTheme', this.lightMode)  
    },
  },
};
</script>

<style>
.header {
  padding-right: 7%;
  padding-left: 10%;
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: inherit;
  vertical-align: middle;
}
.header__head {
  font-size: 4rem;
  font-weight: bold;
}
.header__theme_mode {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}
.theme_mode__head {
  font-size: 1rem;
}
.theme_mode__change_theme_button {
  font-size: 0.5rem;
  border-radius: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 2px;
  padding-right: 2px;
  padding-top: 0px;
  padding-bottom: 0px;
}
.change_theme_button__switch {
  background-color: white;
  margin-top: 1px;
  margin-left: -1px;
  height: 23px;
  width: 22px;
  border-radius: 20px;
  position: absolute;
}
.on {
  animation: spin2 0.3s 1;
  animation-fill-mode: forwards;
}
.off {
  animation: spin1 0.3s 1;
  animation-fill-mode: forwards;
}
@keyframes spin1 {
  0% {
    transform: translateX(0px);
  }
  100% {
    transform: translateX(28px);
  }
}
@keyframes spin2 {
  0% {
    transform: translateX(28px);
  }
  100% {
    transform: translateX(0px);
  }
}
.switch {
  padding-left: 5px;
  padding-right: 5px;
  display: flex;
  flex-direction: row;
  gap: 10px;
}
</style>