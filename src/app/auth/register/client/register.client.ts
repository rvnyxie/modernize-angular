import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { UserRegistrationModel } from "../model/user-registration.model";

@Injectable({
  providedIn: 'root',
})
/**
 * Registration client
 */
export class RegisterClient {
  private readonly registerApiUrl = "https://localhost:7003/auth/register";

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Register new user
   * @param userRegistration User registration information
   */
  register(userRegistration: UserRegistrationModel) {
    return  this.httpClient.post(this.registerApiUrl, userRegistration);
  }
}
