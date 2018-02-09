import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome.component';
import { WelcomeService } from './welcome.service';
@NgModule({
    declarations: [
      WelcomeComponent,
    ],
    providers: [
        WelcomeService
    ]
})

export class WelcomeModule { }