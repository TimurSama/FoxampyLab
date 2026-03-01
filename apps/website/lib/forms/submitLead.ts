import { TelegramService, type LeadPayload } from '@/lib/telegram';

export async function submitLead(payload: LeadPayload): Promise<{ ok: boolean; usedFallback: boolean }> {
  try {
    const response = await fetch('/api/telegram/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error('Telegram send failed');
    }

    return { ok: true, usedFallback: false };
  } catch (error) {
    // Fallback: open bot with prefilled message
    let message = '';
    if (payload.type === 'consultation') {
      message = TelegramService.formatConsultationMessage(payload.data);
    } else if (payload.type === 'services') {
      message = TelegramService.formatServiceRequestMessage(payload.data);
    } else {
      message = TelegramService.formatContactMessage(payload.data);
    }

    const telegramUrl = TelegramService.getBotUrlWithMessage(message);
    if (typeof window !== 'undefined') {
      window.open(telegramUrl, '_blank');
    }

    return { ok: false, usedFallback: true };
  }
}
