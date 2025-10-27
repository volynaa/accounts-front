<template>
	<table>
		<thead>
		<tr class="table-title">
			<th scope="col">Метки</th>
			<th scope="col">Тип записи</th>
			<th scope="col">Логин</th>
			<th scope="col">Пароль</th>
		</tr>
		</thead>
		<tbody>
			<AccountsTableRow
				v-for="(row, index) in tableData"
				:key="row.id"
				:row-data="row"
				:row-number="index + 1"
			/>

			<tr v-if="!tableData.length">
				<td colspan="4" class="text-center py-5 text-muted">
					Записей пока нет
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import {ref} from "vue";
import AccountsTableRow from "@/components/accounts/AccountsTableRow.vue";

const tableData = ref([
	{ id: 1, label: '', type: '', login: '', password: '' },
	{ id: 2, label: '', type: '', login: '', password: '' },
	{ id: 3, label: '', type: '', login: '', password: '' }
])
</script>

<style scoped>
	.table-title{
		color: var(--title-grey);
		font-size: 14px;
		line-height: 22px;
	}
</style>
