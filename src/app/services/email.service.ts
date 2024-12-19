import { Injectable } from '@angular/core';
import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private serviceId = 'service_8hzm0qx';
  private templateId = 'template_r3az5p6';
  private userId = 'kTaQ8VhU7S7PYWIdY';

  constructor() { }

  sendCredentials(toName: string, toEmail: string, userName: any, password: any): Promise<void> {
    const templateParams = {
      to_name: toName,
      to_email: toEmail,
      userName: userName,
      password: password,
    };

    return emailjs
      .send(this.serviceId, this.templateId, templateParams, this.userId)
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
          console.error('FAILED...', error);
        }
      );
  }
}