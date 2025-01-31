import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Lang, SearchFilter } from '../../models/book/book.model';
import { BooksService } from '../../services/books/books.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'search-panel',
  standalone: false,
  templateUrl: './search-panel.component.html',
  styleUrl: './search-panel.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SearchPanelComponent implements OnInit {
  @Input() onSetFilter?: (params: Partial<SearchFilter>) => void;
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
    private books: BooksService,
    private router: Router,
    private route: ActivatedRoute,
    private loadingService: LoadingService
  ) {
    this.matIconRegistry.addSvgIcon(
      'search',
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/search-icon.svg')
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['search']) {
        this.searchFrom.get('search')?.setValue(params['search']);
      }
      if (params['lang']) {
        this.searchFrom.get('lang')?.setValue(params['lang']);
      }

      if (this.onSetFilter) {
        this.onSetFilter(params);
      } else {
        this.books.setFilter(params);
      }
    });
  }

  public onSubmit = () => {
    const queryParams = Object.entries(this.searchFrom.value).reduce(
      (params, [key, value]) =>
        key === 'search' || value ? { ...params, [key]: value } : params,
      {}
    );

    // Set query params in the URL
    this.router.navigate([], {
      queryParams: queryParams,
      queryParamsHandling: 'merge', // This ensures other query params are preserved
    });
    // If needed, pass the params to setFilter
    if (this.onSetFilter) {
      this.onSetFilter(queryParams);
    } else {
      this.books.setFilter(queryParams);
    }
  };
}
