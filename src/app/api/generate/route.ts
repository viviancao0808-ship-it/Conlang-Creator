import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Gemini API key not set.' }, { status: 500 });
  }

  try {
  const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=' + apiKey, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      }),
    });
    const data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
      return NextResponse.json({ result: data.candidates[0].content.parts[0].text });
    } else if (data.error) {
      return NextResponse.json({ error: data.error.message || 'Gemini error.' }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'No result from Gemini.' }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: 'Error contacting Gemini.' }, { status: 500 });
  }
}
