<template>
	<div class="container">
		<h2>Users</h2>
		<button
			:style="{ background: colorBtn }"
			class="btn-addUser"
			@click="showCreateForm"
		>
			{{ textBtn }}
		</button>
		<Search @searchUser="searchUser" />
		<UserForm ref="userForm" @add-user="addUser" @update-user="updateUser" />
		<Users
			:users="users"
			@edit-user="showEditForm"
			@delete-user="deleteUser"
		/>
	</div>
</template>

<script>
import Users from "./components/Users";
import UserForm from "./components/UserForm.vue";
import Search from "./components/Search";

import axios from "axios";

export default {
	name: "App",
	components: {
		Users,
		UserForm,
		Search
	},
	data() {
		return {
			users: [],
			textBtn: "Add User",
			colorBtn: "green",
		};
	},
	created() {
		this.loadUsers();
	},

	methods: {
        loadUsers() {
            axios.get("http://localhost:5000/getAll")
            .then((response) => {
                this.users = response.data;
            });
        },
		addUser(user) {
			axios
				.post("http://localhost:5000/insert", {
					name: user.name,
					title: user.title,
				})
				.then((response) => {
					this.loadUsers();
				});
		},
		deleteUser(id) {
			axios
				.delete(`http://localhost:5000/delete/${id}`)
				.then((response) => {
					this.loadUsers();
				});
		},
		updateUser(user) {
			axios.patch("http://localhost:5000/update", {
				id: user.id,
				name: user.name,
				title: user.title,
			})
            .then((response) => {
					this.loadUsers();
				});
		},
		searchUser(name) {
            if(name == ''){
                this.loadUsers();
            } else {
                axios.get(`http://localhost:5000/search/${name}`)
				.then((response) => {
					this.users = response.data;
				});
            }
		},
        showEditForm(user){
            this.$refs.userForm.showUpdateForm(user);
        },
		showCreateForm() {
            if(this.$refs.userForm.show){
                this.$refs.userForm.closeForm();
            } else {
                this.$refs.userForm.showCreateForm();
            }

			if (this.$refs.userForm.show) {
				this.textBtn = "Close";
				this.colorBtn = "red";
			} else {
				this.textBtn = "Add User";
				this.colorBtn = "green";
			}
		},
	},
};
</script>

<style>
body {
	font-family: "Poppins", sans-serif;
}
.container {
	max-width: 500px;
	margin: 30px auto;
	overflow: auto;
	min-height: 300px;
	border: 1px solid rgb(14, 97, 136);
	padding: 30px;
	border-radius: 5px;
}
h2 {
	text-align: center;
	margin-top: 0px;
	color: rgb(14, 97, 136);
}
.btn-addUser {
	padding: 14px 20px;
	border-radius: 5px;
	border: none;
	color: white;
}
</style>
