<template>
  <div class="home">
    <input v-model="searchPost" class="search" placeholder="Search" type="text">

    <h1 class="title">Posts</h1>
    <div class="wrapper" v-if="allComment && allPost">
      <PostItempage v-for="post in filteredPost" :key="post.id" :post="post" :comment="commentsLength(post.id)"
        :chartData="chartData(post.id)" />
    </div>
    <div class="paginet">
      <div class="page" v-for="page in itemPage" :key="page" @click="pageClick(page)"
        :class="{ page_selected: page === pageNumber }">
        {{ page }}
      </div>
    </div>

  </div>
</template>

<style lang="scss">
.title {
  text-align: center;
  margin: 20px 0;
  font-size: 40px;
}

.wrapper {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.paginet {
  display: flex;
  justify-content: center
}

.page {
  border: 3px solid #000;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  color: rgb(26, 26, 27);
  border-radius: 10px;

  &+& {
    margin-left: 20px;

  }

  &_selected {
    background-color: rgb(74, 77, 76);
    color: #fff;
  }
}

.search {
  padding: 10px 15px;
  font-size: 22px;
  border-radius: 5px;
  margin-bottom: 30px;
}
</style>

<script>
import Postitem from "@/components/Post";
// import Chart from "@/components/Chart"

export default {
  name: 'posts-page',
  components: {
    PostItempage: Postitem,
  },
  data() {
    return {
      posts: {},
      comment: {},
      searchPost: '',
      itemPage: 10,
      pageNumber: 1,
    }
  },
  created() {
    this.$store.dispatch('fetchPosts');
    this.$store.dispatch('fetchComment');
  },
  computed: {
    allPost() {
      return this.$store.getters['getPosts']
    },
    itemPage() {
      return this.allPost.length / 10
    },
    itemsUser() {
      let from = (this.pageNumber - 1) * this.itemPage;
      let to = from + this.itemPage;
      return this.allPost.slice(from, to)
    },
    filteredPost() {
      return this.itemsUser.filter((item) => item.title.toLowerCase().includes(this.searchPost.toLowerCase()))
    },
    allComment() {
      return this.$store.getters['getComments']
    },

  },
  methods: {
    pageClick(page) {
      this.pageNumber = page
    },
    commentsLength(id) {
      return this.allComment.filter((comment) => comment.postId === id).length
    },
    chartData(post_id) {
      return {
        labels: this.allComment.filter((labels) => labels.postId === post_id).map(c => c.email),
        datasets: [{
          label: 'The number of letters in the Email', data: this.allComment.filter((labels) => labels.postId === post_id).map(c => c.email.length),
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ]
        }]
      }
    },
  },
}
</script>
