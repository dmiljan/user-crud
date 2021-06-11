<template>
    <form @submit="onSubmit" class="search-form">
        <input type="text" v-model="name" placeholder="Search by name...">

        <input type="submit" value="Search" class="btn-search">
    </form>
</template>

<script>
export default {
    name: 'Search',
    data() {
      return {
        name: ''
      }
    },
    methods: {
      onSubmit(e) {
        e.preventDefault()

        this.$emit('searchUser', this.name)
      }
    }
}
</script>

<style scoped>
.search-form {
  margin-top: 5px;
  border-radius: 5px;
  padding: 5px;
  text-align: center;
}

input[type=text], select {
  padding: 12px 20px;
  margin: 8px 0;
  margin-right: 5px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  background-color: rgb(14, 97, 136);
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: rgb(11, 72, 100);
}
</style>