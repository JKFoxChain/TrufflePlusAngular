import { Routes, RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { NgModule } from '@angular/core';
import { ItemsComponent } from './Items/items.component';

const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: 'welcome',
    //     pathMatch: 'full'
    // },
    {
        path: "welcome",
        component: WelcomeComponent
    },
    { 
        path: "items",
        component: ItemsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}