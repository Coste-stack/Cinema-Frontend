import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, Output, inject } from '@angular/core';
import { TurnstileService } from '../services/turnstile-service';

@Directive({
  selector: '[appTurnstileDirective]'
})
export class TurnstileDirective implements AfterViewInit, OnDestroy {
  @Output() token = new EventEmitter<string>();

  private el = inject(ElementRef<HTMLElement>);
  private turnstileService = inject(TurnstileService);
  private generatedId: string | null = null;

  ngAfterViewInit(): void {
    const host = this.el.nativeElement;
    if (!host.id) {
      this.generatedId = 'turnstile-' + Math.random().toString(36).slice(2, 9);
      host.id = this.generatedId;
    }

    this.turnstileService.render(host.id);
  }

  ngOnDestroy(): void {

  }
}
