<script lang="ts">
  // EXPERIMENTED, DON'T USE THIS

  import { onMount, type SvelteComponent } from "svelte";
  import { navigate } from "svelte-routing";
  import { authStore } from "../store/auth";
  import type { AsyncSvelteComponent } from "svelte-spa-router";

  // type AsyncSvelteComponent = () => Promise<{
  //   default: typeof SvelteComponent<any>;
  // }>;

  export let lazyComponent: AsyncSvelteComponent;
  let component: typeof SvelteComponent<any>;

  const loadComponent = async () => {
    component = await lazyComponent().then((c) => c.default);
  };

  onMount(() => {
    const unsubscribe = authStore.subscribe(($authStore) => {
      if (!$authStore.user.isAuthenticated) {
        // navigate("/login", { replace: true });
      } else {
        loadComponent();
      }
    });

    return () => {
      unsubscribe();
    };
  });
</script>

<svelte:component this={component} />
