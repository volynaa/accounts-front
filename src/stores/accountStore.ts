import {ref} from "vue";
import {defineStore} from "pinia";
import type {Account} from "@/types/accounts.ts";

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([]);
  loadFromStorage();

  function generateId() {
    return Math.max(0, ...accounts.value.map((acc: Account) => acc.id)) + 1;
  }

  function removeAccount(id: number) {
    accounts.value = accounts.value.filter((account: Account) => account.id !== id);
    saveToStorage();
  }

  function changeAccount(acc: Account) {
    const index = accounts.value.findIndex((item: Account) => item.id === acc.id)
    if (index >= 0) {
      accounts.value[index] = acc;
    } else {
      accounts.value.push(acc);
    }
    saveToStorage();

  }

  function getAccounts() {
    return accounts.value;
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
    generateId,
    getAccounts,
    changeAccount,
    removeAccount
  }
})