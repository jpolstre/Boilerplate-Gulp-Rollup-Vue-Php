<template>
  <div class="bg-white text-black my-6">
    <div class="container">
      <h1 class="text-4xl font-bold">Some Content</h1>
      <p
        v-for="(i, index) in 10"
        :key="index"
        class="text-lg antialiased"
        :class="index%3 ===0?'mt-3':''"
      >Lorem ipsum dolor sit amet consectetur, ffadipisicing elit. Recusandae, molestias? Asperiores ducimus qui velit laborum libero perspiciatis earum sequi dignissimos, delectus sint nulla iusto consectetur? Consequatur doloremque molestiae vel error.</p>
    </div>
  </div>
</template>



<script>
export default {
  name: "AppBody"
};
</script>

<style lang="scss" scoped>
// .view {
//   color: rgb(223, 11, 159);
// }
</style>
