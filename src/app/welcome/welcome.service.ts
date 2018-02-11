import { Injectable } from '@angular/core';


@Injectable()
export class WelcomeService {

    private welcomeText: string;
    
    public getWelcomeText() {
        if(this.welcomeText != undefined){
            return this.welcomeText;
        }else{
            return 'welcomeText does not set';
        }
    }
}

