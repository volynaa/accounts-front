import { defineStore } from 'pinia'
import { ref } from 'vue'
export interface Notification {
    id: number
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
    timeout?: number
}

export const useNotificationStore = defineStore('notification', () => {
    const notifications = ref<Notification[]>([]);
    const nextId = ref(0);

    function addNotification(message: string, type: Notification['type'] = 'success', timeout?: number) {
        const id = nextId.value++
        const notification: Notification = {
            id,
            message,
            type,
            timeout: timeout || 3000
        }

        notifications.value.push(notification)

        if (notification.timeout !== 0) {
            setTimeout(() => {
                removeNotification(id)
            }, notification.timeout)
        }
    }

    function success(message: string, timeout?: number) {
        addNotification(message, 'success', timeout)
    }

    function error(message: string, timeout?: number) {
        addNotification(message, 'error', timeout)
    }

    function warning(message: string, timeout?: number) {
        addNotification(message, 'warning', timeout)
    }

    function info(message: string, timeout?: number) {
        addNotification(message, 'info', timeout)
    }

    function removeNotification(id: number) {
        notifications.value = notifications.value.filter(notification => notification.id !== id)
    }

    return {
        notifications,
        nextId,

        removeNotification,
        success,
        error,
        warning,
        info
    }
})