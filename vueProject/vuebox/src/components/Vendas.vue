<template>
  <div>
<!-- inicio tabela pendentes -->
<!-- Tabela do Histórico  -->
    <v-card color="">
    <v-card-title class="grey lighten-3">
      Consultar Vendas Pendentes
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="transacoesPendentes"
      :search="search"
      :loading="false"
    >
      <template v-slot:items="props">
        <td @click="clickTable(props.item)"> 
          <v-layout justify-center>
              {{ props.item._id2 }}
          </v-layout>
        </td>
        <td class="text-xs-right">
          <v-layout justify-center>
          
          {{ props.item.to2 }}
         </v-layout>
        </td>
        <td class="text-xs-right">
           <v-layout justify-center>
              {{ props.item.nomeJogador }}
          </v-layout>
        <td class="text-xs-right">
           <v-layout justify-center>
              {{ props.item.valorT }}
          </v-layout>

        </td>
        <td class="text-xs-right"> 
           <v-layout justify-center>
              {{ props.item.estado }}
          </v-layout>

        </td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
  </v-card>
  <v-spacer></v-spacer>
<v-divider></v-divider>
<v-divider></v-divider>
<!-- fim tabela pendentes -->
<!-- Tabela do Histórico  -->
    <v-card color="">
    <v-card-title class="grey lighten-3">
      Consultar Transações Completas
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search2"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="transacoes"
      :search="search2"
      :loading="false"
    >
      <template v-slot:items="props">
        <td @click="clickTable(props.item)">
          <v-layout justify-center>
              {{ props.item._id2 }}
          </v-layout>
        </td>
        <td class="text-xs-right">
          <v-layout justify-center>
          
          {{ props.item.to2 }}
         </v-layout>
        </td>
        <td class="text-xs-right">
           <v-layout justify-center>
              {{ props.item.nomeJogador }}
          </v-layout>
        <td class="text-xs-right">
           <v-layout justify-center>
              {{ props.item.valorT }}
          </v-layout>

        </td>
        <td class="text-xs-right" >
          <v-layout justify-center>
             <b> {{ props.item.estado}}</b>
          </v-layout>
        </td>
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search2 }}" found no results.
        </v-alert>
      </template>
    </v-data-table>
  </v-card>
  <!-- fim da tabela do histório -->
    <!-- Inicio do PopUp -->
      <v-dialog
      v-model="dialog"
      width="600"
      >
      <PopUp v-if="dialog" :transacao="varPassar" v-on:childToParent="onChildClick" ></PopUp>
      </v-dialog>
  <!-- Fim do popup -->
 </div>
</template>

<script>
import PopUp from './PopUp.vue'
import Transferencias from '../js/transferencias.js'
import axios from 'axios';
export default {
    name: 'ConsultTrans',
    components:{
      PopUp
    },
      data () {
            return {
              dialog:false,
              varPassar: '',
              account: window.web3.eth.accounts[0],
              op:['Completa','Emitida','Em pagamento','Aceite'],
              bloco:'',
              search:'',
              search2:'',
              headers: [
              {text: 'Id da Venda ',value: '_id', align: 'center'},
              {text: 'Comprador', value: 'to' },
              {text: 'Jogador', value: 'nomeJogador' },
              {text: 'Valor', value: 'valorT' },
              {text: 'Estado', value: 'estado' }],
              transacoes: [ ],
              transacoesPendentes:[]
            
    }
  },async created(){
      var lista=[]
      var transacoes = await this.getTransacoes()
      //Preencher a primeira
      console.dir(transacoes)
      transacoes.forEach(this.cutS);
      this.transacoesPendentes = transacoes
      this.transacoesC = transacoes

      // ## Preencher a segunda tabela
       this.transacoes = this.transacoesC.filter(elem => elem.estado=='Completa');
       this.transacoesPendentes = this.transacoesPendentes.filter(elem => elem.estado!='Completa')

      
},methods:{
  open(id){
    if (id == '0x0eab421867077be5e8f28d9a442389aebfcf8a001677daffe6fc56a0be6bc8bc')
        this.op=['fun']

  },
   save(estado){
     console.log('estado')
     console.dir(estado)
   },async getTransacoes(){

      var lista  = await axios.get('http://localhost:4000/transacoes?utilizador=' + this.account + '&&tipo=venda' )
      return lista.data


   }
   ,getBlockNumber(){
        return new Promise (function (resolve, reject) {
             window.web3.eth.getBlockNumber(function (error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
             }
              })
          })
    },
    getBlock(num){
        return new Promise (function (resolve, reject) {
             window.web3.eth.getBlock(num,function (error, result) {
            if (error) {
                reject(error);
            } else {
                resolve(result);
             }
              })
    })
    }, fillTable(elem){
        var obj = {}
        obj['name'] = elem.hash
        obj['number'] = elem.number
        obj['gas'] = elem.gasUsed
        obj['estado'] = 'Completa'
        this.transacoes.push(obj)

  }, fillTable2(elem){
        var obj = {}
        obj['id'] = elem._id
        obj['number'] = elem.number
        obj['gas'] = elem.gasUsed
        obj['estado'] = 'Completa'
        this.transacoes.push(obj)
},cutS(elem){
        elem['_id2'] = /*'0x' +*/ elem._id.substr(0, 20) + '...'
        elem['_id'] = /*'0x' +*/ elem._id //.substr(0, 20) + '...'
        elem['to'] =  elem.to
        elem['to2'] =  elem.to.substr(0, 20) + '...'
        elem['from2'] =  elem.from.substr(0, 20) + '...'
        return elem

}, onChildClick(elem){
    this.dialog = elem

},clickTable(elem){
     this.dialog = true
     console.dir(elem)
     this.varPassar = elem

  }

}
}
</script>

<style>
    
</style>