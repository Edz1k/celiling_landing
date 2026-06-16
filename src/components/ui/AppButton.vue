<script setup lang="ts">
withDefaults(defineProps<{
  href?: string
  variant?: 'primary' | 'secondary'
}>(), {
  variant: 'primary',
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <a
    v-if="href"
    class="app-button"
    :class="`app-button--${variant}`"
    :href="href"
  >
    <slot />
  </a>

  <button
    v-else
    class="app-button"
    :class="`app-button--${variant}`"
    type="button"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  border: 1px solid transparent;
  border-radius: 999px;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  font-weight: 900;
  line-height: 1;
  padding: 0 24px;
  text-decoration: none;
  transition:
    background 220ms ease,
    border-color 220ms ease,
    box-shadow 220ms ease,
    color 220ms ease,
    transform 220ms ease;
}

.app-button:hover {
  transform: translateY(-1px);
}

.app-button--primary {
  background: linear-gradient(135deg, var(--landing-gold), var(--landing-gold-dark));
  box-shadow: 0 16px 34px rgba(201, 154, 75, 0.26);
  color: #fff;
}

.app-button--primary:hover {
  box-shadow: 0 20px 42px rgba(201, 154, 75, 0.34);
}

.app-button--secondary {
  border-color: rgba(201, 154, 75, 0.28);
  background: rgba(255, 255, 255, 0.76);
  color: var(--landing-text);
}

.app-button--secondary:hover {
  border-color: rgba(201, 154, 75, 0.48);
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 16px 34px rgba(31, 31, 31, 0.08);
}
</style>
