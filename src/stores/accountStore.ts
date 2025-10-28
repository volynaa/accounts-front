import { ref } from 'vue'
import { defineStore } from 'pinia'
import type {Account} from "@/types/accounts.ts";

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  function addAccount() {
    const newAccount: Account = {
      labels: [],
      type: 'LDAP',
      login: '',
      password: ''
    }
    accounts.value.push(newAccount)
    saveToLocalStorage()
    return newAccount.id
  }
})
