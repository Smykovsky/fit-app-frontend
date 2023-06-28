<template>
  <div class='admin-container'>
    <div class='header-container'>
      <span>Panel administracyjny</span>
    </div>

    <div class='content-container'>
      <span>Lista użytkowników</span>
      <table class="table">
        <thead>
        <tr>
          <th>Imię</th>
          <th>Email</th>
          <th>Akcje</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="deleteUser(user.id)" class="btn btn-danger">Usuń</button>
            <button @click="showPasswordModal(user)" class="btn btn-primary">Zmień hasło</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div v-if="selectedUser">
      <b-modal v-model="showPasswordModal" title="Zmień hasło" hide-footer>
        <form @submit.prevent="updatePassword">
          <div class="form-group">
            <label for="newPassword">Nowe hasło:</label>
            <input type="password" id="newPassword" v-model="newPassword" class="form-control">
          </div>
          <div class="form-group">
            <button type="submit" class="btn btn-primary">Zapisz</button>
          </div>
        </form>
      </b-modal>
    </div>

    </div>
</template>

<script>
export default {
  name: 'admin',
  middleware: ['adminGuard'],
  data() {
    return{
      loading: true,
      users: [],
      selectedUser: null,
      newPassword: ''
    }
  },
  mounted() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      this.$axios.get('/api/user/getAll', {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.users = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    showPasswordModal(user) {
      this.selectedUser = user;
      this.showPasswordModal = true;
    },
    async updatePassword() {
      await this.$store.dispatch('updateUserPassword', {
        userId: this.selectedUser.id,
        newPassword: this.newPassword
      });
      this.newPassword = '';
      this.showPasswordModal = false;
    }
  },
}
</script>

<style lang="sass">
@import "assets/admin.sass"
</style>
