<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Sign Up</h1>
      <form>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            id="username" type="text" placeholder="Username" v-model="form.username" />
          <p class="message-error text-red-500" v-if="errors.username">
            {{ errors.username }}
          </p>
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
            Email
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight" id="email"
            type="email" placeholder="Email" v-model="form.email" />
          <p class="message-error text-red-500" v-if="errors.email">
            {{ errors.email }}
          </p>
        </div>
        <div class="mb-2">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight"
            id="password" type="password" placeholder="Password" v-model="form.password" />
          <p class="message-error text-red-500" v-if="errors.password">
            {{ errors.password }}
          </p>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button" @click="goToLogin">
            Log In
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button" @click="SignUp()">
            Sign Up
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
      errors: [],
    };
  },
  methods: {
    async SignUp() {
      if (this.validateUser()) {
        let userItem = {
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
        };

        let result = await axios.post("https://67cdd65d125cd5af7578f3db.mockapi.io/vtd/users", userItem);

        if (result.status === 201) {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "User created successfully",
            timer: 2000,
          });
          this.$router.push({ name: "Login" });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred",
          });
        }
      }
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
    goToLogin() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
