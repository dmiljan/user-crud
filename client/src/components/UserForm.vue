<template>
	<form v-if="show" @submit="onSubmit" class="user-form">
		<h2>{{ formTitle }}</h2>

		<label>Name:</label>
		<input type="text" v-model="form.name" />

		<label>Title:</label>
		<input type="text" v-model="form.title" />

		<input type="submit" value="Save" class="btn-save" />
		<button @click="closeForm" v-show="showBtnClose" class="closeBtn">Close</button>
	</form>
</template>

<script>
export default {
	name: "UserForm",
	data() {
		return {
			isNewRecord: false,
			show: false,
			formTitle: '',
			showBtnClose: false,
			form: {
				name: "",
				title: "",
			},
		};
	},
	methods: {
		onSubmit(e) {
			e.preventDefault();

			if (!this.form.name || !this.form.title) {
				alert("Please fill in the fields");
				return;
			}

			if (this.isNewRecord) {
				this.$emit("add-user", this.form);
			} else {
				this.$emit("update-user", this.form);
			}

			this.clearForm();
		},
		showUpdateForm(model) {
			this.isNewRecord = false;

			this.formTitle = 'Update User';
			this.showBtnClose = true;

			this.showForm();
			
			this.form.id = model.id;
			this.form.name = model.name;
			this.form.title = model.title;
		},
		showCreateForm() {
			this.isNewRecord = true;

			this.formTitle = 'Add User';
			this.showBtnClose = false;

			this.showForm();
		},
		showForm() {
			this.show = true;
		},
		clearForm() {
			this.form.name = ""; 
			this.form.title = "";
		},
		closeForm() {
			this.clearForm();
			this.show = false;
		}
	},
};
</script>

<style scoped>
.user-form {
	margin-top: 10px;
	border-radius: 5px;
	background-color: #f2f2f2;
	padding: 20px;
}

input[type="text"] {
	width: 100%;
	padding: 12px 20px;
	margin: 8px 0;
	display: inline-block;
	border: 1px solid #ccc;
	border-radius: 4px;
	box-sizing: border-box;
}

input[type="submit"], button {
	width: 100%;
	background-color: rgb(14, 97, 136);
	color: white;
	padding: 14px 20px;
	margin: 8px 0;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

input[type="submit"]:hover {
	background-color: rgb(11, 72, 100);
}

.closeBtn {
	background: rgb(107, 37, 32);
}

.closeBtn:hover {
	background: rgb(80, 28, 24);
}
</style>