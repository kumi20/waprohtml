import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

const SERVER_URL = 'http://localhost:3000/subscription'
const SEND_NOTIFICATION_URL = 'http://localhost:3000/sendNotification/'

@Injectable()
export class PushNotificationService {
  constructor(private http: HttpClient) {}

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    return this.http.post(SERVER_URL, subscription)
  }
  
  public sendNotification(){
    return this.http.post(SEND_NOTIFICATION_URL,{})
  }
}