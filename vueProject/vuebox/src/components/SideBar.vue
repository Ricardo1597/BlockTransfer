<template>
    <div>
       <v-navigation-drawer
          class="primary"
         dark
          permanent
        >
    <v-list>
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click=""
        :to="item.route"
        active-class="blue lighten-1"
      >
        <v-list-tile-action >
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
 
    </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      msg: 'Bem vindo!',
      id:this.$store.getters.wallet,
      items: []
    }
  },
  mounted() {
    this.items.push({ title: 'Dashboard', icon: 'dashboard' ,route:'/dashboard'})
    this.items.push({ title: 'Perfil', icon: 'account_box' ,route:'/perfil'})
    
    if(this.typeA == 1){
      this.items.push({ title: 'Efetuar Venda', icon: 'transfer_within_a_station',route:'/addTransfer' })
      this.items.push({ title: 'Consultar Vendas', icon: 'list', route:'/vendas'})
      this.items.push({ title: 'Consultar Compras', icon: 'touch_app', route:'/compras' })
      this.items.push({ title: 'Minha Equipa', icon: 'location_city', route:'/minhaEquipa/'+this.id })
      this.items.push({ title: 'Equipas', icon: 'group', route:'/equipas' })
      // this.items.push({ title: 'Jogadores', icon: 'person' })
      // this.items.push({ title: 'Account', icon: 'account_box' })
      // this.items.push({ title: 'Admin', icon: 'gavel' })
    
    }
    if(this.typeA == 2){
      this.items.push({ title: 'Transações', icon: 'list', route:'/banco' })
    }
    if (this.typeA == 3) {

      this.items.push({ title: 'Consultar Transações', icon: 'transfer_within_a_station',route:'/cotas' })
      this.items.push({ title: 'Adicionar Banco', icon: 'attach_money', route:'/addbanco'})   
      this.items.push({ title: 'Adicionar Equipa', icon: 'group_add', route:'/addequipa'})   
      this.items.push({ title: 'Adicionar Jogador', icon: 'person_add', route:'/addjogador'})   
      this.items.push({ title: 'Equipas', icon: 'group', route:'/equipas' })  
    }

    this.items.push({ title: 'Pesquisa na Blockchain', icon: 'search' ,route:'/pesquisa'})

  },
  computed: {
		typeA() {
			return this.$store.getters.type
		}
	}

}
</script>

<style>
    .primary2{
      background-color:#327CCB;
    }
</style>