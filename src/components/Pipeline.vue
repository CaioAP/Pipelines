<template>
  <main>
    <nav-bar :tipo="tipo" :nome="nome"></nav-bar>

    <section class="quadro">
      <div class="acoes">
        <button type="button" class="btn-primary" @click="abrirNovoCard">
          <icon 
            nome="plus" 
            :width="32" 
            :height="32" 
            class="icone-adicionar"
          />
          Novo Card
        </button>
      </div>

      <section class="colunas">
        <kanban-coluna 
          v-for="(coluna, idx) in colunas"
          :key="`coluna-${idx}`"
          v-bind="coluna"
          :cards="cards"
          :opcoes="opcoes"
          @carddrop="cardDrop"
        />
      </section>
    </section>

    <dialog-novo-card 
      v-show="novoCardVisibilidade"
      @fechar="fecharDialogNovoCard"
    />
  </main>
</template>

<script>
import Icon from '@/components/Icon.vue';
import NavBar from '@/components/NavBar.vue';
import KanbanColuna from '@/components/KanbanColuna.vue';
import DialogNovoCard from '@/components/DialogNovoCard.vue';

export default {
  components: {
    NavBar,
    KanbanColuna,
    Icon,
    DialogNovoCard,
  },
  props: {
    tipo: {
      type: String,
      required: true,
    },
    nome: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      colunas: [],
      cards: [],
      opcoes: [],
      novoCardVisibilidade: false,
    }
  },
  computed: {
    pipelines() {
      return {
        lead: this.carregarLead,
        cotacao: this.carregarCotacao,
      }
    }
  },
  mounted () {
    this.carregarColunas();
  },
  methods: {
    carregarColunas() {
      const carregarPipeline = this.pipelines[this.tipo]
      carregarPipeline()
    },

    carregarLead() {
      this.colunas = [
        {
          id: 1,
          nome: 'Novo Lead',
          quantidade: 3,
        }, 
        {
          id: 2,
          nome: 'Sem Contato',
          quantidade: 3,
        }, 
        {
          id: 3,
          nome: 'Finalizado',
          quantidade: 3,
        },
      ]

      this.cards = [
        {
          coluna: 1,
          id: '3C3EAW',
          tipo: 'lead',
          nome: 'João Carlos',
          descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae placeat libero magnam voluptatum provident totam aspernatur quae voluptatem sint.',
          usuarioImagem: 'profile.jpg',
          usuarioNome: 'Rafael Consultor',
          dataAtualizacao: new Date('2022-02-09T12:00'),
        }, {
          coluna: 1,
          id: 'GSHU9W ',
          tipo: 'lead',
          nome: 'Ana Maria',
          descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae placeat libero magnam voluptatum provident totam aspernatur quae voluptatem sint.',
          usuarioImagem: 'profile-woman.jpg',
          usuarioNome: 'Luciana Consultora',
          dataAtualizacao: new Date('2022-02-09T11:00'),
        }, {
          coluna: 1,
          id: 'FVE06M',
          tipo: 'lead',
          nome: 'Pedro Henrique',
          descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae placeat libero magnam voluptatum provident totam aspernatur quae voluptatem sint.',
          usuarioImagem: 'profile.jpg',
          usuarioNome: 'Rafael Consultor',
          dataAtualizacao: new Date('2022-02-07T10:00'),
        }, {
          coluna: 2,
          id: 'NR7H1S',
          tipo: 'lead',
          nome: 'João Carlos',
          descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae placeat libero magnam voluptatum provident totam aspernatur quae voluptatem sint.',
          usuarioImagem: 'profile-woman.jpg',
          usuarioNome: 'Luciana Consultora',
          dataAtualizacao: new Date('2022-02-09T12:00'),
        }, {
          coluna: 2,
          id: '13UMR0',
          tipo: 'lead',
          nome: 'Ana Maria',
          descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae placeat libero magnam voluptatum provident totam aspernatur quae voluptatem sint.',
          usuarioImagem: 'profile.jpg',
          usuarioNome: 'Rafael Consultor',
          dataAtualizacao: new Date('2022-02-09T11:00'),
        }, {
          coluna: 2,
          id: 'SZQV94',
          tipo: 'lead',
          nome: 'Pedro Henrique',
          descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae placeat libero magnam voluptatum provident totam aspernatur quae voluptatem sint.',
          usuarioImagem: 'profile-woman.jpg',
          usuarioNome: 'Luciana Consultora',
          dataAtualizacao: new Date('2022-02-07T10:00'),
        }, {
          coluna: 3,
          id: '3I8TMP',
          tipo: 'lead',
          nome: 'João Carlos',
          descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae placeat libero magnam voluptatum provident totam aspernatur quae voluptatem sint.',
          usuarioImagem: 'profile.jpg',
          usuarioNome: 'Rafael Consultor',
          dataAtualizacao: new Date('2022-02-09T12:00'),
        }, {
          coluna: 3,
          id: 'A7E7FS',
          tipo: 'lead',
          nome: 'Ana Maria',
          descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae placeat libero magnam voluptatum provident totam aspernatur quae voluptatem sint.',
          usuarioImagem: 'profile-woman.jpg',
          usuarioNome: 'Luciana Consultora',
          dataAtualizacao: new Date('2022-02-09T11:00'),
        }, {
          coluna: 3,
          id: 'U80X8C',
          tipo: 'lead',
          nome: 'Pedro Henrique',
          descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae placeat libero magnam voluptatum provident totam aspernatur quae voluptatem sint.',
          usuarioImagem: 'profile.jpg',
          usuarioNome: 'Rafael Consultor',
          dataAtualizacao: new Date('2022-02-07T10:00'),
        },
      ]

      this.opcoes = [
        { id: 'transferir_cliente', nome: 'Transferir Cliente' , icon: 'copy' },
        { id: 'finalizar', nome: 'Finalizar' , icon: 'checkCircle' },
      ]
    },

    carregarCotacao() {
      this.colunas = [
        {
          id: 1,
          nome: 'Negociação',
          quantidade: 3,
          temTotal: true,
          draggable: true,
        }, {
          id: 2,
          nome: 'Contrato',
          quantidade: 3,
          temTotal: true,
          draggable: true,
        }, {
          id: 3,
          nome: 'Instalação',
          quantidade: 3,
          temTotal: true,
          draggable: false,
        }
      ]

      this.cards = [
        {
          coluna: 1,
          id: '3C3EAW',
          tipo: 'cotacao',
          nome: 'João Carlos',
          descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae placeat libero magnam voluptatum provident totam aspernatur quae voluptatem sint.',
          valor: 100,
          usuarioImagem: 'profile.jpg',
          usuarioNome: 'Rafael Consultor',
          dataAtualizacao: new Date('2022-02-09T12:00'),
        }, {
          coluna: 1,
          id: 'GSHU9W',
          tipo: 'cotacao',
          nome: 'Ana Maria',
          descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae placeat libero magnam voluptatum provident totam aspernatur quae voluptatem sint.',
          valor: 50,
          usuarioImagem: 'profile-woman.jpg',
          usuarioNome: 'Luciana Consultora',
          dataAtualizacao: new Date('2022-02-09T11:00'),
        }, {
          coluna: 1,
          id: 'FVE06M',
          tipo: 'cotacao',
          nome: 'Pedro Henrique',
          descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae placeat libero magnam voluptatum provident totam aspernatur quae voluptatem sint.',
          valor: 80,
          usuarioImagem: 'profile.jpg',
          usuarioNome: 'Rafael Consultor',
          dataAtualizacao: new Date('2022-02-07T10:00'),
        }, {
          coluna: 2,
          id: 'NR7H1S',
          tipo: 'cotacao',
          nome: 'João Carlos',
          descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae placeat libero magnam voluptatum provident totam aspernatur quae voluptatem sint.',
          valor: 120,
          usuarioImagem: 'profile-woman.jpg',
          usuarioNome: 'Luciana Consultora',
          dataAtualizacao: new Date('2022-02-09T12:00'),
        }, {
          coluna: 2,
          id: '13UMR0',
          tipo: 'cotacao',
          nome: 'Ana Maria',
          descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae placeat libero magnam voluptatum provident totam aspernatur quae voluptatem sint.',
          valor: 80,
          usuarioImagem: 'profile.jpg',
          usuarioNome: 'Rafael Consultor',
          dataAtualizacao: new Date('2022-02-09T11:00'),
        }, {
          coluna: 2,
          id: 'SZQV94',
          tipo: 'cotacao',
          nome: 'Pedro Henrique',
          descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae placeat libero magnam voluptatum provident totam aspernatur quae voluptatem sint.',
          valor: 100,
          usuarioImagem: 'profile-woman.jpg',
          usuarioNome: 'Luciana Consultora',
          dataAtualizacao: new Date('2022-02-07T10:00'),
        }, {
          coluna: 3,
          id: '3I8TMP',
          tipo: 'cotacao',
          nome: 'João Carlos',
          descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae placeat libero magnam voluptatum provident totam aspernatur quae voluptatem sint.',
          valor: 65.50,
          usuarioImagem: 'profile.jpg',
          usuarioNome: 'Rafael Consultor',
          dataAtualizacao: new Date('2022-02-09T12:00'),
        }, {
          coluna: 3,
          id: 'A7E7FS',
          tipo: 'cotacao',
          nome: 'Ana Maria',
          descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae placeat libero magnam voluptatum provident totam aspernatur quae voluptatem sint.',
          valor: 74.30,
          usuarioImagem: 'profile-woman.jpg',
          usuarioNome: 'Luciana Consultora',
          dataAtualizacao: new Date('2022-02-09T11:00'),
        }, {
          coluna: 3,
          id: 'U80X8C',
          tipo: 'cotacao',
          nome: 'Pedro Henrique',
          descricao: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae placeat libero magnam voluptatum provident totam aspernatur quae voluptatem sint.',
          valor: 119.90,
          usuarioImagem: 'profile.jpg',
          usuarioNome: 'Rafael Consultor',
          dataAtualizacao: new Date('2022-02-07T10:00'),
        }
      ]

      this.opcoes = [
        { id: 'transferir_cliente', nome: 'Transferir Cliente' , icon: 'copy' },
        { id: 'mensagem', nome: 'Mensagem' , icon: 'whatsapp' },
        { id: 'ligar', nome: 'Ligar' , icon: 'phone' },
        { id: 'proposta', nome: 'Proposta' , icon: 'download' },
        { id: 'contrato', nome: 'Contrato' , icon: 'fileContract' },
        { id: 'finalizar', nome: 'Finalizar' , icon: 'checkCircle' },
      ]
    },

    abrirNovoCard() {
      this.novoCardVisibilidade = true
    },

    fecharDialogNovoCard() {
      this.novoCardVisibilidade = false
    },

    cardDrop(dropDados) {
      const card = this.cards.find(card => card.id === dropDados.card)
      card.coluna = dropDados.coluna
      card.dataAtualizacao = new Date()

      this.cards = [ ...this.cards ]
    }
  },
}
</script>

<style scoped>
main {
  padding: 1rem 3rem;
}

.quadro {
  margin-top: 4rem;
}

.acoes {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.colunas {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 2rem;
  margin-top: 1rem;
  min-height: 300px;
}
</style>