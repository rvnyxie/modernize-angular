/**
 * User registration model
 */
export interface UserRegistrationModel {
  userName: string,
  email: string,
  password: string,
  fullName: string,
  dateOfBirth: Date | null,
  address: string | null,
  description: string | null,
  phoneNumber: string | null,
}
