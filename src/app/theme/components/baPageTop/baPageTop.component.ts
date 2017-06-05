import {Component} from '@angular/core';

import {GlobalState} from '../../../global.state';
import { Router } from '@angular/router';
import { SharedService } from '../../../services/index';

@Component({
  selector: 'ba-page-top',
  templateUrl: './baPageTop.html',
  styleUrls: ['./baPageTop.scss']
})
export class BaPageTop {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  public user: any = null;
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private _state:GlobalState) {
    this.user = sharedService.getUser();
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
  //logout
  public logOut() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
