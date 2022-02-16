<template>
  <div class="dropdown">
    <button 
      type="button"
      @click="habilitarOpcoes"
    >
      <slot></slot>
    </button>

    <ul class="dropdown-opcoes" v-show="visibilidade">
      <li 
        v-for="opcao in opcoes" 
        :key="opcao.id" 
        @click="executar(opcao.id)"
      >
        <icon v-if="opcao.icon" class="icone" :nome="opcao.icon" />
        {{ opcao.nome }}
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';
export default {
  components: {
    Icon,
  },
  props: {
    opcoes: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      visibilidade: false
    }
  },
  methods: {
    habilitarOpcoes() {
      this.visibilidade = !this.visibilidade
    },

    executar(opcao) {
      this.$emit('executar', opcao)
    }
  },
}
</script>

<style scoped>
.dropdown {
  position: relative;
}

.dropdown > button {
  padding: 0;
}

.dropdown-opcoes {
  display: grid;
  position: absolute;
  left: 0.5rem;
  top: 1rem;
  padding: 0.5rem;
  border-radius: 1rem;
  border-top-left-radius: 0;
  background-color: var(--lighter-grey);
  box-shadow: 0 2px 6px 0 #CCCCCC;
  list-style: none;
  z-index: 9;
}

.dropdown-opcoes::before {
  content: '';
  position: absolute;
  top: 1px;
  border-top: 0.5rem solid var(--lighter-grey);
  border-right: 1rem solid transparent;
  border-left: 1rem solid var(--lighter-grey);
  border-bottom: 0.5rem solid transparent;
  transform: scale(1, -1) translateY(1rem);
}

.dropdown-opcoes > li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: max-content;
  min-width: calc(100% - 1rem);
  padding: 0.5rem;
  line-height: 1;
  color: var(--light-text);
  cursor: pointer;
}

.dropdown-opcoes > li:first-of-type {
  border-bottom: 1px solid #E2E2E2;
}

.dropdown-opcoes > li:hover {
  background-color: #E2E2E2;
}

.dropdown-opcoes > li:first-of-type:hover {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

.dropdown-opcoes > li:last-of-type:hover {
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.dropdown-opcoes > li > .icone {
  color: var(--lighter-text);
}
</style>