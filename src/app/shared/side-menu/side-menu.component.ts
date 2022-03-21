import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  menuList: any[] = [
    {
      title: 'Chi tiêu',
      icon: 'las la-wallet',
      routerLink: '/spending',
    },
    {
      title: 'Thành viên',
      icon: 'las la-users',
    },
  ];
}
