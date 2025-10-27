<template>
	<tr class="accounts-table-row">
		<th scope="row">
			<input
				v-model="rowData.label"
				type="text"
				class="form-control form-control-sm"
				:placeholder="placeholder"
				:aria-label="`Метка записи ${rowNumber}`"
			>
		</th>
		<td class="accounts-table-row__cell">
			<select
				v-model="rowData.type"
				class="form-select form-select-sm"
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
				class="form-control form-control-sm"
				placeholder="Введите логин"
				:aria-label="`Логин ${rowNumber}`"
			>
		</td>
		<td>
			<input
				v-model="rowData.password"
				type="password"
				class="form-control form-control-sm"
				placeholder="Введите пароль"
				:aria-label="`Пароль ${rowNumber}`"
			>
		</td>
		<td>
			<CustomButton
				src="/image/trash.svg"
				alt="Удалить запись"
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

withDefaults(defineProps<Props>(), {
	placeholder: 'Введите метку'
})

const handleDelete = () => {

}
</script>

<style scoped lang="scss">
.accounts-table-row {
	transition: background-color 0.15s ease;
	&:hover {
		background-color: var(--color-gray-50);
	}
}
</style>