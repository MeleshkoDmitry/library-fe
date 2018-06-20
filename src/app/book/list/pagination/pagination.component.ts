import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  private page = 1;
  @Input() private totalPages: number;
  @Input() private perPage: number;

  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  @Output() changePerPage: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.perPage) {
      if (changes.perPage.currentValue !== changes.perPage.previousValue) {
        this.resetPage();
      }
    }
  }

  resetPage() {
    this.page = 1;
  }

  editPerPage() {
    this.changePerPage.emit(this.perPage);
  }

  next() {
    this.editPerPage();
    this.changePage.emit(this.page++);
  }

  prev() {
    this.editPerPage();
    this.changePage.emit(this.page--);
  }

}
