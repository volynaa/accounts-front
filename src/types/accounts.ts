interface LabelItem {
    text: string
}
export interface Account {
    id: number,
    label: LabelItem[] | string,
    type: 'LDAP' | 'local',
    login: string,
    password: string | null
}
