import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public logs: string[] = []

  log(message: string) {
    this.logs.push(message)
  }

  clear() {
    this.logs = []
  }

  constructor() { }
}
