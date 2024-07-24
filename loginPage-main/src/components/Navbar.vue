<template>
    <b-navbar toggleable="lg" type="dark" class="navbar">
      <b-navbar-brand href="#">B2C</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-navbar-nav class="flex-column">
      <router-link to="/organizationsregister/register" class="nav-link">Register</router-link> ||
      <router-link to="/home" class="nav-link" exact>Home</router-link> ||
      <router-link to="/about" class="nav-link">About</router-link> ||
      <router-link to="/Organizationslist" class="nav-link">Organizations</router-link>
      <!-- Add more nav items as needed -->
    </b-navbar-nav>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <!-- User Dropdown -->
          <b-nav-item-dropdown right title="User" v-if="user.name">
            <template #button-content>
              {{ user.name }}
            </template>
            <button @click="confirmLogout">Logout</button>
          </b-nav-item-dropdown>
          <b-nav-item @click="confirmLogout" v-else
            >Logout</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  
  export default {
    name: "Navbar",
    data() {
      return {
        user: {
          name: "",
        },
      };
    },
    mounted() {
      this.getUserData();
    },
    methods: {
      ...mapActions(["logout"]),
      confirmLogout() {
        if (confirm("Are you sure you want to logout?")) {
          this.handleLogout();
        }
      },
      handleLogout() {
        this.logout();
        this.$router.push("/")
        .then(() => {
          setTimeout(() => {          
              return alert("You have been logged out.");
            }, 300); // Delay of 100ms
        })
      },
      getUserData() {
        const token = this.$store.state.token;
        this.$axios
          .get("/organizations", {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((profileResponse) => {
            const users = profileResponse.data;
            const userId = users[0]?._id;
  
            if (!userId) {
              console.error("User ID not found in the array.");
              return;
            }
  
            this.$axios
              .get(`/organizations/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then((res) => {
                this.user = res.data; // Assign fetched user data to 'user' object
              })
              .catch((error) => {
                console.error("Error fetching user data: ", error);
              });
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              this.errorMessage = "Unauthorized access - please log in again.";
              this.logout();
            } else {
              console.error(
                "Profile fetch failed:",
                error.response ? error.response.data.message : error.message
              );
            }
          });
      },
      viewProfile() {
        this.$router.push({ name: "profile" }); // Redirect to profile view
      },
      routeOrganizationregister() {
        this.$router.push({path:'/organizationsregister/register'})
      }
    },
  };
  </script>