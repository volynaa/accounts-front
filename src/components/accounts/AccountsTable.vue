<template>
	<table class="table table-borderless">
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
				v-for="(row, index) in accounts"
				:key="index"
				:row-data="row"
				:row-number="index + 1"
				@delete="$emit('delete', $event)"
			/>

			<tr v-if="!accounts?.length">
				<td colspan="4" class="text-center py-5 text-muted">
					Записей пока нет
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script setup lang="ts">
import AccountsTableRow from "@/components/accounts/AccountsTableRow.vue";
import type {Account} from "@/types/accounts.ts";

interface Props {
	accounts: Account[]
}

defineProps<Props>()
defineEmits<{
	delete: [id: number]
}>()
</script>

<style scoped lang="scss">
	.table{
		&-title{
			@media (max-width: 576px) {
				color: var(--title-grey);
				font-size: 14px;
				line-height: 22px;
			}
		}
	}
</style>
