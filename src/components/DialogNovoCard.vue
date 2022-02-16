<template>
  <div class="wrapper">
    <section class="dialog" :style="{ minWidth, minHeight }">
      <header>
        <h3 class="dialog-titulo">{{ titulo }}</h3>
        <button type="button" class="btn-fechar" @click="fecharDialog">
          <icon
            nome="xmark"
            :width="32"
            :height="32"
            class="dialog-fechar"
          />
        </button>
      </header>

      <div class="dialog-conteudo"></div>

      <footer>
        <button type="button" class="btn-primary">
          Ação
        </button>
      </footer>
    </section>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue';

export default {
  components: {
    Icon,
  },
  props: {
    titulo: {
      type: String,
      default: 'Novo Card'
    },
    minWidth: {
      type: String,
      default: '800px'
    },
    minHeight: {
      type: String,
      default: '300px'
    }
  },
  methods: {
    fecharDialog() {
      this.$emit('fechar')
    }
  },
}
</script>

<style scoped>
.wrapper {
  display: grid;
  place-items: center;
  position: absolute;
  inset: 0;
  background-color: #222a;
}

.dialog {
  background-color: white;
  border-radius: 0.5rem;
  padding: 0 1rem;
}

.dialog header,
.dialog footer {
  display: flex;
  align-items: center;
  height: 3rem;
  padding: 0.5rem 0;
}

.dialog header {
  justify-content: space-between;
  border-bottom: 1px solid #dddddd;
}

.dialog footer {
  justify-content: flex-end;
  border-top: 1px solid #dddddd;
}

.dialog-titulo {
  font-size: 1.5rem;
}

.btn-fechar {
  padding: 0;
}

.dialog-conteudo {
  height: 300px;
}
</style>