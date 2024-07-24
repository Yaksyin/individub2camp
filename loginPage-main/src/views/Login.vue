<template>
    <div class="login-form">
      <div class="container">
        <div class="login-wrapper">
          <form @submit.prevent="submit">
            <p>
              <img class="logo" type="image" src="@/assets/Group 522.png">
            </p>
            <h4>Login</h4>
            <label for="email">Email:</label>
            <input type="email" v-model="email" @input="validateEmail" required />
            <div v-if="emailError" class="error">{{ emailError }}</div>
            <div class="button-group">
              <button type="submit" @click="submit">Submit</button>
            </div>
          </form>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  import cookie from "js-cookie";
  
  export default {
    name: "Login",
    data() {
      return {
        email: "",
        emailError: "",
        errorMessage: "",
      };
    },
    methods: {
      ...mapActions(["login"]),
      reset() {
        this.email = "";
        this.emailError = "";
      },
      validateEmail() {
        this.emailError = "";
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!this.email) {
          this.emailError = "This field is required.";
        } else if (this.email.length < 8 || this.email.length > 30) {
          this.emailError = "Email must be between 8 and 30 characters.";
        } else if (!this.email.includes("@")) {
          this.emailError = "Email must contain '@'.";
        } else if (!emailPattern.test(this.email)) {
          this.emailError = "Please enter a valid email address.";
        }
      },
      submit() {
        this.errorMessage = "";
        this.validateEmail();
        if (this.emailError) {
          return;
        }
        this.$axios
          .post("auth/simple-login", { email: this.email })
          .then((loginResponse) => {
            const token = loginResponse.data.token;
                    let forcookie = JSON.stringify(token)
                    cookie.set("token", forcookie, {expires: 1});
                    alert('login success!')
                    window.location.href = "/home"
          })
          .catch((error) => {
            if (error.response && error.response.data && error.response.data.message) {
              this.errorMessage = "Login failed: " + error.response.data.message;
            } else {
              this.errorMessage = "Login failed: Invalid E-mail credential";
            }
          });
      },
    },
  };
  </script>
  