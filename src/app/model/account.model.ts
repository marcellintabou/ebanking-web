export interface AccountDetails{
    accountId: string;
    balance: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
    accountOperationDTOs: accountOperationDTO[]
}

export interface accountOperationDTO{
    id: number;
    operationDate: Date;
    amount: number;
    type: string;
    description: string;
}