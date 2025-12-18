
import { Component, Input, Output, EventEmitter, ElementRef, AfterViewInit, OnDestroy, inject } from '@angular/core';

@Component({
  selector: 'app-selector',
  imports: [],
  templateUrl: './selector.html',
  styleUrl: './selector.scss',
})
export class Selector implements AfterViewInit, OnDestroy {
  @Input() values: Array<{ value: string; label: string }>|undefined;
  @Input() selected: string|undefined;
  @Output() selectionChange = new EventEmitter<string>();

  private host = inject(ElementRef<HTMLElement>);

  ngAfterViewInit(): void {
    // Try a few times to position the indicator after render
    Promise.resolve().then(() => requestAnimationFrame(() => this.updateIndicator()));
    setTimeout(() => this.updateIndicator(), 0);
    setTimeout(() => this.updateIndicator(), 120);
    window.addEventListener('resize', this.onWindowResize);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onSelect(value: string) {
    this.selectionChange.emit(value);
    // schedule indicator update
    Promise.resolve().then(() => requestAnimationFrame(() => this.updateIndicator()));
  }

  private onWindowResize = () => {
    this.updateIndicator();
  }

  private updateIndicator(): void {
    try {
      const hostEl = this.host?.nativeElement as HTMLElement;
      if (!hostEl) return;
      const container = hostEl.querySelector('.selector') as HTMLElement | null;
      const indicator = container?.querySelector('.indicator') as HTMLElement | null;
      const activeBtn = container?.querySelector('button.active') as HTMLElement | null;
      if (!container || !indicator) return;
      if (!activeBtn) {
        indicator.style.display = 'none';
        return;
      }

      const left = activeBtn.offsetLeft - container.scrollLeft;
      const width = activeBtn.offsetWidth;

      indicator.style.display = '';
      indicator.style.width = width + 'px';
      indicator.style.left = left + 'px';
      indicator.style.transform = 'none';
    } catch (e) {
      console.error('Selector.updateIndicator', e);
    }
  }
}
