import {ref} from "vue";
import {defineStore} from "pinia";
import type {Account} from "@/types/accounts.ts";

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([])

  loadFromStorage()

  function addAccount() {
    accounts.value.unshift({
      label: '',
      type: 'LDAP',
      login: '',
      password: ''
    });
    saveToStorage();
  }

  function removeAccount(login: string) {
    accounts.value = accounts.value.filter(account => account.login !== login);
    saveToStorage();
  }

  function saveToStorage() {
    localStorage.setItem('AccountList', JSON.stringify(accounts.value));
  }

  function loadFromStorage() {
    try {
      const stored = localStorage.getItem('AccountList');
      if (stored) {
        accounts.value = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Error loading accounts:', error)
    }
  }

  return {
    accounts,

    addAccount,
    removeAccount
  }
})