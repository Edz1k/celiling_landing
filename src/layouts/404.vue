<script setup lang="ts">
const router = useRouter()
</script>

<template>
  <main p="x4 y10" text="center teal-700 dark:gray-200">
    <div text-4xl>
      <div i-carbon-warning inline-block />
    </div>
    <RouterView />
    <div>
      <button

        bg="teal-500 hover:teal-600 active:teal-700"
        text="white"
        mt-5 rounded px-4 py-2
        @click="router.push('/')"
      >
        Go Home
      </button>
    </div>
  </main>
</template>
