import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, inject } from '@angular/core';
import { TurnstileService } from '../services/turnstile-service';

@Directive({
  selector: '[appTurnstileDirective]'
})
export class TurnstileDirective implements AfterViewInit, OnDestroy {
  @Output() token = new EventEmitter<string>();
  @Input() theme?: string | null;

  private el = inject(ElementRef<HTMLElement>);
  private turnstileService = inject(TurnstileService);
  private generatedId: string | null = null;

  ngAfterViewInit(): void {
    // Get element container
    const host = this.el.nativeElement;
    if (!host.id) {
      this.generatedId = 'turnstile-' + Math.random().toString(36).slice(2, 9);
      host.id = this.generatedId;
    }

    // Add turnstile class
    host.classList.add("cf-turnstile");

    /* Get options from html attribute or media or none */
    // Get theme
    let theme = this.theme ?? host.getAttribute('data-theme') ?? undefined;
    if (theme === undefined && window.matchMedia) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme = "dark";
      } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        theme = "light";
      }
    }
    // Get size
    let size = this.theme ?? host.getAttribute('data-size') ?? undefined;
    if (size === undefined && window.matchMedia) {
      if (window.matchMedia('(max-width: 340px)').matches) {
        size = "compact";
      }
    }

    // Render element with specified options
    this.turnstileService.render(host.id, { theme, size });
  }

  ngOnDestroy(): void {

  }
}
