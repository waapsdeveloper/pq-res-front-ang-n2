import { Component } from '@angular/core';

@Component({
  selector: 'app-thank-you-note',
  standalone: false,

  templateUrl: './thank-you-note.component.html',
  styleUrl: './thank-you-note.component.scss'
})
export class ThankYouNoteComponent {
  showThankYou: boolean = false;

  tryItNow() {
    this.showThankYou = true;
}
}
