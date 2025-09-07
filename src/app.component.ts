import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { ScriptService } from './services/script.service';
import { ScriptCardComponent } from './components/script-card/script-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScriptCardComponent],
})
export class AppComponent {
  private scriptService = inject(ScriptService);
  private allScripts = this.scriptService.getScripts();

  searchQuery = signal('');

  scripts = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) {
      return this.allScripts();
    }
    return this.allScripts().filter(script => 
      script.title.toLowerCase().includes(query) ||
      script.description.toLowerCase().includes(query)
    );
  });

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }
}