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
        <p style="margin: 0px; font-weight: 500">Property Name :</p>
        <p style="margin: 0px">
          {{ propertyDetail ? propertyDetail.name : "" }}
        </p>
      </div>
      <div style="display: flex; align-items: center; gap: 2px">
        <p style="margin: 0px; font-weight: 500">Property Address :</p>
        <p style="margin: 0px">
          {{ propertyDetail ? propertyDetail.address : "" }}
        </p>
      </div>
      <form class="form-inline-ouline">
        <!-- <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        /> -->
      </form>
      <Address
        @finished="getHouseList"
        :isOpened="isOpened"
        :titles="'Add House'"
        :buttonName="'Add House'"
        :addType="'Add House by Property'"
        :propertyLists="propertyTypeList"
        :propertyNames="propertyDetail.name"
        :propertyId="propertyId"
      ></Address>
    </div>
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th class="text-center">House Name</th>
          <th class="text-center">Visitor Amount</th>
          <th class="text-center">Status</th>
          <th class="text-center">Users Booked</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="title in houseList" :key="title._id">
          <th class="text-center">{{ title.name }}</th>
          <th class="text-center">{{ title.amount }}</th>
          <th class="text-center">{{ title.status }}</th>
          <th class="text-center">
            {{ title.users ? title.users.length : 0 }}
          </th>
          <th class="text-center">
            <RemoveDialog
              @finished="getHouseList"
              :isOpened="isOpened"
              :titles="'Remove House'"
              :content="'Are you sure you want to delete?'"
              :buttonName="'Delete'"
              :userId="title._id"
            ></RemoveDialog>
            <Enrollment
              @finished="getHouseList"
              v-if="title.status == 'Open'"
              :isOpened="isOpened"
              :titles="'Enroll'"
              :buttonName="'Submit'"
              :user="title"
              :proprtyType="propertyDetail.name"
              :propertyList="propertyList"
            ></Enrollment>
            <!-- <RemoveDialog
              @finished="getHouseList"
              v-if="title.status != 'Open'"
              :isOpened="isOpened"
              :titles="'Unenroll'"
              :content="'Are you sure you want to unenroll?'"
              :buttonName="'Unenroll'"
              :unEndrollList="title.users"
              :userId="title._id"
            ></RemoveDialog> -->
            <button class="view-btn" @click="viewProperty(title)">View</button>
          </th>
        </tr>
        <tr v-if="houseList.length == 0" class="text-center align-center">
          No Records
        </tr>
      </tbody>
    </table>
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
import Address from "../components/AddHouse.vue";
import RemoveDialog from "../components/Dialog.vue";
import Enrollment from "../components/Enrollment.vue";
import authService from "../service/authService";

export default {
  name: "ViewPropertyView",
  created() {
    this.getHouseList();
  },
  components: {
    RemoveDialog,
    Enrollment,
    Address,
  },
  data: () => ({
    propertyId: "",
    propertyName: "",
    propertyDetail: {},
    propertyTypeList: [],
    unEndrollList: [],
    items: [
      { text: "Property List", icon: "mdi-view-dashboard" },
      { text: "House List", icon: "mdi-view-dashboard" },
      { text: "User List", icon: "mdi-view-dashboard" },
    ],
    houseList: [],
    propertyDetails: [],
    drawer: null,
    page: 1,
    isOpened: true,
    collectionSize: 6,
  }),
  mounted() {
    this.propertyId = this.$route.params.id;
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    async getHouseList() {
      const ops = await authService.getPropertyList();
      if (ops.status === 200) {
        if (ops.data.list.length > 0) {
          this.propertyList = ops.data.list;
          for (const element of ops.data.list) {
            this.propertyTypeList.push(element.name);
          }
        }
      }
      this.propertyId = this.$route.params.id;
      if (this.propertyId) {
        const op = await authService.getPropertyById(this.propertyId);
        if (op.status === 200) {
          this.propertyDetail = op.data.property;
          this.propertyName = this.propertyDetail.name;
        }
      }
      const op = await authService.getHouseListByPropertyId(this.propertyId);
      if (op.status === 200) {
        this.houseList = op.data.response;
      }
    },
    viewProperty(data) {
      localStorage.setItem("houseUser", JSON.stringify(data));
      this.$router.push({
        path: "/home/houseView/" + data._id,
        params: { id: data._id },
      });
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
.approve-btn {
  gap: 10px;
  margin-right: 10px;
  width: 70px;
  height: 30px;
  background: #3b3bc4;
  color: #ffff;
}
.enroll-btn {
  gap: 10px;
  margin-right: 10px;
  padding-right: 5px;
  padding-left: 5px;
  width: 80px;
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
.act-btn {
  gap: 10px;
}
.address {
  margin: 2vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.view-btn {
  gap: 10px;
  margin-right: 10px;
  width: 70px;
  height: 30px;
  color: #ffff;
  background: rgb(194, 194, 94);
}
</style>
    