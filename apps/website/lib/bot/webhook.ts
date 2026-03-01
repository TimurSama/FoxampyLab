// Утилиты для настройки webhook

export interface WebhookConfig {
  token: string;
  webhookUrl: string;
  secretToken?: string;
}

/**
 * Устанавливает webhook для Telegram бота
 */
export async function setWebhook(config: WebhookConfig): Promise<boolean> {
  const { token, webhookUrl, secretToken } = config;

  try {
    const url = `https://api.telegram.org/bot${token}/setWebhook`;
    const body: any = { url: webhookUrl };
    
    if (secretToken) {
      body.secret_token = secretToken;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (data.ok) {
      console.log('✅ Webhook установлен успешно:', webhookUrl);
      return true;
    } else {
      console.error('❌ Ошибка установки webhook:', data.description);
      return false;
    }
  } catch (error) {
    console.error('❌ Ошибка при установке webhook:', error);
    return false;
  }
}

/**
 * Удаляет webhook для Telegram бота
 */
export async function deleteWebhook(token: string): Promise<boolean> {
  try {
    const url = `https://api.telegram.org/bot${token}/deleteWebhook`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ drop_pending_updates: true }),
    });

    const data = await response.json();

    if (data.ok) {
      console.log('✅ Webhook удален успешно');
      return true;
    } else {
      console.error('❌ Ошибка удаления webhook:', data.description);
      return false;
    }
  } catch (error) {
    console.error('❌ Ошибка при удалении webhook:', error);
    return false;
  }
}

/**
 * Получает информацию о текущем webhook
 */
export async function getWebhookInfo(token: string): Promise<any> {
  try {
    const url = `https://api.telegram.org/bot${token}/getWebhookInfo`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.ok) {
      return data.result;
    } else {
      console.error('❌ Ошибка получения информации о webhook:', data.description);
      return null;
    }
  } catch (error) {
    console.error('❌ Ошибка при получении информации о webhook:', error);
    return null;
  }
}
