<template>
	<button
		class="delete-btn"
		type="button"
		@click="$emit('delete')"
		aria-label="Удалить"
	>
		<img
			v-if="src"
			:src="src"
			:alt="alt"
			class="delete-btn__icon"
		>
	</button>
</template>

<script setup lang="ts">
	defineEmits<{
		delete: []
	}>()
	interface Props {
		src: string,
		alt: string
	}

	defineProps<Props>()
</script>

<style scoped lang="scss">
	.delete-btn {
		background: none;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s ease-in-out;

		&:hover {
			transform: scale(1.1);

			.delete-btn__icon {
				filter: invert(25%) sepia(98%) saturate(7485%) hue-rotate(355deg) brightness(91%) contrast(117%);
			}
		}

		&:active {
			transform: scale(0.95);
		}

		&__icon {
			width: 20px;
			height: 20px;
			transition: filter 0.2s ease-in-out;
			margin-top: 10px;

			@media (max-width: 670px) {
				margin-top: 5px;
			}

			@media (max-width: 576px) {
				margin-top: 20px;
			}
		}
	}
</style>