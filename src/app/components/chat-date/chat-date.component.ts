import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-chat-date',
  template: `
    <div class="d-flex justify-content-center">
      <button class="btn btn-secondary mt-2" disabled>
        {{ date | dateFormat:'dateShort'}}
      </button>
    </div>
  `,
})
export class ChatDateComponent implements OnInit {
  @Input() date: Date;
  constructor() { }

  ngOnInit() {
  }

}
