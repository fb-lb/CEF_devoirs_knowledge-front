import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  success?: boolean;
  message: string = "";
  checkEmailClass: string = "";

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['success'] === undefined) {
        this.checkEmailClass = 'no-display';
      } else {
        this.success = params['success'] === 'true';
        this.message = params['message'];

        if (this.success) {
          this.checkEmailClass = 'success';
        } else {
          this.checkEmailClass = 'error';
        }
      }
    });
  }
}
