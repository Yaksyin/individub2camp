<template>
    <b-container>
      <h1 class="text-center">Organization Register</h1>
      <form @submit="saveOrganization">
          nama
          <input v-model="name" id="name" required/>
          image
          <input v-model="image" id="image"/>
          contact
          <input v-model="contact" id="contact" required />
          address
          <input v-model="address" id="address" required/>
          <button type="submit" @click="cancelAdd">Cancel</button>
          <button>Save</button>
      </form>
    </b-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        name: '',
        image: '',
        contact: '',
        address: '',
        file: null,
      };
    },
    methods: {
        cancelAdd() {
          this.$router.push({ name: 'ListOrganization' });
        },
        async saveOrganization() {
          const data = {
           name : this.name,
           contact: this.contact,
           address: this.address,
           imageUrl: this.image
          }
          console.log('pload', data)
            try{
             await this.$axios
            .post('/organizations', data)
            .then((res) => {
              alert('data di tambah',)
              window.location.href='/organizationslist'
              return
            }) 
            } catch(error){}

        },
      }
  };
  </script>