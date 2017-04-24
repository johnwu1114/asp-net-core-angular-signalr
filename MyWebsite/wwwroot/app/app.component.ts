import { Component, ViewChild, ElementRef } from "@angular/core";
import { SignalRService, ConnectionStatus } from "./shared/services/signalr.service";

@Component({
    selector: "my-app",
    template: require("./app.component.html")
})
export class AppComponent {
    title = "Chat rooms";
    message: string;
    name: string;
    @ViewChild("records") records: ElementRef;

    constructor(private signalrService: SignalRService) {
        signalrService.start("chathub", true).subscribe(
            (connectionStatus: ConnectionStatus) => {
                console.log(`[signalr] start() - done - ${connectionStatus}`);
            },
            (error: any) => {
                console.log(`[signalr] start() - fail - ${error}`);
            });
        signalrService.error.subscribe((error: any) => {
            console.log(`[signalr] error - ${error}`);
        });
        signalrService.addEventListener("ServerMessage").subscribe(
            (message: string) => {
                this.records.nativeElement.innerHTML += `<p>${message}<p>`;
            });
    }

    send(): void {
        if (this.name && this.message) {
            this.signalrService.invoke("ClientMessage", { name: this.name, message: this.message });
        }
    }

    clear(): void {
        this.records.nativeElement.innerHTML = "";
    }
}