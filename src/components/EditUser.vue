<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props }">
      <button mat-stroked-button v-bind="props" class="approve-btn">
        Update
      </button>
    </template>
    <v-container cols="6">
      <v-form ref="form">
        <v-card style="max-width: 400px">
          <v-card-title style="background-color: whitesmoke">
            <span class="text-h5"
              ><p>{{ titles }}</p></span
            >
          </v-card-title>
          <v-container class="max-width">
            <v-row>
              <v-col cols="8">
                <v-text-field
                  v-model="form.name"
                  :rules="rules.name"
                  color="blue darken-2"
                  label="Name"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions style="display: flex; justify-content: end"> 
                <v-btn
                  justify="center"
                  style="background-color: red"
                  color="white"
                  text
                  @click.prevent="resetForm"
                >
                  Cancel
                </v-btn>
                <v-btn
                  style="background-color: green; padding: 0px 15px; margin: 0px 20px;"
                  justify="center"
                  text
                  color="white"
                  @click.prevent="submit"
                  type="submit"
                >
                  {{ buttonName }}
                </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-container>
  </v-dialog>
</template>
      <script>
import authService from "../service/authService";
const userForm = Object.freeze({
  name: "",
  amount: "",
});
export default {
  name: "updateUserView",
  props: {
    buttonName: String,
    titles: String,
    userDetail: Object,
  },
  created() {
    this.editsForm();
  },
  data: () => ({
    dialog: false,
    title: "Edit User",
    form: {},
    rules: {
      name: [(val) => (val || "").length > 0 || "This field is required"],
    },
    conditions: false,
    terms: false,
    userForm,
  }),
  watch: {
    formIsValid() {
      return this.form.name;
    },
  },
  methods: {
    resetForm() {
      this.dialog = false
    },
    submit() {
      if (this.formIsValid()) {
        const data = {
          name: this.form.name,
          id: this.userDetail._id,
        };
        this.updateUser(data);
      }
    },
    formIsValid() {
      return this.form.name;
    },
    async updateUser(data) {
      const op = await authService.updateUser(data);
      if (op.status === 201) {
        this.dialog = false;
        this.$emit("finished");
      }
    },
    editsForm() {
      if (this.userDetail) {
        this.form.name = this.userDetail.name;
      }
    },
  },
};
</script>
    <style>
.max-width {
  max-width: 900px;
}
.v-row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin: -12px;
  justify-content: center;
}
.approve-btn {
  gap: 10px;
  margin-right: 10px;
  width: 70px;
  height: 30px;
  background: #3b3bc4;
  color: #ffff;
}
</style>