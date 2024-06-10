<template>

  <div class="header">
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/users">Users</RouterLink>
    </nav>
  </div>

  <div class="page-container">
    <RouterView />
  </div>
</template>

<script lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/Vue Base/HelloWorld.vue'

import axios from 'axios'
export default {
  components: {
    HelloWorld,
    RouterView,
    RouterLink
  },
  methods: {
    async test(event: Event) {
      event.preventDefault()

      let response = await axios.get('api/users')
      console.log(response)
    }
  }
}
</script>

<style lang="scss" scoped>

.header {
  display: block;
  width: 100%;

  img {
    margin: 0 auto;
    display: block;
  }

  nav {
    text-align: center;
    width: 100%;
    font-size: 2rem;
    margin-top: 2rem;

    a {
      display: inline-block;
      padding: 0 1rem;
      border-left: 1px solid var(--color-border);

      &:first-of-type {
        border: 0;
      }

      &.router-link-exact-active {
        color: var(--color-text);

        &:hover {
          background-color: transparent;
        }
      }
    }
  }
}
</style>
