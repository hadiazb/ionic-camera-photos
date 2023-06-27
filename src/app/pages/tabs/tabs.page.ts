import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  public closed = new Subject();
  public showTabsMenu = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.onHireTabsMenu();
  }

  public onHireTabsMenu() {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntil(this.closed)
      )
      .subscribe((response) => {
        const resp = response as NavigationEnd;
        if (resp.urlAfterRedirects === '/app/login') {
          return (this.showTabsMenu = false);
        }
        return (this.showTabsMenu = true);
      });
  }
}
