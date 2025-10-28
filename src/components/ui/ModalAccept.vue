<template>
	<div class="modal-overlay" @click="$emit('cancel')">
		<div class="modal-content" @click.stop>
			<div class="modal-header">
				<h3>{{ title }}</h3>
				<button class="close-btn" @click="$emit('cancel')">&times;</button>
			</div>
			<div class="modal-body">
				<p v-html="message"></p>
			</div>
			<div class="modal-footer">
				<button class="btn btn-cancel" @click="$emit('cancel')">Отмена</button>
				<button class="btn btn-delete" @click="$emit('confirm')">Удалить</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Props {
	title?: string
	message?: string
}

withDefaults(defineProps<Props>(), {
	title: 'Подтверждение действия',
	message: 'Вы уверены, что хотите удалить этот элемент?'
})

defineEmits<{
	confirm: []
	cancel: []
}>()

</script>

<style scoped lang="scss">
.modal{
	&-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	&-content {
		background: white;
		border-radius: 8px;
		padding: 0;
		min-width: 400px;
		max-width: 500px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	&-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px 20px;
		border-bottom: 1px solid var(--color-background-hover-dark);
	}

	&-header h3 {
		margin: 0;
		font-size: 1.2rem;
	}

	&-footer {
		display: flex;
		justify-content: flex-end;
		gap: 12px;
		padding: 16px 20px;
		border-top: 1px solid var(--color-background-hover-dark);
	}
}

.close-btn {
	background: none;
	border: none;
	font-size: 1.5rem;
	cursor: pointer;
	padding: 0;
	width: 30px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;

	&:hover {
		background-color: var(--color-background-hover);
		border-radius: 50%;
	}
}

.modal-body {
	padding: 20px;

	p {
		margin: 0;
		line-height: 1.5;
	}
}

.btn {
	padding: 8px 16px;
	border: none;
	border-radius: 4px;
	cursor: pointer;
	font-size: 0.9rem;
	transition: background-color 0.2s;

	&-cancel {
		background-color: var(--color-background-hover);

		&:hover {
			background-color: var(--color-background-hover-dark);
		}
	}

	&-delete {
		background-color: var(--color-danger);
		color: white;

		&:hover {
			background-color: var(--color-danger-hover);
			color: white;
		}
	}
}
</style>
