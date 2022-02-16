<template>
  <article 
    class="card" 
    :class="{ draggable: $attrs.draggable, dragging }"
    @dragstart="dragStart($event, id)"
  >
    <aside>
      <icon 
        class="icone" 
        :class="`icone-${tipo}`" 
        :nome="icone" 
        :width="24" 
        :height="24"
      />

      <div class="card-opcoes">
        <dropdown :opcoes="opcoes" @executar="executarOpcao">
          <icon 
            class="icone-opcoes" 
            nome="plusCircle" 
            :width="32" 
            :height="32"
            cor="#666666"
          />
        </dropdown>
      </div>
    </aside>

    <section class="card-conteudo">
      <header>
        <h3 class="card-nome">
          {{ nome }}
        </h3>
        <div class="card-info">
          <div v-if="valor" class="card-info__valor">
            <icon 
              class="icone-valor"
              nome="money"
              :width="24"
              :height="24"
            />
            {{ formatarValor(valor) }}
          </div>
          <div v-else class="card-info__contato">
            <a type="button" class="btn-whatsapp">
              <icon 
                nome="whatsapp" 
                :width="24" 
                :height="24" 
                class="icone-whatsapp"
              />
            </a>
            <a type="button" class="btn-ligacao">
              <icon 
                nome="phone" 
                :width="24" 
                :height="24" 
                class="icone-whatsapp"
              />
            </a>
          </div>
        </div>
      </header>
      <div class="card-body">
        {{ descricao }}
      </div>
      <footer>
        <div class="card-usuario">
          <img :src="require(`@/assets/images/${usuarioImagem}`)" alt="Foto do usuário responsável pelo card" width="24px" height="24px">
          <p class="card-usuario__nome">
            {{ usuarioNome }}
          </p>
        </div>
        <div class="card-datahora">
          <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 512 512" fill="currentColor">
            <path d="M232 120C232 106.7 242.7 96 256 96C269.3 96 280 106.7 280 120V243.2L365.3 300C376.3 307.4 379.3 322.3 371.1 333.3C364.6 344.3 349.7 347.3 338.7 339.1L242.7 275.1C236 271.5 232 264 232 255.1L232 120zM256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0zM48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48C141.1 48 48 141.1 48 256z"/>
          </svg>
          <p class="card-datahora__texto">
            {{ formatarDataHora(dataAtualizacao) }}
          </p>
        </div>
      </footer>
    </section>
  </article>
</template>

<script>
import Dropdown from '@/components/Dropdown.vue';
import Icon from '@/components/Icon.vue';

const TYPE_ICONS = {
  lead: 'whatsappSolid',
  cotacao: 'car',
}

export default {
  components: {
    Dropdown,
    Icon,
  },
  props: {
    coluna: {
      type: Number,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
    },
    nome: {
      type: String,
      default: '',
    },
    descricao: {
      type: String,
      default: '',
    },
    valor: {
      type: Number,
      default: 0
    },
    usuarioImagem: {
      type: String,
      default: '',
    },
    usuarioNome: {
      type: String,
      default: '',
    },
    dataAtualizacao: {
      type: Date,
      required: true,
    },
    opcoes: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      dragging: false,
      opcoesVisibilidade: false,
    }
  },
  computed: {
    opcoesFuncoes() {
      return {
        transferir_cliente: this.transferirCliente,
        finalizar: this.finalizarCard,
      } 
    },

    icone() {
      if (this.tipo in TYPE_ICONS)
        return TYPE_ICONS[this.tipo]

      return ''
    },
  },
  methods: {
    formatarValor(valor) {
      return parseFloat(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      })
    },
    
    formatarDataHora(dataHora) {
      const minutosParaHoras = 60
      const milisegundosParaMinutos = 60000
      const agora = new Date()
      const diferenca = Math.abs(agora - dataHora)
      
      const minutos = Math.round(diferenca / milisegundosParaMinutos)
      if (minutos < 60) return `Há ${minutos} minutos`

      const horas = Math.round(minutos / minutosParaHoras)
      if (horas < 24) return `Há ${horas} horas`

      return Intl.DateTimeFormat('pt-BR').format(dataHora)
    },

    executarOpcao(opcao) {
      const executar = this.opcoesFuncoes[opcao]
      executar()
    },

    transferirCliente() {
      console.log('transferir_cliente...')
    },

    finalizarCard() {
      console.log('finalizar...')
    },

    dragStart(event, cardId) {
      event.dataTransfer.dropEffetc = 'move'
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.setData('cardId', cardId)

      this.dragging = true
    },

    removerDragging() {
      this.dragging = false
    }
  },
}
</script>

<style scoped>
.card {
  display: flex;
  gap: 1rem;
  margin: 0 2rem;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: white;
  box-shadow: 0 4px 4px 0 #DDDDDD;
}

.card.draggable {
  cursor: pointer;
}

.card.dragging {
  outline: 0.25rem solid var(--primary);
}

.card aside {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.icone-lead {
  color: #128C7E;
}

.icone-cotacao {
  color: var(--primary);
}

.card-conteudo {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-left: 1rem;
  border-left: 2px solid #4AE67B;
}

.card-conteudo > header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.card-nome {
  text-align: start;
  color: var(--primary-dark);
}

.card-info > div {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-info__valor {
  color: var(--success-dark);
}

.card-info__contato > button {
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: 2rem;
  color: var(--icon-color);
}

.card-body {
  text-align: start;
  font-size: 1rem;
  color: var(--light-text);
}

.card footer {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.card-usuario {
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
  font-weight: 500;
  color: var(--light-text);
}

.card-usuario > img {
  min-width: 24px;
  min-height: 24px;
  border-radius: 50%;
}

.card-usuario__nome,
.card-datahora__texto {
  text-align: left;
}

.card-datahora {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--lighter-text);
}
</style>