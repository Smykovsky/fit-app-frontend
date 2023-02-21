<template>
  <div>
    <b-modal id="modal-item" title="Dodawanie produktu" hide-footer>
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Podaj nazwę produktu"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="text"
            placeholder="np. Serek wiejski"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Podaj ilość węglowodanów w produkcie"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Podaj ilość białka w produkcie"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label="Podaj ilość tłuszczów w produkcie"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="text"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id='input-group-2'
        >
          <b-button class='btn btn-danger' @click="$bvModal.hide('modal-item')">Zamknij</b-button>
          <b-button class='btn btn-success'>Dodaj</b-button>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'ModalItem'
}
</script>

<style scoped>

</style>
