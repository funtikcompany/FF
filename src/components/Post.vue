<template>
  <div class="post-box">
    <div class="post-wraaper">
      <h2 class="post-title">
        {{ post.title }}
      </h2>
      <p class="post-info">
        {{ post.body }}
      </p>
      <p class="post-info">
        Comments {{ comment }}
      </p>
      <Bar :data="chartData" />
    </div>
  </div>
</template>

<style lang="scss">
.post-box {
  cursor: pointer;
  width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 40px;
  box-shadow: 0px 4px 10px rgba($color: #000000, $alpha: .4);
  margin: 15px;
}

.post-title {
  &::first-letter {
    text-transform: uppercase;
  }

  font-weight: 700;
}

.post-info {
  text-align: left;

  &::first-letter {
    text-transform: uppercase;
  }
}
</style>
<script>
import { Bar } from 'vue-chartjs'
import Chart from 'chart.js/auto';
export default {
  name: 'postitem',
  components: {
    Bar,
    Chart
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    comment: {
      type: Object,
      required: false
    },
    chartData: {
      type: Object,
      required: true
    }
  },
}
</script>