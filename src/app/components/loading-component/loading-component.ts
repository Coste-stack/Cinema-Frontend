import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-loading-component',
  imports: [],
  templateUrl: './loading-component.html',
  styleUrl: './loading-component.scss',
})
export class LoadingComponent implements OnChanges, OnDestroy {
  @Input() visible = false;
  @Input() label = "";

  show = false;

  private showTimer: ReturnType<typeof setTimeout> | null = null;
  private readonly showDelay = 50; // wait before showing

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible']) {
      const v = !!changes['visible'].currentValue;
      if (v) this.requestShow(); else this.requestHide();
    }
  }

  private requestShow() {
    if (this.show || this.showTimer) return;
    this.showTimer = setTimeout(() => {
      this.showTimer = null;
      this.show = true;
    }, this.showDelay);
  }

  private requestHide() {
    if (this.showTimer) { clearTimeout(this.showTimer); this.showTimer = null; }
    if (!this.show) return;
    this.show = false;
  }

  ngOnDestroy(): void {
    if (this.showTimer) clearTimeout(this.showTimer);
  }
}
