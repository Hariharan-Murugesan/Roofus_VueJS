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

  <div v-if="selectedItem === 0">
    <PropertyList></PropertyList>
  </div>
  <div v-if="selectedItem === 1">
    <HouseList></HouseList>
  </div>
  <div v-if="selectedItem === 2">
    <UserList></UserList>
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
import HouseList from "../components/HouseList.vue";
import PropertyList from "../components/PropertyList.vue";
import UserList from "../components/UserList.vue";

export default {
  name: "HomeView",
  created() {
    const userId = localStorage.getItem("userId");
    if (!userId || userId == "undefined") {
      localStorage.clear();
      this.$router.push({ path: "/register" });
    }
  },
  components: {
    HouseList,
    PropertyList,
    UserList,
  },
  data: () => ({
    selectedItem: localStorage.getItem("selectItem")
      ? Number(localStorage.getItem("selectItem"))
      : 0,
    items: [
      { text: "Property List", icon: "mdi-view-dashboard" },
      { text: "House List", icon: "mdi-view-dashboard" },
      { text: "User List", icon: "mdi-view-dashboard" },
    ],
    userName: localStorage.getItem("userName"),
    drawer: null,
    model: 1,
    child: "HouseList",
  }),

  computed: {},

  watch: {
    group() {
      this.drawer = false;
    },
  },

  methods: {
    pathChange(data) {
      this.selectedItem = data;
      localStorage.setItem("selectItem", data);
    },
    logout() {
      localStorage.clear();
      this.$router.push({ path: "/login" });
    },
  },
};
</script>
  
  <style>
.form-inline-ouline {
  padding-right: 10px;
}
.address {
  margin: 2vh;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
.act-btn {
  gap: 10px;
}

.approve-btn {
  height: 30px;
  background: #3b3bc4;
  color: #ffff;
}
.reject-btn {
  height: 30px;
  color: #ffff;
  background: #ff0000;
}
</style>
  