<template>
  <div class="grid-item-wrapper">
    <div class="grid-item">
      <img class="block" :src="$withBase(src)" alt />
    </div>
    <span class="label">{{ label }}</span>
  </div>
</template>

<style>
.grid-item-wrapper {
  width: 100%;
}
.grid-item {
  background: #fff;
  /* box-shadow: 0 0 48px rgba(74, 124, 246, 0.1); */
  border-radius: 6px;
  text-align: center;
  overflow: hidden;
  line-height: 0;
  display: block;
}
.grid-item-wrapper .label {
  display: block;
  color: #637599;
  width: 100%;
  text-align: center;
  margin-top: 0.5rem;
}
</style>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true
    },
    src: {
      type: String,
      default: "https://via.placeholder.com/400x200/eee"
    }
  }
};
</script>