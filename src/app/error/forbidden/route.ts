import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';


export async function GET() {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>403 - Forbidden</title>
      <meta charset="utf-8" />
    </head>
    <body>
      <h1>403 - 접근이 금지되었습니다</h1>
      <p>이 페이지에 접근할 권한이 없습니다.</p>
    </body>
    </html>
  `;
  
  return new NextResponse(html, {
    status: StatusCodes.FORBIDDEN,
    headers: {
      'Content-Type': 'text/html',
    },
  });
}