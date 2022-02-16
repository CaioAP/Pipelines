<template>
  <div 
    class="coluna" 
    @drop="dragDrop($event)"
    @dragenter.prevent
    @dragover.prevent
  >
    <div class="coluna-header">
      <div class="coluna-titulo">
        <h2 class="coluna-titulo__nome">
          {{ nome }}
        </h2>
        <span class="coluna-titulo__quantidade">
          {{ quantidade }}
        </span>
      </div>
      <icon 
        nome="headerIndicator" 
        :width="20" 
        :height="48" 
        class="icone-header"
      />
    </div>
    <div class="coluna-body">
      <div v-if="temTotal" class="coluna-valor__total">
        {{ formatarValor(total) }}
      </div>
      <kanban-card 
        v-for="card in colunaCards"
        :key="card.id"
        :ref="card.id"
        v-bind="card"
        :opcoes="opcoes"
        :draggable="draggable"
      />
    </div>
  </div>
</template>

<script>
import KanbanCard from '@/components/KanbanCard.vue';
import Icon from '@/components/Icon.vue';

export default {
  components: {
    KanbanCard,
    Icon,
  },
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    nome: {
      type: String,
      default: '',
    },
    quantidade: {
      type: Number,
      default: 0,
    },
    temTotal: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    cards: {
      type: Array,
      default: () => []
    },
    opcoes: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    colunaCards() {
      const colunaCards = this.cards.filter(card => card.coluna === this.id)
      colunaCards.sort((anterior, proximo) => {
        if (anterior.dataAtualizacao < proximo.dataAtualizacao) return 1
        if (anterior.dataAtualizacao > proximo.dataAtualizacao) return -1
        return 0
      })

      return colunaCards
    },

    total() {
      return this.colunaCards.reduce((total, card) => total += card.valor, 0)
    }
  },
  methods: {
    formatarValor(valor) {
      return parseFloat(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    },

    dragDrop(event) {
      const card = event.dataTransfer.getData('cardId')
      this.$emit('carddrop', { card, coluna: this.id })

      if (this.$refs[card])
        this.$refs[card][0].removerDragging()
    }
  },
}
</script>

<style scoped>
.coluna {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 0.5rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}

.coluna-header {
  position: relative;
  height: 3rem;
  color: var(--primary);
}

.coluna-titulo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 2rem;
  border-top-left-radius: 1rem;
  background-color: var(--primary);
  color: white;
  font-size: 1rem;
  position: relative;
}

.coluna:last-of-type .coluna-titulo {
  border-top-right-radius: 1rem;
}

.coluna-titulo__quantidade {
  padding: .25rem 1rem;
  border-radius: 0.5rem;
  background-color: white;
  color: var(--light-text);
  font-size: 1.25rem;
}

.icone-header {
  display: none;
}

.coluna:not(:last-of-type) .icone-header {
  display: block;
  position: absolute;
  top: 0;
  right: -1rem;
}

.coluna-body {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem 0;
  background-color: var(--light-grey);
}

.coluna-valor__total {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  margin: 0 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #dddddd;
  font-size: 2rem;
  font-weight: 700;
  line-height: 1;
  color: var(--primary-dark);
}
</style>