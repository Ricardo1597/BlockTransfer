import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({

    state: {
        isLogged: false,
        waller:''
      },
      mutations:{
          changeLogged(state,isLogged){
              state.isLogged = isLogged
          },
          changeWallet(state,wallet){
              state.wallet=wallet
          }
      }, getters:{
        wallet: state => state.wallet,
        isLogged: state => state.isLogged
 
 
      }
})