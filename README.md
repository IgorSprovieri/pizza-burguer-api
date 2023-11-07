# Whatsapp API

This api is a simple solution to create chatbot's using whatsapp

## Live Application

```bash
https://api.wpp.ispapps.com
```

## Features

- Create a webhook to intercept messages
- Send messages to everyone

## Used Technologies

- Node
- Express
- Typescript
- Whatsapp-web.js
- Qrcode Terminal
- Yup

## Getting Started

1- Clone the repo:

```bash
git clone https://github.com/IgorSprovieri/whatsapp-api.git
```

2- Install dependencies:

```bash
cd whatsapp-api
npm install
```

3- Create a .env to config your webhook:

```bash
WEBHOOK_URL=http:yourwebhook.com
```

4- Run the project on dev mode:

```bash
npm run dev
```

5- Scan Qr code with your phone:

## Docs

- To send message use /send POST route:

```json
{
  "username": "1100123456789@c.us",
  "message": "Hello"
}
```

- In webhook you will receive a body like this:

```json
{
  "username": "1100123456789@c.us",
  "message": "Hello"
}
```

## Author

<img src="https://avatars.githubusercontent.com/u/72152106?v=4" alt="Igor Sprovieri" style="width: 30%; border-radius: 50px;"/>

### _Igor Sprovieri_

---

After working as a Unity developer for 3 years, I migrated to the web development area and currently have Fullstack and Mobile knowledge with React, React Native and Node.
