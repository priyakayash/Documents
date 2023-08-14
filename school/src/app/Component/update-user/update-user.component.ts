import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/app/class/user';
import { Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  user: any; // Replace 'any' with your user interface or class
  id: number;


  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router, @Inject(MAT_DIALOG_DATA) public data: any
    , public dialogRef: MatDialogRef<UpdateUserComponent>) {
    console.log('Received data:', data);
    this.id = data.userId;

    // console.log('Received data:', userId);
    // this.userService.getUpdateById(userId).subscribe(data => {
    //   this.user = data;
    // }, error => console.log(error));
  }

  ngOnInit(): void {
    this.userService.getUpdateById(this.id).subscribe(
      (data: any) => {
        this.user = data;
      },
      error => console.log(error)
    );
  }
  closeDialog(): void {
    this.dialogRef.close();
  }

  userRegister(role) {
    this.userService.updateEmployee(this.id, role).subscribe(data => {
      this.dialogRef.close(this.user);
      this.router.navigate(['/admin'], { relativeTo: this.route });
    }, error => console.log(error));
  }

}
