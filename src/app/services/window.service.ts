import { Injectable, Inject } from '@angular/core';
import { WINDOW } from '../providers/window.providers';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor(@Inject(WINDOW) private window: Window) { }

  getOrigin(): string {
    return `${this.getProtocol()}//${this.getHostname()}:${this.getPort()}`;
  }

  getHostname(): string {
    return this.window.location.hostname;
  }

  getProtocol(): string {
    return this.window.location.protocol;
  }

  getPort(): string {
    return this.window.location.port;
  }
}
