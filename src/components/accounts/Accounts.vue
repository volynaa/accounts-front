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
			tooltipText="Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;"
			@delete="handleModalOpen"
			@changeType="changeType"
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
	const deleteAcc = ref(null);
	const accounts = ref<Account[]>([]);

	const message = computed(() => {
		return `Вы уверены, что хотите удалить запись <strong>${deleteAcc.value.login}</strong>?`
	});
	function handleNewAccount(){
		accountStore.addAccount();
		accounts.value = accountStore.accounts;
	}
	function handleModalConfirm(){
		const index = accounts.value.findIndex((item: Account) => item.id === deleteAcc.value.id);
		if(index >= 0){
			accounts.value.splice(index, 1);
			accountStore.removeAccount(deleteAcc.value.id);
			notificationStore.success('Успешно удалено!');
		}
		else notificationStore.error('Ошибка при удалении записи');
		deleteAcc.value = null;
		handleModalClose();
	}
	function handleModalClose(){
		modalDelete.value = false;
	}
	function handleModalOpen(login: string, id: number){
		deleteAcc.value ={
			login: login,
			id: id
		};
		modalDelete.value = true;
	}
	function changeType(acc: Account) {
		const index = accounts.value.findIndex(item => item.id === acc.id)
		if(index >= 0){
			accounts.value[index].type = acc.type
			accounts.value[index].password = acc.password
		}
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
