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
              <v-col cols="8">
                <v-text-field
                  v-model="form.address"
                  :rules="rules.address"
                  color="blue darken-2"
                  label="Address"
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
              @click="resetForm"
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
const propertyForm = Object.freeze({
  name: "",
  address: "",
});
export default {
  name: "AddPropertyView",
  props: {
    buttonName: String,
    titles: String,
  },
  data: () => ({
    dialog: false,
    title: "Add House",
    form: Object.assign({}, propertyForm),
    rules: {
      address: [(val) => (val || "").length > 0 || "This field is required"],
      name: [(val) => (val || "").length > 0 || "This field is required"],
    },
    propertyForm,
  }),
  watch: {
    formIsValid() {
      return this.form.name && this.form.address;
    },
  },
  methods: {
    resetForm() {
      (this.dialog = false), (this.form = Object.assign({}, propertyForm));
      this.$refs.form.reset();
    },
    submit() {
      if (this.formIsValid()) {
        const data = {
          name: this.form.name,
          address: this.form.address,
        };
        this.addProperty(data);
      }
    },
    formIsValid() {
      return this.form.name && this.form.address;
    },
    async addProperty(request) {
      const op = await authService.addProperty(request);
      if (op.status === 200) {
        this.$refs.form.reset();
        this.dialog = false;
        this.$emit("finished");
        this.form = Object.assign({}, propertyForm);
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