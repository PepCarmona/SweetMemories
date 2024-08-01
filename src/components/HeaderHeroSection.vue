<template>
  <section class="header-hero-section">
    <nav>
      Navbar
      <a href="">Link 1</a>
      <a href="">Link 2</a>
    </nav>
    <div class="content">
      <h1 class="title">Comparte los momentos especiales de tu bebé</h1>
      <h2 class="subtitle">
        Un lugar seguro y privado para reunir y compartir los recuerdos más
        preciados con tu familia y amigos cercanos.
      </h2>
      <button>Únete Ahora</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
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
    padding: var(--space-md);

    .title {
      font-family: var(--font-family-title);
      max-width: var(--breakpoint-l);
      font-size: var(--font-size-xxxl);
      line-height: var(--line-height-title);
      color: var(--color-text-light);
      margin-bottom: var(--space-md);
    }

    .subtitle {
      font-family: var(--font-family-title);
      max-width: var(--breakpoint-m);
      font-size: var(--font-size-lg);
      color: var(--color-text-light);
      margin-bottom: var(--space-xl);
    }
  }
}
</style>
