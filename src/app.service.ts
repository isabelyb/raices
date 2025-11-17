import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>API Mitos y Leyendas</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            img {
              max-width: 400px;
              margin-bottom: 20px;
              border-radius: 10px;
              box-shadow: 0 10px 30px rgba(255,255,255,0.1);
            }
            h1 {
              margin: 10px 0;
              text-align: center;
            }
            h2 {
              margin: 5px 0;
              text-align: center;
              color: #cccccc;
            }
            p {
              font-size: 18px;
              margin: 10px 0;
            }
            a {
              color: #ffd700;
              text-decoration: none;
              font-weight: bold;
            }
            a:hover {
              text-decoration: underline;
            }
          </style>
        </head>
        <body>
          <img src="/logo.png" alt="Logo Raíces Ancestrales" />
          <h1>API Mitos y Leyendas</h1>
          <h2>Raíces Ancestrales</h2>
          <p>Preservando la cultura de Colombia</p>
          <p><a href="/api">📚 Ver documentación (Swagger)</a></p>
        </body>
      </html>
    `;
  }
}
