<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Update User</h2>
      <form @submit.prevent="updateUser">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input v-model="form.username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="username"
            type="text" placeholder="Enter your username" />
          <p class="message-error text-red-500" v-if="errors.username">
            {{ errors.username }}
          </p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input v-model="form.email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="email"
            type="email" placeholder="Enter your email" />
          <p class="message-error text-red-500" v-if="errors.email">
            {{ errors.email }}
          </p>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input v-model="form.password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
            id="password" type="password" placeholder="Enter your password" />
          <p class="message-error text-red-500" v-if="errors.password">
            {{ errors.password }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" type="button"
            @click="backtoHome">
            Home
          </button>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      form: {
        username: "",
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  mounted() {
    let userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
      userLogin = JSON.parse(userLogin);
      if (userLogin.length > 0) {
        this.form.username = userLogin[0].username;
        this.form.email = userLogin[0].email;
        this.form.password = userLogin[0].password;
      }
    }
  },
  methods: {
    async updateUser() {
      if (this.validateUser()) {
        let item = {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
        };

        let result = await axios.put(
          `https://67cdd65d125cd5af7578f3db.mockapi.io/vtd/users/${this.$route.params.id}`,
          item
        );

        if (result.status === 200) {
          localStorage.setItem("userLogin", JSON.stringify([result.data]));
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "User updated successfully",
            timer: 2000,
          });
          this.$router.push({ name: "Home" });
        }
      }
    },
    backtoHome() {
      this.$router.push({ name: "Home" });
    },
    validateUser() {
      const errors = {};

      if (!this.form.username) {
        errors.username = "Username is required";
      }
      if (!this.form.email) {
        errors.email = "Email is required";
      } else if (!this.validateEmail(this.form.email)) {
        errors.email = "Invalid email";
      }
      if (!this.form.password) {
        errors.password = "Password is required";
      }

      this.errors = errors;

      return Object.keys(errors).length === 0;
    },
    validateEmail(email) {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    },
  },
};
</script>
