<template>
  <header>
    <h1 class="titulo">Pipeline {{ nome }}</h1>
    <div class="apresentacao">
      <span>
        <button 
          type="button"
          v-for="apresentacao in apresentacoes" 
          :key="apresentacao.id"
          :class="{ ativo: apresentacao.ativo }"
          :disabled="apresentacao.ativo"
          @click="selecionarApresentacao(apresentacao.id)"
        >
          {{ apresentacao.nome }}
        </button>
      </span>
    </div>
    <div>
      <button type="button" class="btn-primary filtros">
        Filtros
        <svg width="32px" height="32px" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
          <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="currentcolor" stroke="none">
            <path d="M3221 4465 c-201 -44 -380 -199 -458 -397 l-26 -68 -1078 -2 c-1071 -3 -1078 -3 -1105 -24 -53 -39 -69 -71 -69 -134 0 -63 16 -95 69 -134 27 -21 34 -21 1105 -24 l1078 -2 18 -48 c96 -258 338 -432 605 -432 268 0 509 172 605 432 l17 47 278 3 c263 3 280 4 306 24 53 39 69 71 69 134 0 63 -16 95 -69 134 -26 20 -43 21 -305 24 l-278 3 -27 67 c-116 297 -426 464 -735 397z m270 -334 c69 -33 112 -74 150 -143 31 -58 34 -70 34 -148 0 -78 -3 -90 -34 -148 -38 -70 -70 -100 -145 -140 -43 -22 -64 -26 -136 -26 -78 -1 -90 2 -148 33 -69 37 -109 80 -144 151 -32 66 -31 196 2 265 42 86 123 152 215 176 49 13 158 2 206 -20z"/>
            <path d="M1621 3185 c-201 -44 -380 -199 -457 -397 l-27 -67 -278 -3 c-262 -3 -279 -4 -305 -24 -53 -39 -69 -71 -69 -134 0 -63 16 -95 69 -134 26 -20 43 -21 306 -24 l278 -3 17 -47 c96 -258 338 -432 605 -432 268 0 509 172 605 432 l18 48 1078 2 c1071 3 1078 3 1105 24 53 39 69 71 69 134 0 63 -16 95 -69 134 -27 21 -34 21 -1105 24 l-1078 2 -18 48 c-34 91 -89 177 -160 248 -150 150 -372 214 -584 169z m270 -334 c69 -33 112 -74 150 -143 31 -58 34 -70 34 -148 0 -78 -3 -90 -34 -148 -38 -70 -70 -100 -145 -140 -43 -22 -64 -26 -136 -26 -78 -1 -90 2 -148 33 -69 37 -109 80 -144 151 -32 66 -31 196 2 265 42 86 123 152 215 176 49 13 158 2 206 -20z"/>
            <path d="M3221 1905 c-201 -44 -380 -199 -458 -397 l-26 -68 -1078 -2 c-1071 -3 -1078 -3 -1105 -24 -53 -39 -69 -71 -69 -134 0 -63 16 -95 69 -134 27 -21 34 -21 1105 -24 l1078 -2 18 -48 c96 -258 338 -432 605 -432 268 0 509 172 605 432 l17 47 278 3 c263 3 280 4 306 24 53 39 69 71 69 134 0 63 -16 95 -69 134 -26 20 -43 21 -306 24 l-278 3 -17 47 c-34 91 -89 177 -160 248 -150 150 -372 214 -584 169z m270 -334 c69 -33 112 -74 150 -143 31 -58 34 -70 34 -148 0 -78 -3 -90 -34 -148 -38 -70 -70 -100 -145 -140 -43 -22 -64 -26 -136 -26 -78 -1 -90 2 -148 33 -69 37 -109 80 -144 151 -32 66 -31 196 2 265 42 86 123 152 215 176 49 13 158 2 206 -20z"/>
          </g>
        </svg>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    tipo: {
      type: String,
      default: ''
    },
    nome: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      apresentacoes: [
        {
          id: 'lista',
          nome: 'Lista',
          ativo: false,
        }, 
        {
          id: 'kanban',
          nome: 'Kanban',
          ativo: true
        }
      ]
    }
  },
  methods: {
    selecionarApresentacao(id) {
      this.apresentacoes.forEach(apresentacao => {
        apresentacao.ativo = false

        if (apresentacao.id === id) apresentacao.ativo = true
      })

      this.apresentacoes = [...this.apresentacoes]
    }
  },
}
</script>

<style scoped>
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

header > * {
  width: 100%;
}

.titulo {
  text-align: left;;
}

.apresentacao {
  display: grid;
  place-items: center;
}

.apresentacao > span {
  width: fit-content;
  padding: .3rem;
  background-color: var(--light-grey);
  border-radius: 4rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  place-items: center;
}

.apresentacao > span >  button {
  width: 100%;
}

.apresentacao .ativo {
  background-color: var(--primary);
  color: white;
  border-radius: 4rem;
}

.filtros {
  visibility: hidden;
}

.filtros svg {
  width: 1.5rem;
  height: 1.5rem;
}
</style>