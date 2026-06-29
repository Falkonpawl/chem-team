const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzvJpojyOfEJd6x0qM0l1vA885TZ5lr6zXYRxs64RfqqhQQFALrXhwZROmlG5jfXhJkQQ/exec';

export interface EmailData {
  name?: string;
  phone: string;
  question?: string;
  course?: string;
  format?: string;
  target_email: string;
}

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', // Важно для Google Script
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    // Из-за 'no-cors' мы не можем прочитать ответ сервера,
    // но если fetch не выкинул ошибку, значит данные ушли.
    return true;
  } catch (error) {
    console.error('Ошибка при отправке почты:', error);
    return false;
  }
};
