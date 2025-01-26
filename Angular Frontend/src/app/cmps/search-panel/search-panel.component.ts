import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Lang } from '../../models/book/book.model';
import { BooksService } from '../../services/books/books.service';
import { style } from '@angular/animations';

@Component({
  selector: 'search-panel',
  standalone: false,
  templateUrl: './search-panel.component.html',
  styleUrl: './search-panel.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SearchPanelComponent {
  searchFrom = new FormGroup({
    search: new FormControl(''),
    lang: new FormControl<Lang>('all'),
  });

  public searchOptions: { value: Lang; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'en', label: 'English' },
    { value: 'ru', label: 'Russian' },
    { value: 'es', label: 'Spanish' },
    { value: 'zh', label: 'Chinese' },
    { value: 'hi', label: 'Hindi' },
    { value: 'he', label: 'Hebrew' },
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private books: BooksService
  ) {
    this.matIconRegistry.addSvgIcon(
      'search',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/search-icon.svg')
    );
  }

  public onSubmit() {
    const { search, lang } = this.searchFrom.value;

    this.books.setFilter({
      search: search ?? undefined,
      lang: lang ?? undefined,
    });
  }
}
