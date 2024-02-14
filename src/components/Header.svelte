<script lang="ts">
  import { authStore } from "../store/auth";
  import { logoutApi } from "../api/auth";
  import { link } from "svelte-spa-router";

  let error: string | null = null;

  const handleLogout = async () => {
    try {
      const logout = await logoutApi();
      authStore.logout();
    } catch (err) {
      const _err = err as Error;
      error = _err.message;
    }
  };

  const routeConfig = [
    {
      name: "Home",
      path: "/",
      isProtected: true,
    },
    {
      name: "Login",
      path: "/login",
      isProtected: false,
    },
    {
      name: "Profile",
      path: "/profile",
      isProtected: true,
    },
  ];
</script>

<nav>
  {#each routeConfig as route}
    {#if $authStore.user.isAuthenticated}
      {#if route.isProtected}
        <a use:link href={route.path}>{route.name}</a>
      {/if}
    {:else if !route.isProtected}
      <a use:link href={route.path}>{route.name}</a>
    {/if}
  {/each}
  {#if $authStore.user.isAuthenticated}
    <button on:click={handleLogout}>Logout</button>
  {/if}
</nav>

<style>
  nav {
    display: flex;
    gap: 100px;
    margin-bottom: 50px;
  }
</style>
