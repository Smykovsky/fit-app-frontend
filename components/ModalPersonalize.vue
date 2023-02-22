<template>
  <div>
    <b-modal id="modal-user" title="Personalizuj profil" hide-footer>
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Podaj swój wiek"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="number"
            v-model='client.age'
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Podaj swoją wagę"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="number"
            v-model='client.weight'
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Podaj swój wzrost (w cm)"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="number"
            v-model='client.height'
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Wybierz płeć"
          label-for="input-1"
        >
          <b-form-select
            id="input-1"
            v-model='client.gender'
            required
          >
            <b-form-select-option value='Mężczyzna'>Mężczyzna</b-form-select-option>
            <b-form-select-option value='Kobieta'>Kobieta</b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Wybierz cel diety"
          label-for="input-1"
        >
          <b-form-select
            id="input-1"
            v-model='client.goal'
            required
          >
            <b-form-select-option value='Utrzymanie masy'>Utrzymanie masy</b-form-select-option>
            <b-form-select-option value='Redukcja'>Redukcja</b-form-select-option>
            <b-form-select-option value='Masa mięśniowa'>Masa mięśniowa</b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-form-group
          id='input-group-2'
        >
          <b-button class='btn btn-danger' @click="$bvModal.hide('modal-user')">Zamknij</b-button>
          <b-button @click='personalizeUser' class='btn btn-success'>Dodaj</b-button>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'ModalPersonalize',
  data() {
    return {
      client: {
        age: null,
        weight: null,
        height: null,
        gender: null,
        goal: null
      }
    }
  },

  methods: {
    async personalizeUser() {
      this.$axios.post('/api/user/personalize', this.client, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        console.log(this.client)
        this.$bvModal.hide('modal-user');
        location.reload();
      }).catch(error => {
        console.log(error)
      })
    },
  }
}
</script>

<style scoped>

</style>
