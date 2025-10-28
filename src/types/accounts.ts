interface LabelItem {
    text: string
}
export interface Account {
    id: number,
    label: LabelItem[],
    type: 'LDAP' | 'local',
    login: string,
    password: string | null
}

export interface AccountForm {
    id: number,
    label: string,
    type: 'LDAP' | 'local',
    login: string,
    password: string | null
}