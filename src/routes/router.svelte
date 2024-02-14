<script lang="ts">
  // EXPERIMENTED, DON'T USE THIS
  import { Router, Route } from "svelte-routing";
  import Header from "../components/Header.svelte";
  import ProtectedRoute from "../pages/Protected.svelte";

  const Home = () => import("../pages/Home.svelte");
  const Login = () => import("../pages/Login.svelte");
  const Profile = () => import("../pages/Profile.svelte");

  export let url = "";
</script>

<Router {url}>
  <Header />
  <div>
    <Route path="/">
      <ProtectedRoute lazyComponent={Home} />
    </Route>
    <Route path="/login" component={Login} />
    <Route path="/profile">
      <ProtectedRoute lazyComponent={Profile} />
    </Route>
  </div>
</Router>
