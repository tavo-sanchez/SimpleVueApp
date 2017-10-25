<!--This is a single-file component, no separation of concerns are applied here, instead everything is in a single
    file: template, logic (JS, TS) and styles(css or any pre processor lang). "Makes the component more cohesive and
    maintainable".

    Each .vue file consists of three blocks: <template>, <script>, and <style>, and optionally additional custom blocks
-->

<template>
  <div>
    <app-header></app-header>
    <section class="main-section section">
      <div class="container content">
        <router-view></router-view>
      </div>
    </section>
    <app-footer></app-footer>
  </div>
</template>
<script>
  import AppHeader from './AppHeader.vue'
  import AppFooter from './AppFooter.vue'
  export default {
    // create a component which can be use as a tag in the html :s
    components: {
      'app-header': AppHeader,
      'app-footer': AppFooter
    }

  }
</script>
<style lang="scss">
  $primary: #287ab1;
  @import "~bulma";

  .columns {
    flex-wrap: wrap;
  }
</style>
