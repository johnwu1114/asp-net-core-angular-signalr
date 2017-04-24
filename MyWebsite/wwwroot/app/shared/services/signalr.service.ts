import { Injectable, Inject } from "@angular/core";
import { Subject, Observable } from "rxjs";

declare var $: any;

export enum ConnectionStatus {
    Connected = 1,
    Disconnected = 2,
    Error = 3
}

@Injectable()
export class SignalRService {
    private hubConnection: any;
    private hubProxy: any;
    error: Observable<any>;

    constructor() {
        if ($ === undefined || $.hubConnection === undefined) {
            throw new Error("The '$' or the '$.hubConnection' are not defined...");
        }
        this.hubConnection = $.hubConnection();
        this.hubConnection.url = `//${window.location.host}/signalr`;
    }

    start(hubName: string, debug: boolean = false): Observable<ConnectionStatus> {
        this.hubConnection.logging = debug;
        this.hubProxy = this.hubConnection.createHubProxy(hubName);

        let errorSubject = new Subject<any>();
        this.error = errorSubject.asObservable();
        this.hubConnection.error((error: any) => errorSubject.next(error));

        let subject = new Subject<ConnectionStatus>();
        let observer = subject.asObservable();
        this.hubConnection.start()
            .done(() => subject.next(ConnectionStatus.Connected))
            .fail((error: any) => subject.error(error));
        return observer;
    }

    addEventListener(eventName: string): Observable<any> {
        let subject = new Subject<any>();
        let observer = subject.asObservable();
        this.hubProxy.on(eventName, (data: any) => subject.next(data));
        return observer;
    }

    invoke(eventName: string, data: any): void {
        this.hubProxy.invoke(eventName, data);
    }
}