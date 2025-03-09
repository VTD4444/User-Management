<template>
  <Header></Header>
  <div class="mt-16 flex flex-col items-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl mt-5">
      <h1 v-if="posts.length > 0" class="text-2xl font-bold mb-6 text-center">Your Posts</h1>
      <h1 v-else class="text-2xl font-bold mb-6 text-center">No posts yet</h1>
      <form @submit.prevent="searchPosts" class="mb-4 flex justify-center">
        <input v-model="searchQuery" type="text" placeholder="Search posts..."
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        <button type="submit"
          class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Search
        </button>
      </form>
      <table v-if="posts.length > 0" class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-200">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Content
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(post, index) in filteredPosts" :key="post.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ index + 1 }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ post.title }}</td>
            <td class="px-6 py-4 whitespace-nowrap" v-html="formatContent(post.content)"></td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button @click="updatePost(post.id)" class="text-yellow-600 hover:text-yellow-900 cursor-pointer">
                Update
              </button>
              <button @click="deletePost(post.id)" class="text-red-600 hover:text-red-900 ml-5 cursor-pointer">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      posts: [],
      searchQuery: "",
    };
  },
  components: {
    Header,
  },
  created() {
    this.loadData();
  },
  computed: {
    filteredPosts() {
      return this.posts.filter(post =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    formatContent(content) {
      return content.replace(/\n/g, "<br>");
    },
    updatePost(postId) {
      this.$router.push({ name: "UpdatePost", params: { id: postId } });
    },
    async deletePost(postId) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        await axios.delete(`https://67cdd65d125cd5af7578f3db.mockapi.io/vtd/posts/${postId}`);
        this.loadData();
        Swal.fire("Deleted!", "Your post has been deleted.", "success");
      }
    },
    async loadData() {
      let userLogin = JSON.parse(localStorage.getItem("userLogin"));
      let userId = userLogin[0].id;
      let result = await axios.get(
        `https://67cdd65d125cd5af7578f3db.mockapi.io/vtd/posts?userId=${userId}`
      );
      if (result.status === 200) {
        this.posts = result.data;
      }
    },
    searchPosts() {
      // This method is intentionally left blank because the search is handled reactively by the computed property `filteredPosts`
    }
  },
};
</script>