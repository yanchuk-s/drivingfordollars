<template>
  <div id="app">
      <Header :title="$route.name"/>
    <div class="container">
      <div class="dashbord-main">
          <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'App',
  components:{
    Header
  }
}
</script>

<style>
.dashbord-main{
  margin-top: 70px;
}
</style>
