<template >
  <div class="container">
    <div class="d-flex justify-content-center w-100">
      <div class="card-container w-100">
        <div class="card px-8 py-8 border-0 shadow rounded-lg" id="form1">
          <div class="form-data" v-if="!submitted">
            <div class="title text-center"><h2>REGISTER</h2></div>
            <div class="forms-inputs mb-4">
              <p class="text-left m-0">Name</p>
              <input
                autocomplete="off"
                type="text"
                v-model="name"
                v-bind:class="{
                  'form-control': true,
                  'is-invalid': !validName(name) && nameBlured,
                }"
                v-on:blur="nameBlured = true"
              />
              <div class="invalid-feedback text-left m-0">
                Valid name is required!
              </div>
            </div>
            <div class="forms-inputs mb-4">
              <p class="text-left m-0">Email</p>
              <input
                autocomplete="off"
                type="email"
                v-model="email"
                v-bind:class="{
                  'form-control': true,
                  'is-invalid': !validEmail(email) && emailBlured,
                }"
                v-on:blur="emailBlured = true"
              />
              <div class="invalid-feedback text-left m-0">
                Valid email is required!
              </div>
            </div>
            <div>
              <button
                v-on:click.stop.prevent="submit"
                class="btn btn-dark w-100 align-items-center"
              >
                Register
              </button>
            </div>
            <router-link to="/login" class="text-right d-block mt-2 primary-clr"
              >Already have account ?</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
    <script>
import authService from "../service/authService";

export default {
  name: "RegisterView",
  created() {
    const userId = localStorage.getItem("userId");
    if (userId && userId != "undefined") {
      this.$router.push({ path: "/home" });
    }
  },
  data() {
    return {
      name: "",
      nameBlured: false,
      valid: false,
      submitted: false,
      email: "",
      emailBlured: false,
    };
  },
  methods: {
    async submit() {
      this.validate();
      if (this.valid) {
        const data = {
          name: this.name,
          email: this.email,
        };
        try {
          const op = await authService.register(data);
        if (op.status === 201) {
          localStorage.setItem("userId", op.data.response._id);
          localStorage.setItem("userName", op.data.response.name);
          this.$router.push({ path: "/home" });
        } 
        } catch (error) {
          this.$toast.error(error.response.data.message, {position: "top-right"});
        }       
      }
    },

    validate() {
      this.nameBlured = true;
      this.emailBlured = true;
      if (this.validName(this.name) && this.validEmail(this.email)) {
        this.valid = true;
      }
    },

    validName(name) {
      if (name.length > 3) {
        return true;
      }
    },

    validEmail(email) {
      var re =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (re.test(email.toLowerCase())) {
        return true;
      }
    },
  },
};
</script>
    
    <style>
.card-container {
  max-width: 450px;
}
.w-100 {
  width: 100%;
}
.container {
  display: flex;
  align-items: center;
  height: 100vh;
  justify-content: center;
}
.input-btn {
  display: flex;
  flex-direction: column;
}
label {
  margin: auto;
  align-items: left;
}
.login-container {
  width: fit-content;
  margin: auto;
}
.title {
  font-size: 60px;
  color: rgb(37, 156, 156);
  margin: auto;
}
.input-field {
  width: 50%;
  padding: 2%;
  margin: auto;
}
.btn {
  display: flex;
  flex-direction: column;
  width: 25%;
  padding: 2%;
  margin: auto;
}
</style>
    