<script lang="ts">
  import { onMount } from "svelte";
  import { fetchUserProfile } from "../api/user";

  let userProfile: User | null = null;
  let error: string | null = null;

  onMount(async () => {
    try {
      const profileResponse = await fetchUserProfile();
      if ("user" in profileResponse) {
        userProfile = profileResponse.user;
      } else {
        throw new Error(profileResponse.message || "Unknown error occurred");
      }
    } catch (err) {
      const _err = err as Error;
      error = _err.message;
    }
  });
</script>

<main>
  {#if error}
    <p>Error: {error}</p>
  {:else if userProfile}
    <h1>Profile</h1>
    <p>Email: {userProfile.email}</p>
  {:else}
    <p>Loading...</p>
  {/if}
</main>
