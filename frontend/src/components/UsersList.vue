<template>
  <div class="actions">
    <a class="fetch-users" href="#" @click="fetchUsers">Fetch User Data</a>
    <p :class="{'updated': updated}">Total Users: <span v-html="users.length"></span></p>
    <a class="create-user" href="#" @click="openCreateUserModal">Create User</a>
  </div>
<table>
  <thead>
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Password</th>
    <th>Actions</th>
  </tr>
  </thead>
  <tbody>
    <tr v-if="users.length === 0">
      <td></td>
      <td>no</td>
      <td>data</td>
      <td>found</td>
      <td></td>
    </tr>
    <tr v-for="user in users">
      <td>{{ user.id }}</td>
      <td>{{ user.name }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.password }}</td>
      <td> <a class="user_posts" href="#" @click.prevent="$router.push({name: 'user_post', params: {id: user.id, name: user.name}})">Go To User Posts</a></td>
    </tr>
  </tbody>
</table>

<Teleport to="body">
  <Modal :show="showModalCreateUser" @close="showModalCreateUser = false">
    <template #header>
      <h3>Create New User</h3>
    </template>
    <template #body>
      <form ref="createUserForm">
        <input type="text" id="name" name="name" placeholder="name" v-model="form.name" required>
        <input type="email" id="email" name="email" placeholder="email" v-model="form.email" required>
        <input type="password" id="password" name="password" placeholder="password" minlength="2" v-model="form.password" required>
      </form>
    </template>
    <template #footer>
      <button class="modal-close" @click="closeForm">CANCEL</button>
      <button class="modal-submit" @click="submitCreateUserForm">OK</button>
    </template>
  </Modal>
</Teleport>
</template>

<script lang="ts">
import Modal from "@/components/Modal.vue";

import axios from "axios";
export default {
  name: "UsersList",
  components: {Modal},
  data() {
    return {
      users: [],
      updated: false,
      showModalCreateUser: false,
      form: {
        name: '',
        email: '',
        password: '',
      }
    }
  },
  methods: {
    async fetchUsers(event?: Event) {
      event?.preventDefault()

      try {
        let usersList = await axios.get('/api/users');

        if (usersList.status === 200) {
          this.users = usersList.data;

          this.updated = true;
          setTimeout(() => this.updated = false, 2000);
        }
      } catch (e) {
        console.log(e.message)
        alert('Cannot Get Users, Is the server up?')
      }

    },
    openCreateUserModal(event: Event) {
      event.preventDefault();
      this.showModalCreateUser = true;
    },
    closeForm() {
      this.form = {
        name: '',
        email: '',
        password: '',
      }
      this.showModalCreateUser = false
    },
    async submitCreateUserForm(event: Event) {
      let form = this.$refs.createUserForm as HTMLFormElement

      if (form.checkValidity()) {
        console.log("is valid")

        let createUser = await axios.post(
            '/api/users',
            this.form
        )

        console.log(createUser);
        console.log(createUser.data);

        alert("User Created Successfully")
        this.closeForm();
        this.fetchUsers();
      } else {
        form.reportValidity();
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.actions {
  text-align: center;
  margin: 2rem 0;

  .updated {
    background-color: #04AA6D;
  }

  p {
    display: inline-block;
    margin: 0 1rem;
  }
}

form {
  input {
    font-size: 15px;
    margin-top: 1rem;
  }
}

table {
  width: 100%;

  td, th {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }
  tr {
    &:nth-child(even){background-color: #f2f2f2;}

    &:hover {background-color: #263238;}
  }

  th {
    padding-top: 12px;
    padding-bottom: 12px;
    background-color: #04AA6D;
    color: white;
  }
}
</style>