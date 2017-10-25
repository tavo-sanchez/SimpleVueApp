// Passing dynamic data to components
// Define the props(variables to use in here) and the variable that is going to be referenced in the category.vue
// In the category.vue use the variable(s) defined in props as attribute in the component tag ':post=""' and
// in this case pass the value in the iteration
<template>
  <div class="card">
    <div class="card-content">
      <!--slot to pass html/content to the child component. The content to pass should be inside the tag component-->
      <slot name="title"></slot>
      <slot name="content"></slot>
    </div>
    <footer class="card-footer">
      <a class="card-footer-item" :href="link" target="_blank">Read More</a>
    </footer>
  </div>
</template>
<script>
  export default{
    props: ['link']
  }
</script>
<style scoped>
  .card{
    padding-bottom: 40px;
    height: 100%;
  }
  footer{
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
  }
</style>
