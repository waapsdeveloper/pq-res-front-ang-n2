import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ThankYouNoteComponent } from './thank-you-note.component';

const routes: Routes = [
  {
    path: '',
    component: ThankYouNoteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThankYouNoteRoutingModule {}
