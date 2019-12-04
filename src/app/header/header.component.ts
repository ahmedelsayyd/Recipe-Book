import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  ngOnInit() {
  }
  constructor(private dataStorageService: DataStorageService, private authService: AuthService) { }

  onSaveData() {
    this.dataStorageService.storeRecipe()
      .subscribe(
        (response: Response) => {
          console.log(response)
        }
      );
  }

  onGetData() {
    this.dataStorageService.getRecipes()
  }

  onLogOut() {
    this.authService.logOutUser()
  }


}
