<template>
  <container class="edit">
    <h1 class="text-center">Edit Organization</h1>
    <p>
      <label>Name</label>
      <input type="text" v-model="name" placeholder="Enter Name" />
    </p>
    <p>
      <label>Image</label>
      <input type="text" v-model="image" placeholder="Enter Image" />
    </p>
    <p>
      <label>Address</label>
      <input type="text" v-model="address" placeholder="Enter address"/>
    </p>
    <p>
      <label>Contact</label>
      <input type="text" v-model="contact" placeholder="Enter contact" />
    </p>
    <button @click="editOrganization">Save</button>
  </container>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      name: '',
      image: '',
      contact: '',
      address: '',
      file: null,
    };
  },
  methods: {
    fetchOrganization() {
      this.$axios.get(`/organizations/${this.id}`)
        .then((res) => {
          this.name = res.data.name;
          this.image = res.data.imageUrl;
          this.contact = res.data.contact;
          this.address = res.data.address;
        })
        .catch((error) => {
          alert("Error fetching organization: " + error.message);
        });
    },
    cancelEdit() {
      this.$router.push({ name: 'organizationlist' });
    },
    async editOrganization() {
          const data = {
           name : this.name,
           contact: this.contact,
           address: this.address,
           imageUrl: this.image
          }
          console.log('pload', data)
            try{
             await this.$axios
            .put('/organizations/' + this.id, data)
            .then((res) => {
              alert('data di ubah',)
              window.location.href='/organizationslist'
              return
            }) 
            } catch(error){}

        },
  },
  mounted() {
    this.fetchOrganization()
  }
};
</script>
