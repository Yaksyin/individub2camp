<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<style scoped>
.home {
  display: flex;
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