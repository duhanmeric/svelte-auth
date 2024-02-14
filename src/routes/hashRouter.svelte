<script lang="ts">
  import { onDestroy } from "svelte";
  import Router, {
    replace,
    type ConditionsFailedEvent,
    type RouteLoadedEvent,
  } from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";
  import { authStore } from "../store/auth";
  import Header from "../components/Header.svelte";

  onDestroy(() => {
    authStore.destroy();
  });

  const routes = {
    "/": wrap({
      asyncComponent: () => import("../pages/Home.svelte"),
      conditions: [() => $authStore.user.isAuthenticated],
    }),

    "/login": wrap({
      asyncComponent: () => import("../pages/Login.svelte"),
    }),

    "/profile": wrap({
      asyncComponent: () => import("../pages/Profile.svelte"),
      conditions: [() => $authStore.user.isAuthenticated],
    }),
  };

  function conditionsFailed(e: ConditionsFailedEvent) {
    replace("/login");
  }

  function routeLoaded(e: RouteLoadedEvent) {
    console.log("routeLoaded event", e.detail);
  }
</script>

<div>
  <Header />
  <Router
    {routes}
    on:conditionsFailed={conditionsFailed}
    on:routeLoaded={routeLoaded}
  />
</div>
