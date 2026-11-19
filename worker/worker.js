// İ'râb Motoru için Cloudflare Worker vekili.
// Gemini anahtarı burada (Secret olarak) saklanır; ziyaretçi anahtar girmez.
// Gerekli Secret: GEMINI_API_KEY

const ALLOWED_ORIGIN = 'https://tumerkancimen.github.io';
const MODELS = {
  quick: 'gemini-3.5-flash-lite',
  default: 'gemini-3.5-flash',
  complex: 'gemini-3.1-pro-preview'
};
const MAX_PROMPT_CHARS = 8000;

function cors(origin) {
  return {
    'access-control-allow-origin': origin,
    'access-control-allow-methods': 'POST, OPTIONS',
    'access-control-allow-headers': 'content-type',
    'vary': 'origin'
  };
}

function json(obj, status, origin) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json', ...cors(origin) }
  });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('origin') || '';
    const okOrigin = origin === ALLOWED_ORIGIN;

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: okOrigin ? 204 : 403, headers: okOrigin ? cors(origin) : {} });
    }
    if (!okOrigin) return json({ error: { message: 'İzin verilmeyen kaynak.' } }, 403, ALLOWED_ORIGIN);
    if (request.method !== 'POST') return json({ error: { message: 'Yalnızca POST.' } }, 405, origin);
    if (!env.GEMINI_API_KEY) return json({ error: { message: 'Sunucuda GEMINI_API_KEY tanımlı değil.' } }, 500, origin);

    let body;
    try { body = await request.json(); } catch (_) { return json({ error: { message: 'Geçersiz istek.' } }, 400, origin); }

    const prompt = typeof body.prompt === 'string' ? body.prompt : '';
    if (!prompt || prompt.length > MAX_PROMPT_CHARS) {
      return json({ error: { message: 'Metin boş ya da çok uzun.' } }, 400, origin);
    }
    const model = MODELS[body.tier] || MODELS.default;

    const gen = { maxOutputTokens: 8192, responseMimeType: 'application/json' };
    if (model === 'gemini-3.5-flash') gen.thinkingConfig = { thinkingLevel: 'minimal' };

    const upstream = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/' + model + ':generateContent?key=' + encodeURIComponent(env.GEMINI_API_KEY),
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: gen })
      }
    );
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { 'content-type': 'application/json', ...cors(origin) }
    });
  }
};
