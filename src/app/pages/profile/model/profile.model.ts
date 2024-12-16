/**
 * Profile model
 */
export interface ProfileModel {
  id: string,
  username: string,
  email: string,
  fullName?: string,
  dateOfBirth?: Date,
  address?: string,
  description?: string,
  phoneNumber?: string,
  profilePictureUrl?: string
}
