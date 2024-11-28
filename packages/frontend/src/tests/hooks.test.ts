import { describe, it, expect, vi } from 'vitest';
import { preflightOptions } from '../hooks.server';

describe('preflightOptions', () => {
	it('should return 200 OK for OPTIONS requests', async () => {
		// Mock event object for OPTIONS request.
		const mockEvent = {
			request: {
				method: 'OPTIONS'
			}
		} as any; // Cast as any to mock event shape

		// Mock the resolve function.
		const mockResolve = vi.fn();

		// Call the function.
		const response = await preflightOptions({ event: mockEvent, resolve: mockResolve });

		expect(response.status).toBe(200); // Ensure status is 200.
		expect(mockResolve).not.toHaveBeenCalled(); // Ensure resolve was not called.
	});

	it('should call resolve for non-OPTIONS requests', async () => {
		// Mock event object for a GET request.
		const mockEvent = {
			request: {
				method: 'GET'
			}
		} as any;

		// Mock resolve function.
		const mockResolve = vi.fn().mockResolvedValue(new Response('Resolved'));

		// Call the function.
		const response = await preflightOptions({ event: mockEvent, resolve: mockResolve });

		expect(mockResolve).toHaveBeenCalled(); // Ensure resolve was called.
		expect(response).toBeInstanceOf(Response); // Ensure a Response is returned.
	});
});
