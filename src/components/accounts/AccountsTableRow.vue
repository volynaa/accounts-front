<template>
	<tr class="accounts-table-row">
		<th scope="row">
			<input
				v-model="rowData.label"
				type="text"
				class="form-control form-control-sm accounts-table-row__input"
				placeholder="Введите метку"
				:aria-label="`Метка записи ${rowNumber}`"
			>
		</th>
		<td>
			<select
				v-model="rowData.type"
				class="form-select form-select-sm accounts-table-row__input"
				:aria-label="`Тип учетной записи ${rowNumber}`"
			>
				<option value="LDAP">LDAP</option>
				<option value="local">Локальная</option>
			</select>
		</td>
		<td>
			<input
				v-model="rowData.login"
				type="text"
				class="form-control form-control-sm accounts-table-row__input"
				placeholder="Введите логин"
				:aria-label="`Логин ${rowNumber}`"
			>
		</td>
		<td>
			<input
				v-model="rowData.password"
				type="password"
				class="form-control form-control-sm accounts-table-row__input"
				placeholder="Введите пароль"
				:aria-label="`Пароль ${rowNumber}`"
			>
		</td>
		<td>
			<CustomButton
				src="/image/trash.svg"
				alt="Удалить запись"
				@delete="handleDeleteAccount()"
			/>
		</td>
	</tr>
</template>

<script setup lang="ts">
import CustomButton from "@/components/ui/CustomButton.vue";

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

const props = defineProps<Props>()

const emit = defineEmits<{
	delete: [login: string]
}>()

function handleDeleteAccount(){
	emit('delete', props.rowData.login);
}

</script>

<style scoped lang="scss">
.accounts-table-row {
	transition: background-color 0.15s ease;
	max-height: 40px;

	&:hover {
		background-color: var(--color-gray-50);
	}

	&__input{
		height: 40px;
		font-family: var(--font-family-600);
		font-weight: 600;
		font-size: 18px;
		line-height: 24px;

		@media (max-width: 670px) {
			height: 30px;
			font-size: 14px;
			line-height: 16px;
		}

		@media (max-width: 576px) {
			height: 60px;
			font-size: 14px;
			line-height: 16px;
		}

		&::placeholder{
			font-family: var(--font-family-400);
			font-weight: 400;
			font-size: 16px;
			line-height: 20px;
			white-space: normal;
			word-wrap: break-word;
			overflow-wrap: break-word;

			@media (max-width: 670px) {
				font-size: 12px;
			}
		}
	}
}
</style>