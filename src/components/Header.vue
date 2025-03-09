<template>
  <header
    class="bg-gray-300 border-b border-gray-300 fixed top-0 left-0 w-full flex justify-between items-center p-4 z-50"
  >
    <div class="welcome-message">
      <h1 class="text-xl text-gray-800">Welcome {{ userName }}</h1>
    </div>
    <nav class="nav-buttons flex space-x-4">
      <button
        @click="addPost"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Post
      </button>
      <button
        @click="updateAccountInfo"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Account Information
      </button>
      <button
        @click="LogOut"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Log Out
      </button>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      userName: "",
      userId: "",
    };
  },
  created() {
    let userLogin = localStorage.getItem("userLogin");
    this.userName = JSON.parse(userLogin)[0].username;
    this.userId = JSON.parse(userLogin)[0].id;
  },
  methods: {
    addPost() {
      this.$router.push({ name: "AddPost" });
    },
    updateAccountInfo() {
      this.$router.push({ name: "UpdateUser", params: { id: this.userId } });
    },
    LogOut() {
      localStorage.removeItem("userLogin");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
