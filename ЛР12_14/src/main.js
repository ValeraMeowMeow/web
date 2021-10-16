import Vue from 'vue'
import App from './App.vue'
//import Vuex from 'vuex'

//  Vue.use(Vuex)
//  Vue.config.productionTip = false

// const store = new Vuex.Store({
//   state: {
//     col: "none_col",
//     id: "none_id",
//     c1:0,
//     c2:0,
//     c3:0
//     //ids: []
//   },
//   getters: {
//     COL: state => {
//       return state.col;
//     },
//     ID: state => {
//       return state.id;
//     },
//     C1: state => {
//       return state.c1;
//     },
//     C2: state => {
//       return state.c2;
//     },
//     C3: state => {
//       return state.c3;
//     } 
//   },
//   mutations: {
//     SET_COL: (state, newVal) => {
//       state.col = newVal;
//     },
//     SET_ID: (state, newVal) => {
//       state.id = newVal;
//     },
//     increment1: (state) => {
//       state.c1++;
//     },
//     increment2: (state) => {
//       state.c2++;
//     },
//     increment3: (state) => {
//       state.c3++;
//     },
//     dincrement1: (state) => {
//       state.c1--;
//     },
//     dincrement2: (state) => {
//       state.c2--;
//     },
//     dincrement3: (state) => {
//       state.c3--;
//     }
//     // DELETE_ID(state,id){
//     //   var index = state.ids.findIndex(c => c == id);
//     //   state.ids.splice(index, 1);
//     // },
//     // ADD_ID(state,id){
//     //   state.ids.push(id);
//     // }
//   },
//   actions: {
//     SET_COL: (context, newVal) => {
//       context.commit('SET_COL', newVal);
//     },
//     SET_ID: (context, newVal) => {
//       context.commit('SET_ID', newVal);
//     }
//   }
// })

export const eventHandler = new Vue();

new Vue({
  render: h => h(App),
}).$mount('#app')
