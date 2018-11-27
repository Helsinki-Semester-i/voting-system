<template>
  <div class="container">
    <div class="center-align">
      <h2>Gracias por participar.</h2>
      <img alt="Green Check" src="../assets/green_check.png">
      <h3>Guarda este código, desaparecerá al continuar</h3>
      <h4>Es necesario para verificar tu voto al finalizar la votación</h4>
      <h1 class="blue-text text-darken-2">{{code}}</h1>
      <br>
      <router-link to="/" class="waves-effect waves-light btn-large">
        Continuar
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      code: 'TSLVHL',
    };
  },
};
</script>
