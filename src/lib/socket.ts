import { io, Socket } from "socket.io-client";
import { toast } from "sonner";

class SocketService {
  public socket: Socket | null = null;

  public connect(url: string, userToken: string): void {
    if (!this.socket) {
      this.socket = io(url, {
        query: {
          userToken,
        },
      });
      this.setupListeners();
    }
  }

  private setupListeners(): void {
    if (!this.socket) return;

    this.socket.on("connect", () => {
      toast.success("Connected to socket server");
    });

    this.socket.on("disconnect", () => {
      toast.success("Disconnected from socket server");
    });
  }

  public getInstance() {
    return this.socket;
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new SocketService();
