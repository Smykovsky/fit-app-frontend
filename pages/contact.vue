<template>
  <div class='contact-container'>
    <div class='contact-header'>
      <span><font-awesome-icon icon="fa-solid fa-phone" /> Kontakt</span>
    </div>
    <div class='contact-content'>
      <div class='contact-info'>
        <div class='info-header'>
          <span>Informacje kontaktowe</span>
        </div>
        <div class='info-container'>
          <div class='e-mail'>
            <span>Email: </span>
            <span>smyku1232@wp.pl</span>
          </div>
          <div class='telephone'>
            <span>Telefon: </span>
            <span>123 456 789</span>
          </div>
          <div class='adress'>
            <span>Adres: </span>
            <span>Białcz ul. Gorzowska 3D</span>
          </div>
        </div>
      </div>

      <div class='contact-form'>
        <div class='contact-header'>
          <span>Wyślij wiadomość!</span>
        </div>
        <div class='form'>
          <b-form-input  placeholder="Podaj swoję imię"></b-form-input>
          <b-form-input type='e-mail' placeholder="Wprowadź swój adres e-mail"></b-form-input>
          <b-form-textarea placeholder='wprowadź swoją wiadomość'></b-form-textarea>
          <b-button class='btn btn-primary'>Wyślij</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contact'
}
</script>

<style lang="sass">
@import "assets/contact.sass"
</style>

