export type Arguments<T> = [T] extends [(...args: infer U) => any]
  ? U
  : [T] extends [void]
  ? []
  : [T];

export interface TypedEmitter<Events> {
  on<E extends keyof Events>(event: E, listener: Events[E]): this;
  off<E extends keyof Events>(event: E, listener: Events[E]): this;
  emit<E extends keyof Events>(event: E, ...args: Arguments<Events[E]>): boolean;
}

export interface PeerEvents {
  error: (data: { name: string; error: Error }) => void;
  // Connection Status and RTCIceCandidates
  connecting: VoidFunction;
  connected: VoidFunction;
  negotiation: VoidFunction;
  disconnected: VoidFunction;
  status: (status: RTCIceConnectionState) => void;
  onicecandidates: (iceCandidates: RTCIceCandidate[]) => void;
  // MediaStream
  streamLocal: (stream: MediaStream) => void;
  streamRemote: (stream: MediaStream) => void;
  // RTCDataChannel
  channelClosed: (data: { channel: RTCDataChannel }) => void;
  channelError: (data: { channel: RTCDataChannel; error: RTCErrorEvent }) => void;
  channelData: (data: {
    channel: RTCDataChannel;
    source: 'incoming' | 'outgoing';
    data: string | Blob | ArrayBuffer | ArrayBufferView;
  }) => void;
}
