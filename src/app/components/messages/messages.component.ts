import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
    public messages: string[] = [];

    constructor(public messageService: MessageService) {}

    public ngOnInit(): void {
        this.messages = this.messageService.messages;
    }

    public clearMessages(): void {
        this.messages = this.messageService.clear();
    }
}
