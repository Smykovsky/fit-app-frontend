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
          <td>{{ user.email }} <strong style='color: red' v-if='user.blocked'>BANNED</strong></td>
          <td>
            <button @click='blockUser(user.username)' v-if='user.blocked === false' class="btn btn-danger">Blokuj</button>
            <button @click='unBlockUser(user.username)' v-else class='btn btn-success'>Odblokuj</button>
            <button @click='updatePassword(user.username, generateRandomPassword(10))' class="btn btn-primary">Zmień hasło</button>
            <button @click='getCurrentUserData(user.username, user.roles)' class="btn btn-warning" v-b-modal.modal-roles>Role</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  <b-modal id='modal-roles' title='Role użytkownika' hide-footer>
   <table class='table table-striped'>
     <thead>
      <td>Rola</td>
      <td>Akcja</td>
     </thead>
     <tbody v-for='role in roles' :key='role.id'>
      <td>{{role.name}}</td>
      <td>
        <button :disabled='!currentUserRoles.includes(role.name) || currentUsername.includes("admin")' @click='removeRole(currentUsername, role.name)' class="btn btn-danger">Usuń</button>
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
      newPassword: null,
      currentUsername: null,
      currentUserRoles: []
    }
  },
  mounted() {
    this.fetchUsers();
    this.getRoles();
  },

  methods: {
    async fetchUsers() {
      this.$axios.get('/api/user/getAll', {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.users = response.data
        console.log(this.users)
      }).catch(error => {
        console.log(error)
      })
    },
    getRoles() {
      this.$axios.get('/api/admin/getRoles', {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.roles = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    addRole(username, role) {
      this.$axios.post('/api/admin/addRole', {username, role},{
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.getRoles()
        this.fetchUsers()
        this.$bvModal.hide("modal-roles");
      }).catch(error => {
        console.log(error)
      })
    },
    removeRole(username, role) {
      this.$axios.post('/api/admin/removeRole', {username, role},{
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.getRoles()
        this.fetchUsers()
        this.$bvModal.hide("modal-roles");
      }).catch(error => {
        console.log(error)
      })
    },
    updatePassword(username, newPassword) {
      this.$axios.post(`/api/admin/${username}/updatePassword`, newPassword,{
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
      }).catch(error => {
        console.log(error)
      })
    },
    getCurrentUserData(username, roles) {
      this.currentUsername = username
      this.currentUserRoles = roles.map(role => role)
    },
    generateRandomPassword(length) {
      var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&';
      var password = ''
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters.charAt(randomIndex);
      }
      return password;
    },
    blockUser(username) {
      this.$axios.post(`/api/admin/${username}/block`, {}, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.$store.dispatch("store/addAlert", "Konto zostało zablokowane!")
        this.fetchUsers()
      }).catch(error => {

      })
    },
    unBlockUser(username) {
      this.$axios.post(`/api/admin/${username}/unBlock`, {}, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.$store.dispatch("store/addAlert", "Konto zostało odblokowane!")
        this.fetchUsers()
      }).catch(error => {

      })
    }
  },
}
</script>

<style lang="sass">
@import "assets/admin.sass"
</style>
