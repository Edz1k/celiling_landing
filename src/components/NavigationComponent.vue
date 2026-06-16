<script setup lang="ts">
const navItems = [
  {
    name: 'Home',
    to: '/',
  },
  {
    name: 'About',
    to: '/about',
  },
  {
    name: 'Contact',
    to: '/contact',
  },
]
</script>

<template>
  <nav

    flex items-center justify-between bg-gray-100 px-4 py-2 dark:bg-gray-800
  >
    <div text-lg font-bold>
      MyApp
    </div>
    <ul flex space-x-4>
      <li v-for="item in navItems" :key="item.to">
        <RouterLink
          :to="item.to"
          text-gray-700 dark:text-gray-200
          hover:text-blue-500 dark:hover:text-blue-400
        >
          {{ item.name }}
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>
