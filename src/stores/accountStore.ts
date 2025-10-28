import {ref} from "vue";
import {defineStore} from "pinia";
import type {Account} from "@/types/accounts.ts";

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>([]);
  loadFromStorage();

  function addAccount() {
    const nextId = generateId();

    accounts.value.push({
      id: nextId+1,
      label: '',
      type: 'LDAP',
      login: '',
      password: null
    });
    saveToStorage();
  }
  function generateId(){
    return Math.max(0, ...accounts.value.map(acc => acc.id)) + 1;
  }
  function removeAccount(id: number) {
    accounts.value = accounts.value.filter(account => account.id !== id);
    saveToStorage();
  }

  function changeAccount(acc: Account) {
    const index = accounts.value.findIndex(item => item.id === acc.id)
    if(index >= 0){
      accounts.value[index] = acc;
      saveToStorage();
    }
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
    generateId,
    changeAccount,
    removeAccount
  }
})