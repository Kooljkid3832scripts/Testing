import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { Script } from '../../models/script.model';

@Component({
  selector: 'app-script-card',
  template: `
    <div class="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-6 flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1">
      <div class="flex-grow">
        <h3 class="text-xl font-bold text-cyan-400 mb-2">{{ script().title }}</h3>
        <p class="text-gray-400 text-sm mb-4">{{ script().description }}</p>

        @if (script().sourceUrl) {
          <div class="mb-4">
            <p class="text-xs text-gray-500 uppercase font-bold mb-1">Source</p>
            <a [href]="script().sourceUrl" target="_blank" rel="noopener noreferrer" class="flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors break-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
              <span>{{ script().sourceUrl }}</span>
            </a>
          </div>
        }
      </div>

      <div class="mt-4">
        <div class="relative bg-gray-900 rounded-md">
          <button 
            (click)="copyToClipboard()"
            class="absolute top-2 right-2 p-1.5 rounded-md text-gray-400 transition-colors"
            [class]="copied() ? 'bg-green-600 text-white' : 'bg-gray-700 hover:bg-gray-600 hover:text-white'"
            aria-label="Copy code">
            @if (copied()) {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            } @else {
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
              </svg>
            }
          </button>
          <pre class="p-4 pt-10 text-sm text-gray-300 font-mono overflow-x-auto whitespace-pre-wrap break-words"><code class="language-lua">{{ script().code }}</code></pre>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScriptCardComponent {
  script = input.required<Script>();
  copied = signal(false);

  copyToClipboard(): void {
    if (!this.script()) return;
    navigator.clipboard.writeText(this.script().code).then(() => {
      this.copied.set(true);
      setTimeout(() => {
        this.copied.set(false);
      }, 2500);
    }).catch(err => {
      console.error('Failed to copy script to clipboard: ', err);
      // Optionally, provide user feedback on error
    });
  }
}