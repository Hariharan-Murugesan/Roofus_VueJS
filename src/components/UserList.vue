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
    <AddUser
      @finished="getUserList"
      :isOpened="isOpened"
      :titles="'Add User'"
      :buttonName="'Add User'"
    ></AddUser>
  </div>
  <div class="boxAlign">
    <table class="table">
      <thead class="table-dark">
        <tr>
          <th class="text-center">Name</th>
          <th class="text-center">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="title in userList" :key="title._id">
          <th class="text-center">{{ title.name }}</th>
          <th class="text-center">
            <EditUser
              @finished="getUserList"
              :isOpened="isOpened"
              :titles="'Update User'"
              :buttonName="'Update'"
              :userDetail="title"
            ></EditUser>
            <RemoveDialog
              @finished="getUserList"
              :isOpened="isOpened"
              :titles="'Remove User'"
              :content="'Are you sure you want to delete?'"
              :buttonName="'Delete'"
              :userId="title._id"
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
</template>
    <script>
import RemoveDialog from "../components/Dialog.vue";
import AddUser from "../components/AddUser.vue";
import EditUser from "../components/EditUser.vue";
import authService from "../service/authService";

export default {
  name: "UserListView",
  created() {
    this.getUserList();
  },
  components: {
    AddUser,
    RemoveDialog,
    EditUser,
  },
  data: () => ({
    page: 1,
    isOpened: true,
    collectionSize: 6,
    userList: [],
  }),

  methods: {
    async getUserList() {
      const op = await authService.getUserList();
      if (op.status === 201) {
        this.userList = op.data.data;
      }
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
.page {
  display: flex;
  justify-content: flex-end;
}
</style>
    