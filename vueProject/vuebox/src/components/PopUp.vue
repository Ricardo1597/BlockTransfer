<template>
  <div>
    <v-card>
      <div v-if="transacao">
        <v-card-title class="headline grey lighten-2" primary-title>
          Detalhes Transaçao! &nbsp;
          <v-icon color="green" x-large>check</v-icon>
        </v-card-title>

        <v-card-text >
          <h4>Informações transação</h4>
          <div class="borda mt-1 mb-3">
            <div class="ma-2">
              <b>Id de Venda:</b>
              {{this.transacao._id}}
              <br>
              <b>Vendedor:</b>
              {{this.transacao.from}}
              <br>
              <b>Comprador:</b>
              {{this.transacao.to}}
              <br>
              <b>Nome do Jogador:</b>
              {{this.transacao.nomeJogador}}
              <br>
              <b>Número da fatura:</b>
              {{this.transacao.numFatura}}
              <br>
              <b>Valor Total / Valor Iva:</b>
              {{this.transacao.valorT}} &euro; / {{this.transacao.valorI}} &euro; 
            </div>
          </div>
          <span v-if="this.transacao.data">
          <h4> Datas </h4>
          <div class="borda mt-1 mb-3">
            <div class="ma-2">
              <span v-if="this.transacao.data.Emitida">
              <b>Data de Emissão:</b>
              {{this.transacao.data.Emitida}}
              <br>
              </span>
              <span v-if="this.transacao.data.Aceite">
              <b>Data Aceitação:</b>
              {{this.transacao.data.Aceite}}
              <br>
              </span>
              <span v-if="this.transacao.data.EmPagamento">
              <b>Data Em Pagamento:</b>
              {{this.transacao.data.EmPagamento}}
              <br>
              </span>
              <span v-if="this.transacao.data.Pago">
              <b>Data Pago:</b>
              {{this.transacao.data.Pago}}
              <br>
              </span>
              <span v-if="this.transacao.data.Completo">
              <b>Data Completo:</b>
              {{this.transacao.data.Completo}}
              </span>
            </div>
          </div>
          </span>
          <h4> Informações blockchain</h4>
          <div class="borda mt-1 mb-3">
            <div class="ma-2">
              <b>Hash Transação:</b>
              {{this.transacao.hashTrans}}
              <br>
              <b>Gas utilizado:</b>
              {{this.transacao.gas}}
              <br>

              <b>Número do bloco:</b>
              {{this.transacao.numBloco}}
              <br>
            </div>
          </div>
          <b>Estado:</b>
          {{this.transacao.estado}}
        </v-card-text>
      </div>

      <div v-if="jogador">
        <v-card-title class="headline grey lighten-2" primary-title>
          Detalhes do Jogador &nbsp;
          <v-icon color="green" x-large>check</v-icon>
        </v-card-title>

        <v-card-text>
          <v-layout>
            <v-flex row wrap xs12 sm7 md8 lg9>
              <b>Nome:</b>
              {{ this.jogador.nome }}
              <br>
              <b>Idade:</b>
              {{ this.idade }}
              <br>
              <b>Nacionalidade:</b>
              {{ this.jogador.pais }}
              <br>
              <b>Posições:</b>
              <div v-for="pos in jogador.posicoes" :key="pos">&nbsp;&nbsp; {{ pos }}</div>
            </v-flex>
            <v-flex xs12 sm5 md4 lg43>
              <v-img class="img" :src="jogador.foto" height="100px" width="100px" contain></v-img>
            </v-flex>
          </v-layout>
        </v-card-text>
      </div>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click="enviarParent">I accept</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>


<script>
export default {
  name: "PopUp",
  props: {
    transacao: {
      type: Object,
      required: false
      // default: 'Lucas'
    },
    jogador: {
      type: Object,
      required: false
    }
  },created() {
    console.log('Dentro do POPUP')
    console.dir(this.transacao)
  },
  methods: {
    enviarParent(event) {
      this.$emit("childToParent", false);
    }
  },
  computed: {
    idade(){
      var today = new Date();
      var birthDate = new Date(this.jogador.nascimento);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
      }
      if(isNaN(age)) 
        return "Não disponível"
      else 
        return age + " anos"
    }
  }
};
</script>
<style>
.img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.borda{
  border-style: solid;
  border-radius: 5px;

}
</style>