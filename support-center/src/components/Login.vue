<template>
    <main class="login">
      <h1>Please login to continue</h1>
      <SmartForm
        class="form"
        :title="title"
        :operation="operation"
        :valib="vaild">
        <FormInput
          name="username"
          v-model="username"
          placeholder="Username" />
        <FormInput
          name="password"
          type="password"
          v-model="password"
          placeholder="Password"/>
        <template v-if="mode === 'signup'">
          <FormInput
            name="verify-password"
            type="password"
            v-model="password2"
            placeholder="Retype Password"
            :invalid="retypePasswordError"
          />
          <FormInput
            name="email"
            type="email"
            v-model="emial"
            placeholder="Email"
          />
        </template>
        <template slot="actions">
          <template v-if="mode === 'login'">
            <button
              type="button"
              class="secondary"
              @click="mode = 'signup'">
              Sign up
            </button>
            <button
              type="submit"
              :disabled="!valid"
            >
              Login
            </button>
          </template>
          <template v-else-if="mode ==='signup'">
            <button
              type="button"
              class="secondary"
              @click="mode = 'login'"
            >
              Back to login
            </button>
            <button
              type="submit"
              :disabled="!vaild"
            >
              create account
            </button>
          </template>
        </template>
      </SmartForm>
    </main>
</template>

<script>

export default {
  name: "Login",
  data() {
    return {
      username: '',
      mode: 'login',
      password: '',
      password2: '',
      email: '',
    }
  },
  computed: {
    title() {
      switch (this.mode) {
        case 'login': return 'Login'
        case 'signup': return 'Create a new account'
      }
    },
    retypePasswordError (){
      return this.password2 && this.password !== this.password2
    },
    signupVaild () {
      return this.password2 && this.email && !this.retypePasswordError
    },
    vaild() {
      return this.username && this.password && (this.mode !== 'signup' || this.signupVaild)
    }
  },
  methods:{
    async operation(){
      await this[this.model]()
    },
    async login() {

    },
    async signup(){

    },
  }
}
</script>

<style scoped>

</style>
