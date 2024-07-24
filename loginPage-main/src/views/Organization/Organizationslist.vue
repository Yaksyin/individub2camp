<template>
    <container class="container-list">
      <div class="organizationlist">
        <h1>Organization List</h1>
        <table class="table table-list" href="/organizationsregister/register">
      
    <thead class="table-head">
      <tr>
        <th >
         <td>No</td>
        </th>
        <th>
          <td>images</td>
        </th>
        <th>
          <td>ID</td>
        </th>
        <th>
          <td>Name</td>
        </th>
        <th>
          <td>Contact</td>
        </th>
        <th>
          <td>Address</td>
        </th>
        <th>
          <td>Action</td>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in organizations" :key="index">
        <td>{{ index + 1 }}</td>
        <td><img :src='item.imageUrl' style="width: 50px;" alt="" /></td>
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.contact }}</td>
        <td>{{ item.address }}</td>
        <td><button @click="routeToOrganizationedit(item.id)">edit</button>
        <button @click="deleteOrganization(item.id)">delete</button></td>
      </tr>
    </tbody>
  </table>
      </div>
    </container>
  </template>
  
  <script>

  export default {
    data() {
      return {
        organizations: [],
        fields: [
          { key: "id", label: "ID" },
          { key: "name", label: "Name" },
          { key: "imageUrl", label: "Image" },
          { key: "contact", label: "Contact" },
          { key: "address", label: "Address" },
          { key: "actions", label: "Actions" },
        ],
      };
    },
    mounted() {
      this.fetchOrganizations();
    },
    methods: {
      fetchOrganizations() {
        this.$axios.get('/organizations')
          .then(response => {
            this.organizations = response.data.map(org => ({
              id: org._id,
              name: org.name,
              imageUrl: org.imageUrl,
              contact: org.contact,
              address: org.address,
            }));
          })
          .catch(error => {
            alert('Error fetching organizations: ' + error.message);
          });
      },
      routeToOrganizationregister() {
        this.$router.push({ name: 'organizationregister' });
      },
      routeToOrganizationedit(id) {
        this.$router.push('/organizationedit/edit/' + id);
      },
      deleteOrganization(id) {
        this.$axios.delete(`/organizations/${id}`)
          .then(() => {
            this.fetchOrganizations();
          })
          .catch(error => {
            alert('Error deleting organization: ' + error.message);
          });
      },
    },
  };
  </script>
  
  <style scoped>
  .home {
    justify-content: center;
    align-items: center;
    height: calc(100vh - 56px); /* Adjust for navbar height */
  }
  
  .content {
    text-align: center;
    max-width: 600px;
    padding: 20px;
  }
  
  div.content {
    margin: -120px 0 0 120px;
  }
  
  img {
    width: 150px;
    margin-bottom: 20px;
  }
  
  h1, h2, h3 {
    font-family: 'Poppins', sans-serif;
  }
  
  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  
  p {
    margin-bottom: 20px;
    line-height: 1.5;
  }
  </style>