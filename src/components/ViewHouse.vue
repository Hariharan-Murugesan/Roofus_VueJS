<template>
  <div>
    <v-toolbar dark prominent>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Roofus</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="logout()">
        <v-icon>mdi-export</v-icon>
        <v-tooltip activator="parent" location="start"> Logout</v-tooltip>
      </v-btn>
    </v-toolbar>
  </div>

  <div class="boxAlign">
    <div class="address">
      <div style="display: flex; align-items: center; gap: 2px">
        <p style="margin: 0px; font-weight: 500">House Name :</p>
        <p style="margin: 0px">{{ houseDetail ? houseDetail.name : "" }}</p>
      </div>
      <div style="display: flex; align-items: center; gap: 2px">
        <p style="margin: 0px; font-weight: 500">Visitor Amount :</p>
        <p style="margin: 0px">{{ houseDetail ? houseDetail.amount : "" }}</p>
      </div>
      <div style="display: flex; align-items: center; gap: 2px">
        <p style="margin: 0px; font-weight: 500">House Status :</p>
        <p style="margin: 0px">{{ houseDetail ? houseDetail.status : "" }}</p>
      </div>
      <form class="form-inline-ouline">
        <!-- <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        /> -->
      </form>
      <div v-if="userList.length != houseDetail.amount">
        <AddEnroll
          @finished="getUserLists"
          :isOpened="isOpened"
          :titles="'Enroll User'"
          :addType="'User Add In House'"
          :buttonName="'Enroll'"
          :houseId="houseId"
          :user="title"
        ></AddEnroll>
      </div>
    </div>
    <div class="boxAlign">
      <table class="table">
        <thead class="table-dark">
          <tr>
            <th class="text-center">Start Date</th>
            <th class="text-center">Name</th>
            <th class="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="title in userList" :key="title._id">
            <th class="text-center">
              {{
                title.houses && title.houses.length > 0
                  ? new Date(title.houses[0].startDate).toLocaleDateString(
                      "en-GB"
                    )
                  : "-"
              }}
            </th>

            <th class="text-center">{{ title.name }}</th>
            <th class="text-center">
              <RemoveDialog
                @finished="getUserLists"
                :isOpened="isOpened"
                :titles="'Unenroll User'"
                :content="'Are you sure you want to unenroll this user?'"
                :removeType="'User Remove In House'"
                :buttonName="'Unenroll'"
                :userId="title._id"
                :houseId="houseId"
                :userName="title.name"
              ></RemoveDialog>
            </th>
          </tr>
          <tr v-if="userList?.length == 0" class="text-center align-center">
            No Records
          </tr>
        </tbody>
      </table>
      <!-- <div class="page">
      <v-pagination
        v-model="page"
        class="my-4"
        :length="collectionSize"
      ></v-pagination>
    </div> -->
    </div>
  </div>

  <v-sheet class="overflow-hidden">
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content> </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          font-size:20px
          @click="pathChange(i)"
          :value="item"
          active-color="primary"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-sheet>
</template>
  
    <script>
import RemoveDialog from "../components/Dialog.vue";
import authService from "../service/authService";
import AddEnroll from "../components/AddEnroll.vue";

export default {
  name: "ViewHouse",
  created() {
    this.getUserLists();
  },
  components: {
    RemoveDialog,
    AddEnroll,
  },
  data: () => ({
    houseId: "",
    houseDetail: {},
    items: [
      { text: "Property List", icon: "mdi-view-dashboard" },
      { text: "House List", icon: "mdi-view-dashboard" },
      { text: "User List", icon: "mdi-view-dashboard" },
    ],
    userList: [],
    propertyDetails: [],
    drawer: null,
    page: 1,
    isOpened: true,
    collectionSize: 6,
  }),
  mounted() {
    this.houseId = this.$route.params.id;
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {

    async getUserLists() {
      this.houseId = this.$route.params.id;
      if (this.houseId) {
        const op = await authService.getHouseById(this.houseId);
        if (op.status === 201) {
          this.houseDetail = op.data.data;
          this.userList = this.houseDetail.users
        }
      }
    },

    logout() {
      localStorage.clear();
      this.$router.push({ path: "/login" });
    },
    pathChange(data) {
      localStorage.setItem("selectItem", data);
      this.$router.push({ path: "/home" });
    },
  },
};
</script>
    <style>
.boxAlign {
  margin: 10px;
}
.form-inline-ouline {
  padding-right: 0px;
  margin-left: auto;
}
.address {
  margin: 2vh;
  display: flex;
  flex-direction: row;
  gap: 15px;
}
.approve-btn {
  gap: 10px;
  margin-right: 10px;
  width: 70px;
  height: 30px;
  background: #3b3bc4;
  color: #ffff;
}
.reject-btn {
  gap: 10px;
  margin-right: 10px;
  width: 70px;
  height: 30px;
  color: #ffff;
  background: #ff0000;
}
.page {
  display: flex;
  justify-content: flex-end;
}

.unentroll-btn {
  gap: 10px;
  margin-right: 10px;
  width: 80px;
  height: 30px;
  color: #ffff;
  background: #ff0000;
}
.form-inline-ouline {
  padding-right: 10px;
}
.act-btn {
  gap: 10px;
}
</style>
      