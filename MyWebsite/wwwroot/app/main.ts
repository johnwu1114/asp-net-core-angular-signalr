import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { SignalRService } from "./shared/services/signalr.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        SignalRService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);