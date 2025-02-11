import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-thank-you-note',
  standalone: false,

  templateUrl: './thank-you-note.component.html',
  styleUrl: './thank-you-note.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('1s ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ThankYouNoteComponent {
  showThankYou = true;

ngOnInit(): void {
  setTimeout(() => {
    this.showThankYou = false;
  }, 2000);
}


}
