<template>
  <div class="post-page-container">
    <h2>User {{id}} {{name}}</h2>
    <div class="actions">
      <a href="#" @click.prevent="showModalCreatePost = true">Create User Post</a>
    </div>

    <div class="post-container">
      <div class="post" v-if="posts.length === 0">
        <h3>No Post available for User {{id}}</h3>
      </div>
      <div class="post" v-else v-for="post in posts">
        <h3>{{post.title}}</h3>
        <p>{{post.description}}</p>
      </div>
    </div>

  </div>

<Teleport to="body">
  <Modal :show="showModalCreatePost" @close="showModalCreatePost = false">
    <template #header>
      <h3>Create Post</h3>
    </template>
    <template #body>
      <form ref="createPostForm" class="create-post-form">
        <input type="text" name="title" minlength="2" v-model="createPostForm.title" placeholder="Title" required/>
        <textarea name="description" v-model="createPostForm.description" placeholder="Description"></textarea>
      </form>
    </template>
    <template #footer>
      <button class="modal-close" @click.prevent="closeForm">CANCEL</button>
      <button class="modal-submit" @click.prevent="submitCreatePost">OK</button>
    </template>
  </Modal>
</Teleport>
</template>
<script lang="ts">

import axios from "axios";
import Modal from "@/components/Modal.vue";

export default {
  components: {Modal},
  data() {
    return {
      id: null as Number,
      name: '' as String,
      posts: [] as Array<any>,
      showModalCreatePost: false as Boolean,
      createPostForm: {
        title: '' as String,
        description: '' as String
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id;

    this.fetchUserData()
  },
  methods: {
    closeForm() {
      this.createPostForm = {
        title: '',
        description: ''
      }
      this.showModalCreatePost = false
    },
    async submitCreatePost() {
      let form = this.$refs.createPostForm as HTMLFormElement

      if (form.checkValidity()) {
        console.log("is valid")

        let createPost = await axios.post(
            '/api/posts',
            {
              ...this.createPostForm,
              userId: this.id
            }
        )

        if (createPost.status === 200) {
          alert("Post Created Successfully")
          this.fetchUserData();
        }
        this.closeForm();
      } else {
        form.reportValidity();
      }
    },
    fetchUserData() {
      axios.get('/api/users/'+this.id)
          .then((res) => {
            let user = res.data;
            this.name = user.name;
            if (typeof user.posts !== "undefined") {
              this.posts = user.posts;
            }
          })
          .catch((error) => {
            console.log(error)
            this.$router.push({name: 'users'})
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.post-page-container {
  h2 {
    text-align: center;
    margin: 2rem 0;
  }

  .actions {
    text-align: center;
  }

  .post-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 2rem;

    .post {
      text-align: center;
      h3 {
        font-weight: bold;
      }
    }
  }
}

.create-post-form {
  input, textarea {
    width: 100%;
    margin-top: 1rem;
    font-size: 20px;
  }
}
</style>