<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <button class="modal-close" type="button" aria-label="Закрыть окно" @click.stop="emit('close')">
    <span aria-hidden="true">×</span>
  </button>
</template>

<style scoped>
.modal-close {
  position: fixed;
  top: calc(12px + env(safe-area-inset-top));
  right: 12px;
  z-index: 9999;
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border: 1px solid rgba(201, 154, 75, 0.2);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 12px 32px rgba(31, 31, 31, 0.18);
  color: #1f1f1f;
  cursor: pointer;
  pointer-events: auto;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition:
    background 220ms ease,
    transform 220ms ease;
}

.modal-close span {
  font-size: 30px;
  line-height: 1;
  transform: translateY(-1px);
}

.modal-close:hover {
  background: #fff;
  transform: rotate(6deg);
}

.modal-close:focus-visible {
  outline: 3px solid rgba(201, 154, 75, 0.46);
  outline-offset: 3px;
}
</style>
