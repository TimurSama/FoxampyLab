import { NextRequest, NextResponse } from 'next/server';
import { TelegramService } from '@/lib/telegram';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    if (!payload?.type || !payload?.data) {
      return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
    }

    if (payload.type === 'consultation') {
      await TelegramService.sendConsultationRequest(payload.data);
    } else if (payload.type === 'services') {
      await TelegramService.sendServiceRequest(payload.data);
    } else if (payload.type === 'contact') {
      await TelegramService.sendContactMessage(payload.data);
    } else {
      return NextResponse.json({ ok: false, error: 'Unknown payload type' }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Telegram send API error:', error);
    return NextResponse.json({ ok: false, error: 'Send failed' }, { status: 500 });
  }
}
