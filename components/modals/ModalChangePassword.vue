<template>
  <div>
    <b-modal id="modal-newPassword" title="Nowe hasło" hide-footer>
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Podaj stare hasło"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="password"
            v-model='credentials.oldPassword'
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label-for="input-1"
          label="Podaj nowe hasło"
        >
          <b-form-input
            id="input-1"
            type="password"
            v-model='credentials.newPassword'
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label-for="input-1"
          label="Potwierdź nowe hasło"
        >
          <b-form-input
            id="input-1"
            type="password"
            v-model='credentials.newPasswordConfirmed'
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id='input-group-2'
        >
          <b-button class='btn btn-danger' @click="$bvModal.hide('modal-newPassword')">Zamknij</b-button>
          <b-button @click='changePassword' class='btn btn-success'>Zapisz</b-button>
        </b-form-group>
      </b-form>
    </b-modal>
    <AlertsAlert/>
  </div>
</template>

<script>
export default {
  name: 'ModalChangePassword',
  data() {
    return {
      credentials: {
        oldPassword: '',
        newPassword: '',
        newPasswordConfirmed: ''
      }
    }
  },
  methods: {
    async changePassword() {
      await this.$axios.post('/auth/changePassword', this.credentials, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.$bvModal.hide('modal-newPassword');
        this.$store.dispatch('store/addAlert', 'Hasło zostało pomyslnie zmienione! Zostaniesz za chwilę wylogowany.')
        try {
          setTimeout(async () => {
            await this.$auth.logout('local');
            await this.$router.push({name: 'login'});
            await localStorage.removeItem("username")
          }, 3000)
        } catch (error) {
          console.log(error)
        }

      }).catch(error => {
        this.$store.dispatch('store/addError', 'Coś poszło nie tak! ')
      })
    },
  },
  removeAlert(payload) {
    this.$store.dispatch('store/removeAlert', payload);
  },
  removeError(payload) {
    this.$store.dispatch('store/removeError', payload);
  },
}
</script>

<style scoped>

</style>
