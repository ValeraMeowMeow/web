<template>
  <body>
    <v-header />
    <v-main />
    <div class="canban-container">
      <v-list :title="`План (${planning.length})`">
        <draggable
          class="vList__draggable-item"
          :list="planning"
          group="canban-lists"
          ghostClass="on-drag"
        >
          <v-task
            :key="index"
            :title="task.title"
            :id="task.id"
            :time_start="task.time_start"
            :task_manager="task.task_manager"
            :time_end="task.time_end"
            :description="task.description"
            v-for="(task,index) in planning"
          >
            <div class="task__edit-form">
              <img
                src=".\assets\edit.png"
                @click="openEdit(task.id,0,index)"
                width="30"
                alt="done"
              />
              <img
                src=".\assets\done.png"
                @click="taskToEnd(index,0)"
                width="30"
                alt="edit"
              />
            </div>
          </v-task>
        </draggable>
      </v-list>
      <v-list :title="`В работе (${inProgress.length})`">
        <draggable
          class="vList__draggable-item"
          :list="inProgress"
          group="canban-lists"
          ghostClass="on-drag"
        >
          <v-task
            :key="index"
            :title="task.title"
            :id="task.id"
            :time_start="task.time_start"
            :task_manager="task.task_manager"
            :time_end="task.time_end"
            :description="task.description"
            v-for="(task,index) in inProgress"
          >
            <div class="task__edit-form">
              <img
                src=".\assets\edit.png"
                @click="openEdit(task.id,1,index)"
                width="30"
                alt="done"
              />
              <img
                src=".\assets\done.png"
                @click="taskToEnd(index,1)"
                width="30"
                alt="edit"
              />
            </div>
          </v-task>
        </draggable>
      </v-list>
      <v-list group="canban-lists" :title="`Готово (${complete.length})`">
        <draggable
          class="vList__draggable-item"
          :list="complete"
          group="canban-lists"
          @add="setTimeEnd"
          ghostClass="on-drag"
        >
          <v-task
            :key="index"
            :title="task.title"
            :id="task.id"
            :isReady="true"
            :time_start="task.time_start"
            :task_manager="task.task_manager"
            :time_end="task.time_end"
            :description="task.description"
            v-for="(task,index) in complete"
          >
            <div class="task__edit-form">
              <img
                src=".\assets\edit.png"
                @click="openEdit(task.id,2,index)"
                width="30"
                alt="done"
              />
              <img
                src=".\assets\close.png"
                @click="dropTask(index)"
                width="30"
                alt="close"
              />
            </div>
          </v-task>
        </draggable>
      </v-list>
    </div>
    <v-form/>
  </body>
</template>

<script>
import vTask from "./components/vTask.vue";
import vList from "./components/vList.vue";
import draggable from "vuedraggable";
import vHeader from "./components/vHeader";
import vMain from "./components/vMain";
import {eventHandler} from './main'
import VForm from './components/vForm.vue';

