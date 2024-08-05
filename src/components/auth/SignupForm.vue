<script setup lang="ts"></script>

<template>
  <form class="signup-form">
    <h1 class="title">Crea tu cuenta</h1>
    <h2 class="subtitle">
      Únete a nuestra comunidad y comienza a compartir los momentos especiales
      de tu bebé en un entorno seguro y privado.
    </h2>
    <div class="inputs">
      <label>
        Nombre
        <input type="text" placeholder="Nombre" required />
      </label>
      <label>
        Email
        <input type="text" required />
      </label>
    </div>
  </form>
</template>

<style scoped lang="scss">
.signup-form {
  text-align: center;

  .title {
    font-family: var(--font-family-title);
    font-size: var(--font-size-xl);
    font-weight: 600;
  }

  .subtitle {
    font-family: var(--font-family-title);
    font-size: var(--font-size-md);
  }
}
</style>
