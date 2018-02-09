//angular modules modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

//custom modules
import { AppRoutingModule } from './app-routing.module';

//Componenets
import { AppComponent } from './app.component';

// import { WelcomeComponent } from './welcome/welcome.component';
import { WelcomeModule } from './welcome/welcome.module';
import { ItemsComponent } from './Items/items.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent
    // WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    WelcomeModule,
    HttpModule
    // RouterModule is to provide component <router-outlet></router-outlet>
    // and a directive routerLink. 
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
