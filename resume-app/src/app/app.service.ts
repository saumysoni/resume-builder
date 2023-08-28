import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }

  loginUser(formData:any)
  {
    return formData;
  }
}
