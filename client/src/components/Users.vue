<template>
    <table>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Title</th>
            <th></th>
            <th></th>
        </tr>
        <tr v-for="(user, index) in users" :key="user.id">
            <td>{{ index + 1 }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.title }}</td>
            <td><i @click="$emit('delete-user', user.id)" class="far fa-trash-alt" style="font-size:25px; color:rgb(107, 37, 32)"></i></td>
            <td><i @click="$emit('edit-user', user)" class="far fa-edit" style="font-size: 25px; color:rgb(14, 97, 136)"></i></td>
        </tr>
    </table>
</template>

<script>
export default {
    name: 'Users',
    props: {
        users: Array
    }
}
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>