<template>
  <header
    class="bg-gray-300 border-b border-gray-300 fixed top-0 left-0 w-full flex justify-between items-center p-4 z-50">
    <div class="welcome-message">
      <h1 class="text-xl text-gray-800">Welcome {{ userName }}</h1>
    </div>
    <nav class="nav-buttons hidden sm:flex space-x-4">
      <button @click="addPost" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Add Post
      </button>
      <button @click="updateAccountInfo" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Update Account Information
      </button>
      <button @click="LogOut" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
        Log Out
      </button>
    </nav>
    <button @click="toggleMenu" class="sm:hidden text-gray-800">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
      </svg>
    </button>
    <transition name="fade">
      <div v-if="isMenuOpen" class="fixed inset-0 bg-black opacity-75 z-40" @click="closeMenu"></div>
    </transition>
    <transition name="slide">
      <div v-if="isMenuOpen"
        class="fixed inset-y-0 right-0 bg-white w-64 h-full shadow-lg p-4 z-50 transition-transform" @click.stop>
        <button @click="addPost" class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2">
          Add Post
        </button>
        <button @click="updateAccountInfo"
          class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2">
          Update Account Information
        </button>
        <button @click="LogOut" class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
          Log Out
        </button>
      </div>
    </transition>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      userName: "",
      userId: "",
      isMenuOpen: false,
    };
  },
  created() {
    let userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
      userLogin = JSON.parse(userLogin);
      if (userLogin.length > 0) {
        this.userName = userLogin[0].username;
        this.userId = userLogin[0].id;
      }
    }
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
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  /* transition: transform 0.3s ease; */
  transform: translateX(100%);
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
