<template >
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ props }">
      <button
        v-if="buttonName == 'Delete'"
        mat-stroked-button
        v-bind="props"
        class="reject-btn"
      >
        {{ buttonName }}
      </button>
      <button
        v-if="buttonName == 'Unenroll'"
        mat-stroked-button
        v-bind="props"
        class="unentroll-btn"
      >
        {{ buttonName }}
      </button>
    </template>
    <v-container>
      <v-card style="border: 1px solid gray">
        <v-card-title style="background-color: whitesmoke">
          <span class="text-h5"
            ><p>{{ titles }}</p></span
          >
        </v-card-title>
        <div class="content">
          <p>{{ content }}</p>
        </div>
        <v-card-actions style="display: flex; justify-content: end">
          <v-btn
            style="background-color: red"
            color="white"
            text
            @click="resetForm"
            type="submit"
          >
            Cancel
          </v-btn>
          <v-btn
            style="background-color: green; padding: 0px 15px; margin: 0px 20px"
            justify="center"
            text
            color="white"
            @click="submit"
            type="submit"
          >
            {{ buttonName }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-dialog>
</template>
    <script>
import authService from "../service/authService";

export default {
  name: "RemoveDialogView",
  props: {
    removeType: String,
    buttonName: String,
    titles: String,
    content: String,
    userId: String,
    unEndrollList: Array,
    houseId: String,
    userName: String,
  },
  data: () => ({
    dialog: false,
    title: "Remove Data",
    selected: [],
  }),

  methods: {
    resetForm() {
      this.dialog = false;
      this.$emit("finished");
    },
    submit() {
      if (this.titles === "Unenroll User") {
        this.removeHouseUser(this.houseId);
      } else if (this.titles === "Remove User") {
        this.removeUser(this.userId);
      } else if (this.titles === "Remove House") {
        this.removeHouse(this.userId);
      }
      else {
        this.removeProperty(this.userId);
      }
    },
    async removeHouseUser(id) {
      const op = await authService.removeUserToHouse(id, {
        users: [{ id: this.userId, name: this.userName }],
      });
      if (op.status === 201) {
        this.dialog = false;
        this.$emit("finished");
      }
    },
    async removeUser(id) {
      const op = await authService.deleteUser(id);
      if (op.status === 201) {
        this.dialog = false;
        this.$emit("finished");
      }
    },
    async removeHouse(id) {
      const op = await authService.deleteHouse(id);
      if (op.status === 201) {
        this.dialog = false;
        this.$emit("finished");
      }
    },
    async removeProperty(id) {
      const op = await authService.deleteProperty(id);
      if (op.status === 200) {
        this.dialog = false;
        this.$emit("finished");
      }
    },
    async Unenroll(id) {
      const data = {
        isCheckOut: true,
      };
      const op = await authService.updateHouse(data, id);
      if (op.status === 201) {
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
.reject-btn {
  gap: 10px;
  margin-right: 10px;
  width: 70px;
  height: 30px;
  color: #ffff;
  background: #ff0000;
}
.unentroll-btn {
  gap: 10px;
  margin-right: 10px;
  width: 80px;
  height: 30px;
  color: #ffff;
  background: #ff0000;
}
.content {
  display: flex;
  flex-direction: row;
  font-size: 20px;
  padding-bottom: 10px;
  justify-content: center;
}
</style>