import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.WAKATIME_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Missing WAKATIME_API_KEY' }, { status: 500 });
  }

  const base64Key = Buffer.from(apiKey).toString('base64');

  try {
    const res = await fetch('https://wakatime.com/api/v1/users/current/stats/last_7_days', {
      headers: {
        'Authorization': `Basic ${base64Key}`
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      throw new Error(`WakaTime API error: ${res.statusText}`);
    }

    const data = await res.json();
    return NextResponse.json({
      total_time: data.data.human_readable_total_including_other_language,
      daily_average: data.data.human_readable_daily_average_including_other_language,
      best_day: data.data.best_day ? {
        date: data.data.best_day.date,
        text: data.data.best_day.text
      } : null,
      languages: data.data.languages.slice(0, 3).map((l: any) => ({
        name: l.name,
        text: l.text,
        percent: l.percent
      })),
      editors: data.data.editors.slice(0, 3).map((e: any) => ({
        name: e.name,
        text: e.text,
        percent: e.percent
      })),
      categories: data.data.categories.slice(0, 3).map((c: any) => ({
        name: c.name,
        text: c.text,
        percent: c.percent
      }))
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
