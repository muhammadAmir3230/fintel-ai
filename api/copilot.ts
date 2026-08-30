import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { query, finance, history = [] } = req.body || {};
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const systemInstruction =
      `You are Fintel Copilot, a friendly AI finance assistant for a Malaysian small business owner ` +
      `who is NOT technical. Answer in clear, simple, encouraging language. Currency is RM. ` +
      `Tax is SST (services 6%). Use ONLY the figures below — never invent numbers. If the data ` +
      `can't answer, say what info you'd need. Keep answers short (2–5 sentences).\n\n` +
      `CURRENT BUSINESS DATA:\n${JSON.stringify(finance, null, 2)}`;

    const contents = [
      ...history.map((m: any) => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: String(m.text || '') }],
      })),
      { role: 'user', parts: [{ text: String(query || '') }] },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents,
      config: { systemInstruction },
    });

    return res.status(200).json({ reply: response.text });
  } catch (e: any) {
    console.error('copilot error', e);
    return res.status(500).json({ error: e?.message || 'AI request failed' });
  }
}