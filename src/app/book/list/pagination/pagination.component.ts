import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() private totalPages: number; private page = 1; private perPage = 5;

  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  @Output() changePerPage: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
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
