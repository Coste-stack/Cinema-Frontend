import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-screening-page',
  imports: [],
  templateUrl: './screening-page.html',
  styleUrl: './screening-page.scss',
})
export class ScreeningPage {
  private route = inject(ActivatedRoute);
  id: string | null = null;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

  }
}
