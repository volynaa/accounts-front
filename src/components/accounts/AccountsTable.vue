<template>
	<table class="table table-borderless">
		<thead>
		<tr class="table-title">
			<th scope="col">
				Метки
				<div
					class="tooltip-trigger"
					@mouseenter="showTooltip = true"
					@mouseleave="showTooltip = false"
					ref="triggerRef"
				>
					<img
						class="icon"
						src="/image/accounts/help.svg"
						alt="Подсказка"
					>
				</div>

				<Teleport to="body">
					<div
						v-if="showTooltip"
						class="custom-tooltip"
						:style="tooltipStyle"
					>
						{{ tooltipText }}
						<div class="tooltip-arrow"></div>
					</div>
				</Teleport>
			</th>
			<th scope="col">Тип записи</th>
			<th scope="col">Логин</th>
			<th v-if="showPassword" scope="col">Пароль</th>
		</tr>
		</thead>
		<tbody>
		<AccountsTableRow
			v-for="(row, index) in accounts"
			:key="row.id"
			:row-data="row"
			:row-number="index + 1"
			@delete="handleRowDelete"
			@changeType="$emit('changeType',$event)"
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
	import {computed, ref} from "vue";

	interface Props {
		accounts: Account[],
		tooltipText: string
	}

	const props = defineProps<Props>()
	const emit = defineEmits<{
		delete: [login: string, id: number],
		changeType: [acc: Account]
	}>()

	const showPassword = computed(() => {
		return props.accounts.some(item => item.type === 'local')
	})
	const tooltipStyle = computed(() => {
		if (!triggerRef.value) return {}

		const rect = triggerRef.value.getBoundingClientRect()
		return {
			left: `${rect.left + rect.width / 2}px`,
			top: `${rect.top - 10}px`,
		}
	})

	const showTooltip = ref(false)
	const triggerRef = ref<HTMLElement>()
	function handleRowDelete(login: string, id: number) {
		emit('delete', login, id)
	}
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
	.icon {
		cursor: pointer;
		transition: opacity 0.2s ease;

		&:hover {
			opacity: 0.7;
		}
	}
	.tooltip-trigger {
		display: inline-block;
		margin-left: 4px;
		cursor: pointer;
	}

	.custom-tooltip {
		position: fixed;
		transform: translateX(3%) translateY(110%);
		background: var(--bg-grey);
		color: white;
		padding: 8px 12px;
		border-radius: 6px;
		font-size: 12px;
		white-space: nowrap;
		z-index: 99;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

		.tooltip-arrow {
			position: absolute;
			bottom: -5px;
			left: 50%;
			transform: translateX(-50%);
			border: 5px solid transparent;
		}
	}
</style>