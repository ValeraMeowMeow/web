<template>
  <div class="vList text">
        <div class="vList__title">
            {{title}}
        </div>
      <slot></slot>
  </div>
</template>

<script>
export default {
    name: 'vList',
    props: [
        'title'
    ],
    date() {
        return {
        }
    },
}
</script>

<style>
    .vList__title{
        font-weight: bold;
        font-size: 24px;
        text-align: center;
    }
</style>