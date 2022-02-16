<template>
  <div id="app">
    <div id="nav">
      <router-link to="/lead">Pipeline Lead</router-link> |
      <router-link to="/cotacao">Pipeline Cotação</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
:root {
  --primary: #126CA1;
  --primary-dark: #2F3D57;
  --success: #4AE67B;
  --success-dark: #128C7E;
  --light-text: #666666;
  --lighter-text: #999999;
  --light-grey: #EFEFEF;
  --lighter-grey: #F2F2F2;
  --icon-color: #384865;
}

body, h1, h2, h3, h4, h5, h6, p {
  margin: 0;
}

a {
  cursor: pointer;
}

button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: fit-content;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4rem;
  background-color: transparent;
  font-size: 1rem;
  cursor: pointer;
}

button:disabled {
  cursor: auto;
}

button svg {
  width: 1rem;
  height: 1rem;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.btn-primary {
  background-color: var(--primary);
  border: 1px solid var(--primary);
  color: white;
}
</style>
