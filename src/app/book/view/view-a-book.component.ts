import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-view-a-book',
  templateUrl: './view-a-book.component.html',
  styleUrls: ['./view-a-book.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ViewABookComponent {
  @Input() book: Book;
  @Output() moveBack: EventEmitter<any> = new EventEmitter<any>();
}
