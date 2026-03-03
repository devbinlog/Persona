/**
 * In-memory SSE pub/sub bus for Fan Lounge.
 * Server restart = in-memory state lost (use DB for persistence).
 */

export interface LoungeMessage {
  id: string;
  content: string;
  authorNickname: string;
  authorUserId?: string;
  createdAt: string;
  cardPreview?: {
    cardId: string;
    type: string;
    shortLore: string;
  };
}

type Subscriber = (msg: LoungeMessage) => void;

class SSEBus {
  private subscribers: Set<Subscriber> = new Set();

  subscribe(callback: Subscriber): () => void {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  publish(message: LoungeMessage): void {
    this.subscribers.forEach((cb) => {
      try {
        cb(message);
      } catch {
        // Subscriber error — remove it
        this.subscribers.delete(cb);
      }
    });
  }

  get subscriberCount(): number {
    return this.subscribers.size;
  }
}

// Singleton — shared across all route handlers in the same Node.js process
const globalForSSE = globalThis as unknown as { sseBus: SSEBus | undefined };
export const sseBus = globalForSSE.sseBus ?? new SSEBus();
if (process.env.NODE_ENV !== "production") globalForSSE.sseBus = sseBus;
