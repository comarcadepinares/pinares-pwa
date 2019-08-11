<template>
  <div class="card">
    <div class="img">
      <img style="width: 100%; display: block;" :src="image" :alt="title">
    </div>
    <div class="card-body">
      <h6>{{title}}</h6>
      <p class="card-text">{{description}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name:'listRow',
  props: {
    image: String,
    title: String,
    description: String
  }
}
</script>
