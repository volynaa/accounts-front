<template>
	<header class="header-container">
		<h1>Учетные записи</h1>
		<button
			class="add-btn"
			type="button"
		>
			+
		</button>
	</header>

	<main>
		<AccountsTable
			:accounts="accounts"
			@edit="handleEditAccount"
			@delete="handleDeleteAccount"
		/>
	</main>

	<ModalAccept
		v-if="modalDelete"
		message="Вы уверены, что хотите удалить данную запись?"
	/>
</template>

<script setup lang="ts">
	import {ref} from "vue";
	import AccountsTable from "@/components/accounts/AccountsTable.vue";
	import type {Account} from "@/types/accounts.ts";
	import ModalAccept from "@/components/ui/ModalAccept.vue";

	const accounts = ref<Account[]>([]);
	const modalDelete = ref(false)

	function handleEditAccount(){

	}

	function handleDeleteAccount(){

	}
</script>

<style scoped lang="scss">
	.header-container{
		display: flex;
		align-items: center;
		gap: 15px;
		margin-bottom: 20px;

		.add-btn {
			background-color: white;
			color: var(--color-500);
			border: 2px solid var(--color-400);
			border-radius: 20px;
			width: 40px;
			height: 40px;
			font-size: 24px;
			transition: background-color 0.3s ease-in-out;
			margin-bottom: 0.5rem;

			&:hover{
				background-color: var(--color-300);
			}
		}
	}
</style>
