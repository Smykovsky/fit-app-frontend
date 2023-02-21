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
            options=formOptions
            v-model='selectedGender'
            required
          >
            <b-form-select-option value='Mężczyzna'>Mężczyzna</b-form-select-option>
            <b-form-select-option value='Kobieta'>Kobieta</b-form-select-option>
          </b-form-select>
          <div class='mt-2'>Selected: {{selectedGender}}</div>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Wybierz cel diety"
          label-for="input-1"
        >
          <b-form-select
            id="input-1"
            options=formOptions
            v-model='goal'
            required
          >
            <b-form-select-option value='Utrzymanie masy'>Utrzymanie masy</b-form-select-option>
            <b-form-select-option value='Redukcja'>Redukcja</b-form-select-option>
            <b-form-select-option value='Masa mięśniowa'>Masa mięśniowa</b-form-select-option>
          </b-form-select>
          <div class='mt-2'>Selected: {{goal}}</div>
        </b-form-group>
        <b-form-group
          id='input-group-2'
        >
          <b-button class='btn btn-danger' @click="$bvModal.hide('modal-user')">Zamknij</b-button>
          <b-button class='btn btn-success'>Dodaj</b-button>
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
      selectedGender: null,
      goal: null,
    }
  }
}
</script>

<style scoped>

</style>
