<template>
<div>
  <b-modal id="modal-meal" title="Dodawanie posiłku" hide-footer>
    <b-form>
      <b-form-group
        id="input-group-1"
        label="Podaj nazwę jedzenia"
        label-for="input-1"
        description="Posiłek zostanie dodany do listy"
      >
        <b-form-input
          id="input-1"
          type="text"
          placeholder="np. Śniadanie"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id='input-group-2'
      >
        <b-button class='btn btn-danger' @click="$bvModal.hide('modal-meal')">Zamknij</b-button>
        <b-button class='btn btn-success'>Dodaj</b-button>
      </b-form-group>
    </b-form>
  </b-modal>
</div>
</template>

<script>
export default {
  name: 'ModalMeal'
}
</script>

<style scoped>

</style>
