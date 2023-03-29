
<template >
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props }">
      <button mat-stroked-button v-bind="props" class="enroll-btns">
        Enroll User
      </button>
    </template>
    <v-container cols="6">
      <v-form ref="form">
        <v-card style="max-width: 400px">
          <v-card-title style="background-color: whitesmoke">
            <span class="text-h5">Enroll User</span>
          </v-card-title>
          <v-container class="max-width">
            <v-row>
              <v-col cols="6" style="margin-top: 27px">
                <v-select
                  clearable
                  chips
                  v-model="form.userName"
                  :rules="rules.userName"
                  :items="userList"
                  label="User List"
                ></v-select>
              </v-col>
              <v-col cols="6">
                <p
                  class="v-col-12"
                  style="padding: 0 0 5px 12px; margin: 0; text-align: left"
                >
                  Start Date
                </p>
                <v-col cols="12" style="padding-top: 0px">
                  <input
                    class="dates"
                    :min="nowDate"
                    type="date"
                    placeholder="Start Date"
                    v-model="form.startDate"
                    :rules="rules.startDate"
                  />
                </v-col>
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
let enrollmentForm = Object.freeze({
  userName: [],
  startDate: "",
});
export default {
  name: "AddEntrollView",
  props: {
    buttonName: String,
    titles: String,
    user: Object,
    proprtyType: String,
    houseId: String,
  },
  created() {
    this.getUserList();
  },
  data: () => ({
    dialog: false,
    nowDate: new Date().toISOString().slice(0, 10),
    date: new Date(),
    picker: new Date().toISOString().substr(0, 10),
    landscape: false,
    reactive: false,
    title: "Enroll User",
    form: Object.assign({}, enrollmentForm),
    userList: [],
    userListDetails: [],
    rules: {
      userName: [(val) => (val || "").length > 0 || "This field is required"],
      startDate: [(val) => (val || "").length > 0 || "This field is required"],
    },
    enrollmentForm,
  }),
  watch: {
    formIsValid() {
      return this.form.userName && this.form.startDate;
    },
  },
  methods: {
    resetForm() {
      (this.dialog = false), (this.form = Object.assign({}, enrollmentForm));
      this.$refs.form.reset();
    },
    async submit() {
      if (this.formIsValid()) {
        let userIDs = [];
        const userDetails = await this.userListDetails.find(
          (ele) => ele.name === this.form.userName
        );
        if (userDetails) {
          userIDs.push({ id: userDetails._id, name: userDetails.name });
        }
        const data = {
          startDate: this.form.startDate,
          users: userIDs,
        };
        this.addEnrollment(data);
      }
    },
    formIsValid() {
      return this.form.userName && this.form.startDate;
    },
    async addEnrollment(request) {
      const houseId = this.houseId;
      const op = await authService.updateHouse(request, houseId);
      if (op.status === 201) {
        this.$refs.form.reset();
        this.dialog = false;
        this.$emit("finished");
      }
    },
    async getUserList() {
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
.enroll-btns {
  gap: 10px;
  margin-right: 10px;
  padding-right: 5px;
  padding-left: 5px;
  width: 120px;
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
  padding-bottom: 21px;
  background-color: whitesmoke;
}
</style>