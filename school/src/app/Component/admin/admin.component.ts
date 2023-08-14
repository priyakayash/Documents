import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/app/class/user';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { UpdateUserComponent } from '../update-user/update-user.component';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['UserName', 'Email', 'First Name', 'Middle Name', 'Last Name', 'Mobile No.', 'Gender', 'Role', 'Edit', 'Delete'];
  user: User[] = []; // Replace 'User' with your actual user interface or class
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  firstName: string;
  username: string;

  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<User>(this.user);
  }

  ngOnInit(): void {
    
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    const queryParams = this.route.snapshot.queryParams;
    this.firstName = queryParams.firstName;
    this.username = queryParams.username;

    // OR access query parameters using params observable
    this.route.queryParams.subscribe((queryParams) => {
      this.firstName = queryParams.firstName;
      this.getUser();
    });

    this.route.queryParams.subscribe((queryParams) => {
      this.username = queryParams.username;
    });

    this.getAllProperty();
  }

  getUser(): void {
    if (this.firstName && this.firstName.trim() !== '') {
      this.userService.searchUsersByFirstName(this.firstName)
        .subscribe(
          (users: User[]) => {
            this.user = users;
            this.dataSource.data = this.user;
          },
          (error: HttpErrorResponse) => {
            console.error(error);
          }
        );
    } else {
      this.getAllProperty();
    }
  }

  getAllProperty(): void {
    this.userService.getAllUsers().subscribe(
      (resp: User[]) => {
        this.user = resp;
        this.dataSource.data = this.user;
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      }
    );
  }

  deleteUser(id: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      this.userService.deleteUser(id).subscribe(
        (response: any) => {
          this.getAllProperty();
        },
        (error: HttpErrorResponse) => {
          console.log('HTTP error:', error);
        }
      );
    }
  }
  edit(id: number): void {
    const dialogRef = this.dialog.open(UpdateUserComponent, {
      width: '400px',
      data: { userId: id }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the user in the users array
        const updatedUserIndex = this.user.findIndex(user => user.id === result.id);
        if (updatedUserIndex !== -1) {
          this.user[updatedUserIndex] = result;
        }
      }
    });
  }

  // edit(id: number): void {
  //   this.router.navigate(['update-user', id]);
  // }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}