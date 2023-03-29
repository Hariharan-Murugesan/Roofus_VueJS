<template>
  <div class="address">
    <!-- <form class="form-inline-ouline">
      <input
        class="form-control mr-sm-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
      />
    </form> -->
    <Address
      @finished="getHouseList"
      :isOpened="isOpened"
      :titles="'Add House'"
      :buttonName="'Add House'"
      :propertyLists="propertyTypeList"
    ></Address>
  </div>
  <div class="boxAlign">
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th class="text-center">House Name</th>
          <th class="text-center">Property</th>
          <th class="text-center">Visitor Amount</th>
          <th class="text-center">Status</th>
          <th class="text-center">Users Booked</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="title in houseList" :key="title._id">
          <th class="text-center">{{ title.name }}</th>
          <th class="text-center">
            {{ title.propertyId ? title.propertyId.name : "-" }}
          </th>
          <th class="text-center">{{ title.amount }}</th>
          <th class="text-center">{{ title.status }}</th>
          <th class="text-center">{{ title.users ? title.users.length : 0 }}</th>
          <th class="text-center">
            <RemoveDialog
              @finished="getHouseList"
              :isOpened="isOpened"
              :titles="'Remove House'"
              :content="'Are you sure you want to delete?'"
              :buttonName="'Delete'"
              :userId="title._id"
            ></RemoveDialog>
            <button class="view-btn" @click="viewProperty(title)">View</button>
          </th>
        </tr>
        <tr v-if="houseList.length == 0" class="text-center align-center">
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
</template>
<script>
import Address from "../components/AddHouse.vue";
import RemoveDialog from "../components/Dialog.vue";
import authService from "../service/authService";

export default {
  name: "AddressList",
  created() {
    this.getHouseList();
    this.getPropertyList();
  },
  components: {
    Address,
    RemoveDialog,
  },
  data: () => ({
    houseList: [],
    propertyList: [],
    propertyTypeList: [],
    page: 1,
    isOpened: true,
    collectionSize: 6,
  }),

  methods: {
    async getHouseList() {
      const op = await authService.getHouseList();
      if (op.status === 201) {
        this.houseList = op.data.data;
      }
    },
    async getPropertyList() {
      const op = await authService.getPropertyList();
      if (op.status === 200) {
        if (op.data.list.length > 0) {
          this.propertyList = op.data.list;
          for (const element of op.data.list) {
            this.propertyTypeList.push(element.name);
          }
        }
      }
    },
    viewProperty(data) {
      localStorage.setItem("houseUser", JSON.stringify(data));
      this.$router.push({
        path: "/home/houseView/" + data._id,
        params: { id: data._id },
      });
    },
  },
};
</script>
<style>
.boxAlign {
  margin: 10px;
}
.form-inline-ouline {
  padding-right: 10px;
}
.address {
  margin: 2vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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
</style>
  