export class Editor {
  id: string
  name: string
  mail: string
  phone: string

  constructor(id: string, name: string, mail: string, phone: string) {
    this.id = id
    this.name = name
    this.mail = mail
    this.phone = phone
  }

  static fromJSON(json: any) {
    return new Editor(json.id, json.name, json.mail, json.phone)
  }
}
