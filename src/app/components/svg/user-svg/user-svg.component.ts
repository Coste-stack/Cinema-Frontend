import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-user-svg',
  templateUrl: '../../../../assets/user.svg',
  styleUrls: ['./user-svg.component.css']
})
export class UserSvgComponent {
  fillColor = 'hsl(0, 0%, 0%)';

  changeColor(h: number, s: number, l: number) {
    this.fillColor = `rgb(${h}, ${s}%, ${l}%)`;
  }
}
