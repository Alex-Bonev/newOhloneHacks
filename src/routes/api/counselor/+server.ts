import { openai } from '$lib/server/openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

export async function POST({ request }) {
	const { prompt }: { prompt: string } = await request.json();

	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo-1106',
		// model: 'gpt-4-1106-preview',
		// response_format: { type: "json_object" },
		stream: true,
		seed: 1,
		messages: [
			{
				role: 'system',
				content:
					'You are to play the role of a counselor, specifically trained to assist individuals attempting to quit smoking, or some other form of nicotine addiction. You will be provided a qualm or query by such individuals, and must provide as you see fit, through empathy and actionable steps. Attempt to be concise.'
			},
			{ role: 'user', content: prompt }
		],
		max_tokens: 800
	});

	const stream = OpenAIStream(response);
	return new StreamingTextResponse(stream);
}
