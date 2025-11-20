import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getTokenFromRequest } from './auth';

export async function authenticateRequest(request: NextRequest): Promise<{ userId: number; username: string } | null> {
  // Try to get token from Authorization header first
  let token = getTokenFromRequest(request);
  
  // If not in header, try to get from cookies
  if (!token) {
    token = request.cookies.get('token')?.value || null;
  }
  
  if (!token) {
    return null;
  }

  const payload = verifyToken(token);
  return payload;
}

export function createAuthResponse(message: string, status: number = 401): NextResponse {
  return NextResponse.json({ error: message }, { status });
}

