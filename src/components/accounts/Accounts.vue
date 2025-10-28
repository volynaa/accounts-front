<template>
	<header class="header-container">
		<h1>Учетные записи</h1>
		<button
			class="add-btn"
			type="button"
			@click="handleNewAccount"
		>
			+
		</button>
	</header>

	<main>
		<AccountsTable
			:accounts="accounts"
			@edit="handleEditAccount"
			@delete="handleModalOpen"
		/>
	</main>

	<ModalAccept
		v-if="modalDelete"
		:message="message"
		@cancel="modalDelete = false"
		@confirm="handleModalConfirm"
	/>
</template>

<script setup lang="ts">
	import {computed, onMounted, ref} from "vue";
	import AccountsTable from "@/components/accounts/AccountsTable.vue";
	import ModalAccept from "@/components/ui/ModalAccept.vue";
	import { useNotificationStore } from "@/stores/notificationStore";
	import type {Account} from "@/types/accounts.ts";
	import {useAccountsStore} from "@/stores/accountStore.ts";
	const notificationStore = useNotificationStore()
	const accountStore = useAccountsStore()

	const modalDelete = ref(false);
	const deleteLogin = ref('');
	const accounts = ref<Account[]>([]);

	const message = computed(() => {
		return `Вы уверены, что хотите удалить запись <strong>${deleteLogin.value}</strong>?`
	});
	function handleNewAccount(){
		accountStore.addAccount();
	}
	function handleEditAccount(){

	}
	function handleModalConfirm(){
		const index = accounts.value.findIndex((item: Account) => item.login === deleteLogin.value);
		if(index >= 0){
			accounts.value.splice(index, 1);
			accountStore.removeAccount(deleteLogin.value);
			notificationStore.success('Успешно удалено!');
		}
		else notificationStore.error('Ошибка при удалении записи');
		deleteLogin.value = '';
		handleModalClose();
	}
	function handleModalClose(){
		modalDelete.value = false;
	}
	function handleModalOpen(data:string){
		deleteLogin.value = data;
		modalDelete.value = true;
	}

	onMounted(() => {
		accounts.value = accountStore.accounts;
	})
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
