<template>
  <div class="app-container">
    <slot />
  </div>
</template>

<style scoped>
.app-container {
  width: min(100% - 32px, 1220px);
  margin: 0 auto;
}

@media (max-width: 640px) {
  .app-container {
    width: min(100% - 24px, 1220px);
  }
}
</style>
