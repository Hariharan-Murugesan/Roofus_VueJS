<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props }">
      <v-btn color="primary" v-bind="props"> {{ titles }} </v-btn>
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
              style="
                background-color: green;
                padding: 0px 15px;
                margin: 0px 20px;
              "
              justify="center"
              text
              color="white"
              @click.prevent="submit"
              type="submit"
            >
              SAVE
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
});
export default {
  name: "AddUserView",
  props: {
    buttonName: String,
    titles: String,
    addType: String,
    houseId: String,
  },
  data: () => ({
    dialog: false,
    title: "Add House",
    form: Object.assign({}, userForm),
    rules: {
      name: [(val) => (val || "").length > 0 || "This field is required"],
    },
    userForm,
  }),
  watch: {
    formIsValid() {
      return this.form.name;
    },
  },
  methods: {
    resetForm() {
      this.dialog = false;
      this.$emit("finished");
    },
    submit() {
      if (this.formIsValid()) {
        const data = {
          name: this.form.name,
        };
        this.addUser(data);
      }
    },
    formIsValid() {
      return this.form.name;
    },
    async addUser(data) {
      const op =
        this.addType === "User Add In House"
          ? await authService.addUserByHouseId(this.houseId, data)
          : await authService.addUser(data);
      if (op.status === 201) {
        this.$refs.form.reset();
        this.dialog = false;
        this.$emit("finished");
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
</style>