<template>
     <form  @submit="onSubmit" class="addUser-form">
         <h2>Add User</h2>
        <label>Name:</label>
        <input type="text" v-model="form.name" name="name">

        <label>Title:</label>
        <input type="text" v-model="form.title" name="title">

        <input type="submit" value="Save" class="btn-save">
    </form>
</template>

<script>
export default {
    name: 'AddUser',
    data() {
        return {
          form: {
            name: '',
            title: ''
          }
        }
    },
    methods: {
         onSubmit(e) {
             e.preventDefault()

             if(!this.form.name || !this.form.title) {
                 alert('Please fill in the fields')
                 return
             }

             const newUser = {
                 name: this.form.name,
                 title: this.form.title 
             }
             
             this.$emit('add-user', newUser)

             this.form.name = '',
             this.form.title = ''

         }
    }
}
</script>

<style scoped>
.addUser-form {
  margin-top: 10px;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type=submit] {
  width: 100%;
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