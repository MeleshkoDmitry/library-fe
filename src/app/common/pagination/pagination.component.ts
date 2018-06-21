import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { isNumber } from 'util';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {
  totalPages: number;

  @Input() page: number;
  @Input() pageSize: number;
  @Input() totalRecords: number;

  @Output() pageEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.page);
    if (changes.totalRecords) {
      this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  next(): void {
    this.page++;
    this.pageEvent.emit({ page: this.page, pageSize: this.pageSize });
  }

  prev(): void {
    this.page--;
    this.pageEvent.emit({ page: this.page--, pageSize: this.pageSize });
  }

  changeValue(event): void {
    isNumber(+event.target.value) ? this.pageSize = +event.target.value : this.pageSize = 5;
    this.page = 1;
    this.pageEvent.emit({ page: this.page, pageSize: this.pageSize });
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }
}
