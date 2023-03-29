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
                  label="House Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="form.amount"
                  :rules="rules.amount"
                  color="blue darken-2"
                  label="Visitor Amount"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="8"
                v-if="!addType && addType != 'Add House by Property'">
                <v-select
                  v-model="form.propertyName"
                  :rules="rules.propertyName"
                  :items="propertyLists"
                  label="Property"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions style="display: flex; justify-content: end">
            <v-btn
              justify="center"
              style="background-color: red"
              text
              color="white"
              @click="resetForm"
            >
              Cancel
            </v-btn>
            <v-btn
              style="
                background-color: green; padding: 0px 15px;
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
const addressForm = Object.freeze({
  propertyName: "",
  amount: "",
  name: "",
});
export default {
  name: "AddHouseView",
  props: {
    buttonName: String,
    titles: String,
    propertyLists: Array,
    propertyId: String,
    propertyNames: String,
    addType: String,
  },
  created() {
    this.inialLoad();
  },
  data: () => ({
    dialog: false,
    title: "Add House",
    form: Object.assign({}, addressForm),
    rules: {
      propertyName: [
        (val) => (val || "").length > 0 || "This field is required",
      ],
      name: [(val) => (val || "").length > 0 || "This field is required"],
      amount: [(val) => val > 0 || "This field is required"],
    },
    conditions: false,
    terms: false,
    addressForm,
  }),
  watch: {
    formIsValid() {
      if (this.addType === "Add House by Property") {
        return this.form.name && this.form.amount;
      } else {
        return this.form.propertyName && this.form.name && this.form.amount;
      }
    },
  },
  methods: {
    inialLoad() {
      this.form.propertyName = this.propertyNames ? this.propertyNames : "";
    },
    resetForm() {
      (this.dialog = false), (this.form = Object.assign({}, addressForm));
      this.$refs.form.reset();
    },
    async submit() {
      if (this.formIsValid()) {
        const propertyIds =
          this.addType === "Add House by Property"
            ? this.propertyId
            : await this.getPropertyList(this.form.propertyName);
        if (propertyIds) {
          const data = {
            name: this.form.name,
            amount: this.form.amount,
            propertyId: propertyIds,
          };
          this.addHouse(data);
        }
      }
    },
    formIsValid() {
      if (this.addType === "Add House by Property") {
        return this.form.name && this.form.amount;
      } else {
        return this.form.propertyName && this.form.name && this.form.amount;
      }
    },
    async addHouse(request) {
      const op = await authService.addHouse(request);
      if (op && op.status === 201) {
        this.$refs.form.reset();
        this.dialog = false;
        this.$emit("finished");
      }
    },
    async getPropertyList(propertyName) {
      const op = await authService.getPropertyList();
      if (op.status === 200) {
        if (op.data.list.length > 0) {
          for (const element of op.data.list) {
            if (element.name === propertyName) {
              return element._id;
            }
          }
        }
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
.dates {
  margin-right: 15px;
  border: none;
  padding: 10px 33px;
  background-color: whitesmoke;
}
</style>