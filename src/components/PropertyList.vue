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
    <AddProperty
      @finished="getPropertyList"
      :isOpened="isOpened"
      :titles="'Add Property'"
      :buttonName="'Add Property'"
    ></AddProperty>
  </div>
  <div class="boxAlign">
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th class="text-center">Name</th>
          <th class="text-center">Address</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(title, index) in propertyList"
          :key="title._id"
          :index="index"
        >
          <th class="text-center">{{ title.name }}</th>
          <th class="text-center">{{ title.address }}</th>
          <th class="text-center">
            <EditProperty
              @finished="getPropertyList"
              :isOpened="isOpened"
              :titles="'Update Property'"
              :buttonName="'Update'"
              :propertDetail="title"
            ></EditProperty>
            <RemoveDialog
              @finished="getPropertyList"
              :isOpened="isOpened"
              :titles="'Remove Property'"
              :content="'Are you sure you want to delete?'"
              :buttonName="'Delete'"
              :userId="title._id"
            ></RemoveDialog>
            <button class="view-btn" @click="viewProperty(title)">View</button>
          </th>
        </tr>
        <tr
          v-if="propertyList.length == 0"
          class="text-center align-center font-20px"
        >
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
import AddProperty from "../components/AddProperty.vue";
import EditProperty from "../components/EditProperty.vue";
import RemoveDialog from "../components/Dialog.vue";
import authService from "../service/authService";

export default {
  name: "PropertyList",
  created() {
    this.getPropertyList();
  },
  components: {
    AddProperty,
    RemoveDialog,
    EditProperty,
  },
  data: () => ({
    page: 1,
    isOpened: true,
    collectionSize: 6,
    propertyList: [],
  }),

  methods: {
    async getPropertyList() {
      const op = await authService.getPropertyList();
      if (op.status === 200) {
        this.propertyList = op.data.list;
      }
    },
    viewProperty(data) {
      this.$router.push({
        path: "/home/propertyView/" + data._id,
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
.reject-btn {
  gap: 10px;
  margin-right: 10px;
  width: 70px;
  height: 30px;
  color: #ffff;
  background: #ff0000;
}
.view-btn {
  gap: 10px;
  margin-right: 10px;
  width: 70px;
  height: 30px;
  color: #ffff;
  background: rgb(194, 194, 94);
}
.page {
  display: flex;
  justify-content: flex-end;
}
</style>
    