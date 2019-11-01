<template>
  <div class="bg-green-900 text-white py-6">
    <div class="container flex justify-between">
      <a href class="text-xl font-semibold">{{ title }}</a>
      <nav>
        <a href="about.php" class="text-lg font-semibold">About</a>
      </nav>
    </div>
  </div>
</template>
<script>
export default {
  name: "AppHeader",
  props: {
    title: { type: String, default: "" }
  }
};
</script>
<style lang="scss" scoped>
// .header {
//   padding: 10px 0;
//   background-color: rgb(144, 25, 212);
//   color: white;
// }
</style>

