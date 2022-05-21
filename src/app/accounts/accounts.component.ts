import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AccountDetails } from '../model/account.model';
import { AccountsService } from '../services/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  accountFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 4;
  accountObservable!: Observable<AccountDetails>;

  operationFormGroup!: FormGroup;
  errorMessage!: string;
  constructor(private fb: FormBuilder, private accountsService: AccountsService, private router: Router) { }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control("")
    });

    this.operationFormGroup = this.fb.group({
     // accountId: this.fb.control(""),
      operationType: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDestination: this.fb.control(null)
    });
  }

  handleSearchAccount(){
    let accountId: string = this.accountFormGroup.value.accountId;
    this.accountObservable = this.accountsService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err =>{
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  gotoPage(page: number){
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation(){
    let accountId: string = this.accountFormGroup.value.accountId;
    let operationType = this.operationFormGroup.value.operationType;
    let amount = this.operationFormGroup.value.amount;
    let accountDestination = this.operationFormGroup.value.accountDestination;
    let description = this.operationFormGroup.value.description;
    
    if(operationType =='CREDIT'){

      this.accountsService.credit(accountId, amount, description).subscribe({
        next: (data) => {
          alert("Success Credit");
          this.operationFormGroup.reset();
          this.handleSearchAccount();

        },
        error: (err) => {
          console.log(err);
        }
      });

    } else if(operationType =='DEBIT'){

      this.accountsService.debit(accountId, amount, description).subscribe({
        next: (data) => {
          alert("Success Debit");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error: (err) => {
          console.log(err);
        }
      });

    } else if(operationType =='TRANSFER'){

      this.accountsService.transfer(accountId, accountDestination,  amount, description).subscribe({
        next: (data) => {
          alert("Success Transfer");
          this.operationFormGroup.reset();
          this.handleSearchAccount();
        },
        error: (err) => {
          console.log(err);
        }
      });

    }
  }
}
