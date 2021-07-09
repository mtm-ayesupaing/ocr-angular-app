import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiMessage } from 'src/app/constants/apiMessage';
import { User } from 'src/app/models/models';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public displayedColumns: string[] = ['id', 'name', 'email'];
  public dataSource = new MatTableDataSource<User>();

  public users: User[] = [];
  public user = {
    name: null,
    email: null,
    password : null
  };

  constructor(
    private apiMsg: ApiMessage,
    private userSvc: UserService,
    private snackBarSvc: SnackbarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void {
    this.userSvc.getUserList('user_id').subscribe(users => {
      this.users = users;
      this.showData();
    }, error => {
      console.log('ERROR :: ', error);
    });
  }

  showData(): void {
    this.dataSource = new MatTableDataSource(this.users);
    this.dataSource.paginator = this.paginator;
  }

  goToUser(): void {
    this.router.navigate(['/add-users']);
  }

}
