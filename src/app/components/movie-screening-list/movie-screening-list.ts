import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-screening-list',
  imports: [RouterLink],
  templateUrl: './movie-screening-list.html',
  styleUrl: './movie-screening-list.scss',
})
export class MovieScreeningList {
  @Input() movieList: Movie[] = [];
  @Input() loading: boolean = true;
  @Input() error: string | null = null;

  trackById(_: number, m: Movie) {
    return m.id;
  }

  onScreeningsKeydown(ev: KeyboardEvent) {
    const container = ev.currentTarget as HTMLElement | null;
    if (!container) return;
    const items = Array.from(container.querySelectorAll('.screening-item')) as HTMLElement[];
    if (!items || items.length === 0) return;

    let idx = Number(container.dataset['activeIndex'] || 0);
    const key = ev.key;
    if (key === 'ArrowRight' || key === 'ArrowDown') {
      ev.preventDefault();
      idx = Math.min(items.length - 1, idx + 1);
    } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
      ev.preventDefault();
      idx = Math.max(0, idx - 1);
    } else if (key === 'Enter' || key === ' ') {
      ev.preventDefault();
      const btn = items[idx];
      if (btn) btn.click();
      return;
    } else {
      return;
    }

    // update active index and visual state
    container.dataset['activeIndex'] = String(idx);
    items.forEach((b, i) => b.classList.toggle('keyboard-focused', i === idx));
    const active = items[idx];
    try { active?.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' } as any); } catch {}
  }
}
