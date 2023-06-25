export class Administrator {
  private identifier: string;
  private email: string;
  private admin_name: string;
  private picture: string | null;

  constructor(
    email: string,
    admin_name: string,
    picture: string | null
  ) {
    this.identifier = this.generateIdentifier(email, admin_name);
    this.email = email;
    this.admin_name = admin_name;
    this.picture = picture;
  }

  // email + admin_name to base64
  generateIdentifier(email: string, admin_name: string): string {
    return btoa(email + admin_name);
  }
}
