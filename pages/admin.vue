<template>
  <div class='admin-container'>
    <div class='header-container'>
      <span>Panel administracyjny</span>
    </div>

    <div class='content-container'>
      <span>Lista użytkowników</span>
      <table class="table table-striped">
        <thead>
        <tr>
          <th>Nazwa użytkownika</th>
          <th>Email</th>
          <th>Akcje</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if='users' v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button class="btn btn-danger">Usuń</button>
            <button v-b-modal.modal-password class="btn btn-primary">Zmień hasło</button>
            <button @click='getCurrentUserData(user.username, user.roles)' class="btn btn-warning" v-b-modal.modal-roles>Role</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <b-modal id='modal-password' title="Zmień hasło" hide-footer>
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

  <b-modal id='modal-roles' title='Role użytkownika' hide-footer>
   <table class='table table-striped'>
     <thead>
      <td>Rola</td>
      <td>Akcja</td>
     </thead>
     <tbody v-for='role in roles' :key='role.id'>
      <td>{{role.name}}</td>
      <td>
        <button @click='removeRole(currentUsername, role.name)' class="btn btn-danger">Usuń</button>
        <button :disabled='currentUserRoles.includes(role.name)' @click='addRole(currentUsername, role.name)' class="btn btn-primary">Dodaj</button>
      </td>
     </tbody>
   </table>
  </b-modal>
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
      roles: [],
      selectedUser: null,
      newPassword: '',
      currentUsername: null,
      currentUserRoles: []
    }
  },
  mounted() {
    this.fetchUsers(),
    this.getRoles()
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
    getRoles() {
      this.$axios.get('/admin/getRoles', {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.roles = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    addRole(username, role) {
      this.$axios.post('/admin/addRole', {username, role},{
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.getRoles()
      }).catch(error => {
        console.log(error)
      })
    },
    removeRole(username, role) {
      this.$axios.post('/admin/removeRole', {username, role},{
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.getRoles()
      }).catch(error => {
        console.log(error)
      })
    },
    async updatePassword() {
      await this.$store.dispatch('updateUserPassword', {
        userId: this.selectedUser.id,
        newPassword: this.newPassword
      });
      this.newPassword = ''
      this.$bvModal.hide("modal-password")
    },
    getCurrentUserData(username, roles) {
      this.currentUsername = username
      this.currentUserRoles = roles.map(role => role)
    }
  },
}
</script>

<style lang="sass">
@import "assets/admin.sass"
</style>
