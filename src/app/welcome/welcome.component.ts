import { Component } from '@angular/core';
import { WelcomeService } from './welcome.service';

@Component({
    moduleId: module.id,
    selector: "Welcome",
    templateUrl: "./welcome.component.html",
    styleUrls: ["./welcome.component.css"]
})

export class WelcomeComponent {
    constructor(private welcomeService: WelcomeService){}

    private display: string = "welcome";

    private getText(){
        return this.welcomeService.getWelcomeText();
    }
}