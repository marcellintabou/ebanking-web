import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountDetails } from '../model/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) { }

  public getAccount(accountId: string, page: number, size: number): Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.hostname + "/accounts/" + accountId + "/pageOperations?page=" + page + "&size=" + size);
  }

  public credit(accountId: string, amount: number, description: string){
    let data = {accountId, amount, description};
    return this.http.post(environment.hostname + "/accounts/credit", data);
  }                // http://localhost:8085/ebanking/api/v1/accounts/credit 
                   // http://localhost:8085/ebanking/api/v1/accounts/credit

  public debit(accountId: string, amount: number, description: string){
    let data = {accountId, amount, description}; // == {accountId: accountId, amount: amount, description: description}
    return this.http.post(environment.hostname + "/accounts/debit", data);
  }

  public transfer(accountSource: string, accountDestination: string, amount: number, description: string){
    let data = {accountSource, accountDestination, amount, description};
    return this.http.post(environment.hostname + "/accounts/transfer", data);
  }
}
