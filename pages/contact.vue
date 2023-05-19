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
          <b-form>
            <b-form-input v-model='emailData.from' type='e-mail' placeholder="Wprowadź swój adres e-mail"></b-form-input>
            <b-form-input v-model='emailData.subject' placeholder="Podaj swoję imię"></b-form-input>
            <b-form-textarea v-model='emailData.body' placeholder='wprowadź swoją wiadomość'></b-form-textarea>
            <b-button @click='sendEmail' class='btn btn-primary'>Wyślij</b-button>
          </b-form>
          <AlertEmail/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contact',
  data() {
    return {
      emailData: {
        from: '',
        subject: '',
        body: ''
      },
    }
  },

  methods: {
    sendEmail() {
      this.$axios.post('/api/send', this.emailData, {
        headers: {Authorization: this.$auth.strategy.token.get()}
      }).then(response => {
        this.$store.dispatch('store/addAlert', "Pomyślnie wysłano wiadomość email! Dziękujemy :)")
        console.log("Wysłano wiadomość o treści: " + this.emailData.body)
        this.emailData = {}
      }).catch(error => {
        this.$store.dispatch('store/addError', "Wystąpił błąd podczas wysyłania wiadomości email :(")
      })
    }
  }
}
</script>

<style lang="sass">
@import "assets/contact.sass"
</style>

