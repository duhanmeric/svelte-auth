<script lang="ts">
  import { onMount } from "svelte";
  import { authStore } from "../store/auth";
  import { replace } from "svelte-spa-router";

  onMount(() => {
    if ($authStore.user.isAuthenticated) replace("/");
  });

  const handleSubmit = async (e: SubmitEvent) => {
    const data = new FormData(e.target as HTMLFormElement);
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    await authStore.login(email, password);
  };
</script>

<main>
  {#if $authStore.loading}
    <p>Loading...</p>
  {/if}

  {#if $authStore.error}
    <p>{$authStore.error}</p>
  {/if}
  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" placeholder="email" name="email" />
    <br />
    <input type="password" placeholder="password" name="password" />
    <br />
    <button type="submit">login</button>
  </form>
</main>
