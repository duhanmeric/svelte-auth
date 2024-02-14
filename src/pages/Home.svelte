<script lang="ts">
  import { authStore } from "../store/auth";
</script>

<main>
  {#if $authStore.user.isAuthenticated}
    Hello {$authStore.user.email}
  {:else}
    <p>Not logged in</p>
  {/if}
</main>
