<template>
	<div class="notification-container">
		<transition-group name="notification" tag="div">
			<div
				v-for="notification in notifications"
				:key="notification.id"
				:class="['notification', `notification-${notification.type}`]"
				@click="removeNotification(notification.id)"
			>
				<div class="notification-content">
					<span class="notification-message">{{ notification.message }}</span>
					<button class="notification-close" @click.stop="removeNotification(notification.id)">
						×
					</button>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script setup lang="ts">
	import { useNotificationStore } from '@/stores/notificationStore'
	import { storeToRefs } from 'pinia'

	const notificationStore = useNotificationStore()
	const { notifications } = storeToRefs(notificationStore)
	const { removeNotification } = notificationStore
</script>

<style scoped lang="scss">
	.notification-container {
		position: fixed;
		bottom: 20px;
		left: 20px;
		z-index: 1000;
		max-width: 400px;
	}

	.notification {
		margin-bottom: 10px;
		padding: 12px 16px;
		border-radius: 4px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		cursor: pointer;
		transition: all 0.3s ease;

		&-success {
			background-color: var(--notification-success-bg);
			border: 1px solid var(--notification-success-border);
			color: var(--notification-success-text);
		}

		&-error {
			background-color: var(--notification-error-bg);
			border: 1px solid var(--notification-error-border);
			color: var(--notification-error-text);
		}

		&-warning {
			background-color: var(--notification-warning-bg);
			border: 1px solid var(--notification-warning-border);
			color: var(--notification-warning-text);
		}

		&-info {
			background-color: var(--notification-info-bg);
			border: 1px solid var(--notification-info-border);
			color: var(--notification-info-text);
		}

		&-content {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&-message {
			flex: 1;
			margin-right: 10px;
		}

		&-close {
			background: none;
			border: none;
			font-size: 18px;
			cursor: pointer;
			padding: 0;
			width: 20px;
			height: 20px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.notification-enter-active,
	.notification-leave-active {
		transition: all 0.3s ease;
	}

	.notification-enter-from {
		opacity: 0;
		transform: translateX(-100%);
	}

	.notification-leave-to {
		opacity: 0;
		transform: translateX(-100%);
	}

	.notification-move {
		transition: transform 0.3s ease;
	}
</style>