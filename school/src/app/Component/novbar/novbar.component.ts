import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/app/class/user';

@Component({
  selector: 'app-novbar',
  templateUrl: './novbar.component.html',
  styleUrls: ['./novbar.component.css']
})
export class NovbarComponent implements OnInit {

  searchQuery: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }


  searchUser(firstName: string): void {
    // console.log(firstName);
    this.userService.searchUsersByFirstName(firstName)

      .subscribe((users: User[]) => {

        const queryParams: any = { firstName: firstName };
       
        this.router.navigate(['/admin'], { queryParams: queryParams })

      });
  }
}
