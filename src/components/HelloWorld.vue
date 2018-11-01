<template>
  <div class="container">
    <div class="row">
      <br>
      <br>
      <br>
      <br>
      <div class="col s9 center-align">
        <h1>Hello World</h1>
        <p>This is the homepage of your vue app</p>
      </div>
      <div class="col s3">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Aprénde cómo votar</span>
            <p>
              Te enseñaremos a utilizar la plataforma para que aprendas a navegar
               dentro de las distintas fases del proceso de votación.
            </p>
          </div>
          <div class="card-action">
            <router-link
            to="/polls">
            Abrir Demo
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