export default {
  name: "App",
  components: { vTask, vList, draggable, vHeader, vMain, VForm },
  data() {
    return {
      card_count: 0,
      planning: [],
      inProgress: [],
      complete: [],
      changingCol: -1,
      changingIndex: -1,
    };
  },
  methods: {
    setTimeEnd(){
      this.complete.forEach(element => {
          if (element.time_end === null){
            element.time_end = new Date();
          }
      });
    },
     dropTask: function (index) {
      this.$delete(this.complete, index)
    },
    taskToEnd: function (index,column) {
      if (column === 0){
        this.complete.push(this.planning[index])
        this.$delete(this.planning, index)
      }
      else{
        this.complete.push(this.inProgress[index])
        this.$delete(this.inProgress, index)
      }
    },
    openEdit(id,col,index){
      document.getElementById("form").style.display = "block";
      this.changingCol = col;
      this.changingIndex = index;
      var item;
      if (col === 0){
        item = this.planning[index]
      }else if (col === 1){
        item = this.inProgress[index]
      }else{
        item = this.complete[index]
      }
      eventHandler.$emit('setTaskId',id,item,col);
    },
  },
  created() {
    eventHandler.$on('chancheTheme',toSwitch => {
      if (toSwitch){
        document.documentElement.style.setProperty('--back-color-primary','white')
        document.documentElement.style.setProperty('--back-color-secondary','#587de4af')
        document.documentElement.style.setProperty('--border-color','#342d97')
        document.documentElement.style.setProperty('--text-color-primary','#100a63')
        document.documentElement.style.setProperty('--text-color-secondary','white')
        document.documentElement.style.setProperty('--back-color-other','#2d2ab6')
      }
      else{
        document.documentElement.style.setProperty('--back-color-primary','black')
        document.documentElement.style.setProperty('--back-color-secondary','black')
        document.documentElement.style.setProperty('--border-color','white')
        document.documentElement.style.setProperty('--text-color-primary','white')
        document.documentElement.style.setProperty('--text-color-secondary','white')
      }
    },
  ),
    eventHandler.$on('createTask',decription => {
      if (decription === undefined)
        decription = 'Задача'
      var time = new Date()
        this.planning.push({id: this.card_count, title: `${decription} №${this.card_count}`,
                           time_start: time,time_end: null,description: 'пример описание',task_manager: 'пример владельца'});
        this.card_count++;
    }),
    eventHandler.$on('save',vals => {
        var status = vals[0]
        var item
        if (this.changingCol === 0){
          item = this.planning[this.changingIndex]
          this.$delete(this.planning, this.changingIndex)
        }else if(this.changingCol === 1){
          item = this.inProgress[this.changingIndex]
          this.$delete(this.inProgress, this.changingIndex)
        }else{
          item = this.complete[this.changingIndex]
          this.$delete(this.complete, this.changingIndex)
        }
        item.time_start = new Date(vals[2]);
        if (vals[3] != '')
          item.time_end = new Date(vals[3]);
        item.task_manager = vals[4];
        item.description = vals[5];
        
        
        if (status === 'План'){
          this.planning.push(item)
        }else if (status === 'Готово'){
          this.complete.push(item)
        }else if (status === 'В работе'){
          this.inProgress.push(item)
        }
    })
  }
};

</script>

<style>
:root {
  --back-color-primary: white;
  --back-color-secondary: #587de4af;
  --back-color-other: #2d2ab6;
  --border-color: #342d97;
  --text-color-primary: #100a63;
  --text-color-secondary: white;
}
body {
  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  background-color: var(--back-color-primary);
}
p {
  font-family:Verdana, Geneva, Tahoma, sans-serif;
}
.vList {
  display: flex;
  flex-direction: column;
  column-gap: 30px;
  border: 1px solid var(--border-color);
  width: 100%;
  border-radius: 2px;
  padding: 20px;
  gap: 30px;
  height: auto;
}
.canban-container {
  margin-top: 50px;
  padding-left: 10%;
  padding-right: 10%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  gap: 10%;
  max-width: 100%;
  height: auto;
}
.task:hover {
  cursor: move;
}
.on-drag {
  background-color: lightskyblue;
  z-index: 10;
}
.vTask {
  color: var(--text-color-secondary);
  background-color: var(--back-color-secondary);
  border: 1px solid var(--border-color);
  padding: 10px;
  text-align: center;
  min-height: 400px;
  max-width: 100%;
  display: flex;
  border-radius: 2px;
  flex-direction: column;
  justify-content: space-between;
}
.vTask:hover{
  background-color: var(--back-color-other);
}
.vList__draggable-item {
  display: flex;
  flex-direction: column;
  gap: 30px;
  min-height: 100%;
}
.task__edit-form {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 5px;
}
input:focus {
  outline: 0;
}
input::placeholder {
  color: var(--text-color-secondary);
}
.theme_input {
  border: 1px solid var(--border-color);
  color: var(--text-color-secondary);
  background-color: var(--back-color-secondary);
  font-family:Verdana, Geneva, Tahoma, sans-serif;
}
.theme_submit{
  color: white;
  background-color: var(--back-color-other);
}
.theme_1{
  background-color: var(--back-color-other);
  color: white;
}
.text{
  color: var(--text-color-primary);
}
.text_2{
  color: var(--text-color-primary);
}
.show {
  display: block;
}
.theme-border{
  border: 1px solid var(--text-color-primary);
}
@media (max-width: 1000px) and (min-width: 600px) {
  .canban-container {
    width: 90%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    row-gap: 50px;
    margin: 20px 20px 20px 10px;
    justify-content: space-between;
    padding: 0px;
  }
}

@media (max-width: 611px) {
  .canban-container {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(3, 1fr);
    row-gap: 50px;
    max-width: 84%;
    padding-right: 2%;
    padding-left: 2%;
    margin-left: 2%;
  }
  .header {
    flex-direction: column;
    justify-content: center;
  }
  input {
    width: 70%;
  }
  .header__title {
    height: 100px;
  }
}
</style>
