import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThankYouNoteRoutingModule } from './thank-you-note-routing.module';
import { ThankYouNoteComponent } from './thank-you-note.component';


@NgModule({
  declarations: [
    ThankYouNoteComponent
  ],
  imports: [
    CommonModule,
    ThankYouNoteRoutingModule
  ]
})
export class ThankYouNoteModule { }
