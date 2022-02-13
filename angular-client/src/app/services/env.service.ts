import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvService {

  // The values that are defined here are the default values that can
  // be overridden by env.js

  public envoyHost = self.location.hostname;
  public envoyPort = '8090';
  public springHost = self.location.hostname;
  public springPort = '8080';

  constructor() { }
}
