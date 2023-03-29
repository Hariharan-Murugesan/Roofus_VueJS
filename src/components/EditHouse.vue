<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props }">
      <button mat-stroked-button v-bind="props" class="approve-btn">
        {{ titles }}
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
                  label="House Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  v-model="form.amount"
                  :rules="rules.amount"
                  color="blue darken-2"
                  label="Amount"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-select
                  clearable
                  v-model="form.type"
                  :rules="rules.type"
                  :items="propertyLists"
                  filled
                  label="Property"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <v-card-actions>
            <v-row>
              <v-col sm="3">
                <v-btn
                  justify="center"
                  style="background-color: red"
                  text
                  color="white"
                  @click="resetForm"
                >
                  Cancel
                </v-btn></v-col
              >
              <v-col sm="2">
                <v-btn
                  style="background-color: green"
                  justify="center"
                  text
                  color="white"
                  @click="submit"
                  type="submit"
                >
                  {{ buttonName }}
                </v-btn></v-col
              >
            </v-row>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-container>
  </v-dialog>
</template>
    <script>
import authService from "../service/authService";
const editHouseForm = Object.freeze({
  type: "",
  amount: "",
  name: "",
});
export default {
  name: "EditHouseView",
  created() {
    this.editsForm();
  },
  props: {
    buttonName: String,
    titles: String,
    houseDetails: Array,
  },
  data: () => ({
    dialog: false,
    title: "Edit House",
    form: Object.assign({}, editHouseForm),
    rules: {
      type: [(val) => (val || "").length > 0 || "This field is required"],
      name: [(val) => (val || "").length > 0 || "This field is required"],
      amount: [(val) => val > 0 || "This field is required"],
    },
    conditions: false,
    terms: false,
    editHouseForm,
  }),
  watch: {
    formIsValid() {
      return this.form.type && this.form.name && this.form.amount;
    },
  },
  methods: {
    resetForm() {
      (this.dialog = false), (this.form = Object.assign({}, editHouseForm));
      this.$refs.form.reset();
    },
    async submit() {
      if (this.formIsValid()) {
        const propertyIds = await this.getPropertyList(this.form.type);
        if (propertyIds) {
          const data = {
            name: this.form.name,
            amount: this.form.amount,
            propertyId: propertyIds,
          };
          this.editHouse(data);
        }
      }
    },
    formIsValid() {
      return this.form.type && this.form.name && this.form.amount;
    },
    async editHouse(request) {
      const op = await authService.updateHouse(request);
      if (op.status === 201) {
        this.$router.push({ path: "/home" });
      }
    },
    async getPropertyList(type) {
      const op = await authService.getPropertyList();
      if (op.status === 200) {
        if (op.data.list.length > 0) {
          for (const element of op.data.list) {
            if (element.type === type) {
              return element._id;
            }
          }
        }
      }
    },
    editsForm() {
      if (this.houseDetails) {
        this.form.name = this.houseDetails.name;
          this.form.amount = this.houseDetails.amount;
          this.form.type = this.houseDetails.propertyId.name;
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