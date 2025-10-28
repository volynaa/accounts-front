<template>
	<div class="position-relative">
		<input
			v-model="inputValue"
			:type="type"
			:class="inputClasses"
			:placeholder="placeholder"
			:aria-label="ariaLabel"
			@blur="forceValidate"
			@change="handlerChange"
		>
		<p v-if="showError" class="invalid-label">
			{{ errorMessage }}
		</p>
	</div>
</template>

<script setup lang="ts">
import {ref, computed, watch, nextTick} from 'vue'

	interface Props {
		modelValue: string
		type?: string
		placeholder?: string
		ariaLabel?: string
		maxLength?: number
		required?: boolean
		validations?: boolean | null
	}

	const props = withDefaults(defineProps<Props>(), {
		type: 'text',
		maxLength: 50,
		required: false,
	})

	const emit = defineEmits<{
		'update:modelValue': [value: string]
		'valid': []
	}>()

	const inputValue = ref(props.modelValue)
	const isTouched = ref(false)
	const error = ref<string>('')

	const showError = computed(() => isTouched.value && !!error.value)
	const inputClasses = computed(() => [
		'form-control',
		'form-control-sm',
		'validation-input',
		{ 'invalid-input': showError.value }
	])

	const errorMessage = computed(() => {
		if (error.value) return error.value;
		if (props.required && !inputValue.value) return 'Это поле обязательно для заполнения';
		if (inputValue.value.length > props.maxLength) return `Максимум ${props.maxLength} символов`;
		return '';
	})

	function validate() {
		if (props.required && !inputValue.value.trim()) {
			error.value = 'Это поле обязательно для заполнения';
			return;
		}

		if (inputValue.value.length > props.maxLength) {
			error.value = `Максимум ${props.maxLength} символов`;
			return;
		}

		error.value = '';
	}

	function handlerChange() {
		emit('update:modelValue',inputValue.value);
		validate();
		emit('valid');
	}

	function forceValidate() {
		isTouched.value = true;
		validate();
	}

	watch(() => props.modelValue, (newValue) => {
		inputValue.value = newValue;
	})

</script>

<style scoped lang="scss">
	.invalid{
		&-input{
			border: 1px solid var(--color-danger);
		}
		&-label{
			font-size: 12px;
			line-height: 10px;
			color: var(--color-danger);
			margin-bottom: 0;
			margin-top: 2px;
		}

	}
</style>