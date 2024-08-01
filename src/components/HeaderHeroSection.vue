<template>
  <section class="header-hero-section">
    <nav>
      Navbar
      <a href="">Link 1</a>
      <a href="">Link 2</a>
    </nav>
    <div class="content">
      <h1>Guarda y comparte cada momento especial de tu bebé</h1>
      <h2>
        Un lugar seguro y privado para reunir y compartir los recuerdos más
        preciados con tu familia y amigos cercanos.
      </h2>
      <button>Únete Ahora</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
@mixin title {
  font-family: var(--font-family-title);
  color: var(--color-light);
}

.header-hero-section {
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    135deg,
    var(--color-primary-lighter) 0%,
    var(--color-primary-light) 5%,
    var(--color-primary) 70%,
    var(--color-primary-dark) 90%
  );

  .content {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    h1 {
      @include title;
      max-width: 1024px;
      font-size: 48px;
      font-weight: 600;
      line-height: 60px;
    }

    h2 {
      @include title;
      max-width: 800px;
      font-size: 24px;
    }
  }
}
</style>
