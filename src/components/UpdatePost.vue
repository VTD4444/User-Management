<template>
    <div class="min-h-screen flex items-center justify-center">
        <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 class="text-2xl font-bold mb-6 text-center">Add Post</h1>
            <form @submit.prevent="updatePost">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="title">
                        Title
                    </label>
                    <input v-model="form.title"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        id="title" type="text" placeholder="Title" />
                    <p class="message-error text-red-500" v-if="errors.title">
                        {{ errors.title }}
                    </p>
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="content">
                        Content
                    </label>
                    <textarea v-model="form.content"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                        id="content" rows="4" placeholder="Content"></textarea>
                    <p class="message-error text-red-500" v-if="errors.content">
                        {{ errors.content }}
                    </p>
                </div>
                <div class="flex items-center justify-between">
                    <button
                        class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button" @click="backToHome">
                        Home
                    </button>
                    <button
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit">
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
                title: "",
                content: "",
            },
            errors: {},
            idPost: ""
        };
    },
    methods: {
        async updatePost() {
            if (this.validatePost()) {
                let postItem = {
                    title: this.form.title,
                    content: this.form.content,
                };

                let result = await axios.put(`https://67cdd65d125cd5af7578f3db.mockapi.io/vtd/posts/${this.idPost}`, postItem);

                if (result.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Post added successfully",
                        timer: 2000,
                    });
                    this.$router.push({ name: "Home" });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "An error occurred",
                    });
                }
            }
        },
        validatePost() {
            const errors = {};

            if (!this.form.title) {
                errors.title = "Title is required";
            }
            if (!this.form.content) {
                errors.content = "Content is required";
            }

            this.errors = errors;

            return Object.keys(errors).length === 0;
        },
        backToHome() {
            this.$router.push({ name: "Home" });
        },
    },
    async mounted() {
        this.idPost = this.$route.params.id;
        let result = await axios.get(`https://67cdd65d125cd5af7578f3db.mockapi.io/vtd/posts/${this.idPost}`);
        if (result.status === 200) {
            this.form.title = result.data.title;
            this.form.content = result.data.content;
        }
    }
};
</script>