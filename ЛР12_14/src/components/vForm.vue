<template>
  <div id="form" class="theme-border">
    <div class="form_header">
      <img src="..\assets\exit.png" @click="exit()" alt="exit" />
    </div>
    <form>
      <div class="form_item">
        <p class="form_item__title_text text">Описание</p>
        <input
          id="options_input"
          class="form_item__container text_2"
          type="text"
          placeholder="Lorem ipsum"
          name="user_name"
        />
      </div>
      <div class="form_item">
        <p class="form_item__title_text text">Статус</p>
        <div
          class="form_item__container dropdown unselectable"
          @click="open_dropdown()"
        >
          <div id="dropdown_text" class="container__dropbtn text_2">
            <p id="dropdown_text__name">План</p>
            <p id="dropdown_text__arrow">˅</p>
          </div>
          <div>
            <div id="myDropdown" class="dropdown_content_light_mode">
              <div
                class="dropdown-content__text theme_input"
                @click="setDropDownText('План')"
              >
                План
              </div>
              <div
                class="dropdown-content__text theme_input"
                @click="setDropDownText('В работе')"
              >
                В работе
              </div>
              <div
                class="dropdown-content__text theme_input"
                @click="setDropDownText('Готово')"
              >
                Готово
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="form_item">
        <p class="form_item__title_text text">Ответственный</p>
        <input
          id="owner_input"
          class="form_item__container text_2"
          type="text"
          placeholder="Введите имя"
          name="user_name"
        />
      </div>
      <div class="form_item">
        <p class="form_item__title_text text">Дата и время начала</p>
        <input
          id="date_start_input"
          class="form_item__container text_2"
          type="datetime-local"
          name="user_name"
        />
      </div>
      <div class="form_item">
        <p class="form_item__title_text text">Дата и время завершения</p>
        <input
          id="date_end_input"
          class="form_item__container text_2"
          type="datetime-local"
          name="user_name"
        />
      </div>
      <div class="form_item_button" @click="saveAndClose()">➔</div>
    </form>
  </div>
</template>

<script>
import { eventHandler } from "./../main";

export default {
  data() {
    return {
      changing_id: -1,
    };
  },
  methods: {
    open_dropdown: function () {
      document.getElementById("myDropdown").classList.toggle("show");
    },

    setDropDownText: function (val) {
      document.getElementById("dropdown_text__name").innerHTML = val;
    },
    saveAndClose: function () {
      var time_1 = document.getElementById("date_start_input").value;
      var time_2 = document.getElementById("date_end_input").value;
      var manager = document.getElementById("owner_input").value;
      var description = document.getElementById("options_input").value;
      var status = document.getElementById("dropdown_text__name").innerHTML;

      eventHandler.$emit("save", [
        status,
        this.changing_id,
        time_1,
        time_2,
        manager,
        description,
      ]);
      document.getElementById("form").style.display = "none";
    },
    exit: function () {
      document.getElementById("form").style.display = "none";
    },
    parseDate(date){
      var dd = date.getDate();
      var mm = date.getMonth() + 1;
      var yyyy = date.getFullYear();
      var minutes = date.getMinutes();
      var hour = date.getHours();
      if(dd < 10){
        dd='0' + dd
      } 
      if(mm < 10){
        mm='0' + mm
      }
      if(hour < 10){
        hour='0' + hour
      }
      if(minutes < 10){
        minutes='0' + minutes
      }

      date = yyyy + '-' + mm + '-' + dd + 'T' + hour + ':' + minutes;
      return date
    },
  },
  created() {
    eventHandler.$on("setTaskId", (id,item,col) => {
      this.changing_id = id;

      document.getElementById("options_input").value = item.description;
      document.getElementById("owner_input").value = item.task_manager;
      
      document.getElementById("date_start_input").value = this.parseDate(item.time_start);
      try{
        document.getElementById("date_end_input").value = this.parseDate(item.time_end);
      }catch(e){
        document.getElementById("date_end_input").value = '';
      }

      if (col === 0)
        this.setDropDownText('План')
      else if (col===1)  
        this.setDropDownText('В работе')
      else 
        this.setDropDownText('Готово')
    });
  },
};
</script>

<style>
#form {
  position: fixed;
  display: none;
  top: 50%;
  border-radius: 5px;
  left: 0;
  width: 60%;
  height: 600px;
  margin-right: 20%;
  margin-left: 20%;
  margin-top: -300px;
  background-color: inherit;
}
.form_header {
  padding-top: 5px;
  padding-right: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 25px;
  padding-left: 10%;
  padding-right: 10%;
  margin-top: 20px;
}

.container__dropbtn {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0;
  margin: 0;
}
form p {
  margin: 0px;
  margin-top: 10px;
  padding: 0;
}
.form_item__title_text {
  font-weight: bold;
}
.form_item__container {
  background-color: inherit;
  border-radius: 2px;
  border: 1px solid var(--border-color);
  font-size: 0.7rem;
  color: var(--text-color-primary);
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: bold;
}
.form_item {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.form_item_button {
  width: 85%;
  text-align: center;
  border-radius: 2px;
  background-color: var(--back-color-other);
  color: white;
  font-size: 0.7rem;
  padding: 8px;
  font-weight: lighter;
}
.form_item_button:hover {
  background-color: #3b0072a2;
}

input:focus {
  outline: 0;
}
.dropdown-content__text {
  padding: 10px;
}

.dropdown-content__text:hover {
  color: var(--text-color-primary);
  background-color: #3b0072a2;
}
.container__dropbtn:hover,
.dropbtn:focus {
}
.unselectable {
  -webkit-touch-callout: none; 
  -webkit-user-select: none; 
  -khtml-user-select: none; 
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none; 
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown_content_dark_mode {
  display: none;
  position: absolute;
  background-color: black;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}
.dropdown_content_light_mode {
  display: none;
  position: absolute;
  background-color: white;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: inherit;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f9ff;
}
form p {
  margin: 0;
  padding: 0;
}

</style>