
<template>

  <div>    
    <!-- teste -->
            <v-container>
              <v-flex xs12>
                 <v-card dark color="primary">
                     <v-card-text class="px-0">Utilizador:  <b> [{{tipo}}] {{this.nome}} [{{account}}] </b> </v-card-text>
                  </v-card>
              </v-flex>
                <TransferForm/>
             </v-container>


  </div>
</template>

<script>
import Transferencias from '@/js/transferencias'
import BlockTransfer from  '@/js/BlockTransfer'
import TransferForm from './TransferForm.vue'
/* eslint-disable indent */
export default {
  name: 'dashboard',
  components:{
      TransferForm
  },
  data () {
    return {
      msg: 'Bem vindo!',
      pseudo: undefined,
      account: window.web3.eth.accounts[0],
      saldo:0,
      owner:'',
      recibo:'',
      tipo:'',
      nome:''

    }
  },
  beforeCreate(){
  },
    created () {
    
    this.account = window.web3.eth.accounts[0]
    this.tipo = this.$store.getters.tipo
    this.nome = this.$store.getters.name


    web3.eth.getBalance(this.account, (error, result)=>{
        if(!error){
           this.saldo=result.c[0]/10000;
        }else{
            console.error(error)
        }
    })

    },
  methods: {
    async teste(){
      var res = "ola"

      var res2 = await Transferencias.testParams(res)
      console.log(res2)
      alert('result motherfuckers: ' + res2)
      return true
    },
    
    getOwner: async function (){
      let self = this
      var res = await Transferencias.owner()
      return res
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>




</style>
