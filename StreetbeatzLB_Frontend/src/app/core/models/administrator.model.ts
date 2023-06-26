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
    this.identifier = this.toBase64URL(email);
    this.email = email;
    this.admin_name = admin_name;
    this.picture = picture;
  }

  toBase64URL(text: string): string {
    let base64 = btoa(text);
    base64 = base64.replace(/\+/g, '-');
    base64 = base64.replace(/\//g, '_');
    base64 = base64.replace(/=+$/, '');
    return base64;
  }
}
