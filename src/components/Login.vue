<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 class="text-2xl font-bold mb-6 text-center">Log In</h1>
      <form>
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
        <div class="mb-4">
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
            type="button" @click="goToSignUp">
            Sign Up
          </button>
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button" @click="LogIn()">
            Log In
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
        email: "",
        password: "",
      },
      errors: {},
    };
  },
  methods: {
    async LogIn() {
      let data = [];
      if (this.validateUser()) {
        let result = await axios.get("https://67cdd65d125cd5af7578f3db.mockapi.io/vtd/users");

        if (result.status === 200) {
          data = result.data.filter(
            (item) =>
              item.email === this.form.email &&
              item.password === this.form.password
          );
          if (data.length > 0) {
            localStorage.setItem("userLogin", JSON.stringify(data));
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Log in successfully",
              timer: 2000,
            });
            this.$router.push({ name: "Home" });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Invalid email or password",
            });
          }
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
    goToSignUp() {
      this.$router.push({ name: "SignUp" });
    },
  },
};
</script>
