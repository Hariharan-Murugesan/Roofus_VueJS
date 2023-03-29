<template >
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props }">
      <button mat-stroked-button v-bind="props" class="enroll-btn">
        Enroll
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
              <v-col cols="6">
                <v-text-field
                  readonly
                  v-model="form.name"
                  :rules="rules.name"
                  color="blue darken-2"
                  label="House Name"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-select
                  multiple
                  clearable
                  chips
                  v-model="form.userName"
                  :rules="rules.userName"
                  :items="userList"
                  label="User List"
                >
                </v-select>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  readonly
                  v-model="form.amount"
                  :rules="rules.amount"
                  color="blue darken-2"
                  label="Visitor Amount"
                  type="number"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="form.type"
                  readonly
                  :rules="rules.type"
                  color="blue darken-2"
                  label="Property"
                  required
                ></v-text-field>
              </v-col>
              <p
                class="v-col-12"
                style="padding: 0 0 5px 12px; margin: 0; text-align: left"
              >
                Start Date
              </p>
              <v-col cols="12" style="padding-top: 0px">
                <input
                  class="dates"
                  type="date"
                  :min="nowDate"
                  placeholder="Start Date"
                  v-model="form.startDate"
                  :rules="rules.startDate"
                />
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
let enrollmentForm = Object.freeze({
  status: "",
  amount: "",
  name: "",
  type: "",
  userName: [],
  startDate: "",
});
export default {
  name: "EntrollmentView",
  props: {
    buttonName: String,
    titles: String,
    user: Object,
    propertyList: Array,
    proprtyType: String,
  },
  created() {
    if (this.user) {
      this.getUserList();
    }
  },
  data: () => ({
    nowDate: new Date().toISOString().slice(0, 10),
    dialog: false,
    title: "User Enroll or UnEnroll",
    form: {},
    StatusList: ["open", "close"],
    userList: [],
    userListDetails: [],
    rules: {
      type: [(val) => (val || "").length > 0 || "This field is required"],
      name: [(val) => (val || "").length > 0 || "This field is required"],
      amount: [(val) => val > 0 || "This field is required"],
      userName: [(val) => (val || "").length > 0 || "This field is required"],
      startDate: [(val) => (val || "").length > 0 || "This field is required"],
    },
    conditions: false,
    terms: false,
    enrollmentForm,
  }),
  watch: {
    formIsValid() {
      return (
        this.form.type &&
        this.form.name &&
        this.form.amount &&
        this.form.userName &&
        this.form.startDate
      );
    },
  },
  methods: {
    resetForm() {
      this.dialog = false
    },
    async submit() {
      if (this.formIsValid()) {
        let userIDs = [];
        for (const user of this.form.userName) {
          const userDetails = await this.userListDetails.find(
            (ele) => ele.name === user
          );
          if (userDetails) {
            userIDs.push({ id: userDetails._id, name: userDetails.name });
          }
        }
        const data = {
          startDate: this.form.startDate,
          //endDate: this.form.endDate,
          users: userIDs,
        };
        this.addEnrollment(data);
      }
    },
    formIsValid() {
      return (
        this.form.type &&
        this.form.name &&
        this.form.amount &&
        this.form.userName &&
        this.form.startDate
        //this.form.endDate
      );
    },
    async addEnrollment(request) {
      const houseId = this.user._id;
      const op = await authService.updateHouse(request, houseId);
      if (op.status === 201) {
        this.dialog = false;
        this.$emit("finished");
      }
    },
    async getUserList() {
      this.form.name = this.user ? this.user.name : "";
      this.form.amount = this.user ? this.user.amount : "";
      this.form.startDate = "";
      this.form.type = this.proprtyType
        ? this.proprtyType
        : this.user && this.user.propertyId
        ? this.user.propertyId.name
        : "";
      this.form.status = this.user ? this.user.status : "";
      const op = await authService.getUserList();
      if (op.status === 200 || op.status === 201) {
        if (op.data.data.length > 0) {
          this.userListDetails = op.data.data;
          for (const element of op.data.data) {
            this.userList.push(element.name);
          }
        }
      }
    },
    limitValidation() {
      if (this.form.userName.length > this.user.propertyId.amount) {
        delete this.form.userName[this.form.userName.length - 1];
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
.enroll-btn {
  gap: 10px;
  margin-right: 10px;
  padding-right: 5px;
  padding-left: 5px;
  height: 30px;
  background: #3b3bc4;
  color: #ffff;
}
.content {
  display: flex;
  flex-direction: row;
  font-size: 20px;
  padding-bottom: 10px;
  justify-content: center;
}

.dates {
  margin-right: 15px;
  border: none;
  padding: 10px 33px;
  background-color: whitesmoke;
}
</style>