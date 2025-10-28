<template>
	<tr class="accounts-table-row">
		<th scope="row">
			<ValidationInput
				v-model="localAccount.label"
				placeholder="Введите метку"
				:aria-label="`Метка записи ${rowNumber}`"
				@valid="validateLabel"
			/>
		</th>
		<td>
			<select
				v-model="localAccount.type"
				class="form-select form-select-sm validation-input"
				:aria-label="`Тип учетной записи ${rowNumber}`"
				@change="validateType"
			>
				<option value="LDAP">LDAP</option>
				<option value="local">Локальная</option>
			</select>
		</td>
		<td :colspan="isLDAP ? 2 : 1">
			<ValidationInput
				v-model="localAccount.login"
				:max-length="100"
				:required="true"
				placeholder="Введите логин"
				:aria-label="`Логин ${rowNumber}`"
				@valid="validateLogin"
			/>
		</td>
		<td v-if="!isLDAP&&passwordNoEmpty" class="position-relative">
			<ValidationInput
				v-model="localAccount.password"
				:type="showPassword ? 'text' : 'password'"
				:max-length="100"
				:required="true"
				placeholder="Введите пароль"
				:aria-label="`Пароль ${rowNumber}`"
				@valid="validatePassword"
			/>
			<button
				v-if="localAccount.password"
				type="button"
				class="btn btn-link position-absolute top-50 end-0 translate-middle-y text-secondary p-0 me-2"
				@click="showPassword = !showPassword"
				:aria-label="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
			>
				<img
					:src="showPassword ? '/image/accounts/eye-show.svg' : '/image/accounts/eye-hide.svg'"
					:alt="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
					class="show-icon"
				>
			</button>
		</td>
		<td>
			<CustomButton
				src="/image/accounts/trash.svg"
				alt="Удалить запись"
				@delete="handleDeleteAccount()"
			/>
		</td>
	</tr>
</template>

<script setup lang="ts">
	import CustomButton from "@/components/ui/CustomButton.vue";
	import {computed, ref} from "vue";
	import ValidationInput from "@/components/ui/ValidationInput.vue";
	import {useAccountsStore} from "@/stores/accountStore";
	import type {Account} from "@/types/accounts.ts";
	import {useNotificationStore} from "@/stores/notificationStore";
	const accountStore = useAccountsStore();
	const notificationStore = useNotificationStore()
	interface TableRow {
		id: number
		label: string
		type: string
		login: string
		password: string
	}

	interface Props {
		rowData: TableRow
		rowNumber: number
		placeholder?: string
	}

	const props = defineProps<Props>();
	const emit = defineEmits<{
		delete: [login: string, id: number]
		changeType: [acc: Account]
	}>();

	const isLDAP = computed(() => localAccount.value.type === 'LDAP');
	const passwordNoEmpty = computed(() => localAccount.value.password !== null);
	const showPassword = ref(false);
	const localAccount = ref({
		...props.rowData,
		label: Array.isArray(props.rowData.label)
			? props.rowData.label.map(item => item.text).join(';')
			: props.rowData.label
	});
	const isLabelValid = ref(true);
	const isLoginValid = ref(!!props.rowData.login);
	const isPasswordValid = ref(true);

	function validateLabel() {
		if (localAccount.value.label.length > 50) {
			isLabelValid.value = false;
		}
		isLabelValid.value = true;
		checkOverallValidity();
	}
	function validateType() {
		if(localAccount.value.type === 'local'){
			localAccount.value.password = '';
			isPasswordValid.value = false;
		}
		else{
			localAccount.value.password = null;
			isPasswordValid.value = true;
			checkOverallValidity();
		}
		emit('changeType',localAccount.value);
	}
	function validateLogin() {
		if (!localAccount.value.login.trim()) {
			isLoginValid.value = false;
		}
		if (localAccount.value.login.length > 100) {
			isLoginValid.value = false;
		}
		isLoginValid.value = true;
		checkOverallValidity();
	}

	function validatePassword() {
		if (localAccount.value.type === 'local') {
			if (!localAccount.value.password) {
				isPasswordValid.value = false;
			}
			if (localAccount.value.password.length > 100) {
				isPasswordValid.value = false;
			}
		}
		isPasswordValid.value = true;
		checkOverallValidity();
	}

	function checkOverallValidity() {
		const isValid = isLabelValid.value && isLoginValid.value && isPasswordValid.value;
		if (isValid) {
			const accountToSave = {
				...localAccount.value,
				label: localAccount.value.label
					.split(';')
					.map((item: string) => item.trim())
					.filter((item: string) => item)
					.map((text: string) => ({ text }))
			}
			console.log(accountToSave)
			accountStore.changeAccount(accountToSave);
			notificationStore.success('Запись успешно сохранена!');
		}
	}

	function handleDeleteAccount(){
		emit('delete', localAccount.value.login, localAccount.value.id);
	}


</script>

<style scoped lang="scss">
	.accounts-table-row {
		transition: background-color 0.15s ease;
		max-height: 40px;

		&:hover {
			background-color: var(--color-gray-50);
		}

		.show-icon{
			padding: 5px;
		}
	}
</style>