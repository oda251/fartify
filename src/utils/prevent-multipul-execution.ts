interface MultipleExecutionPreventer {
  exec: <T extends Event>(
    callback: (e?: T) => Promise<void>,
    e?: T
  ) => Promise<void>;
}

export class MEPByAnimationFrame implements MultipleExecutionPreventer {
  private animationFrameId: number | null = null;
  exec = async <T extends Event>(callback: (e?: T) => Promise<void>, e?: T) => {
    if (this.animationFrameId !== null) return;
    await new Promise<void>((resolve) => {
      this.animationFrameId = requestAnimationFrame(async () => {
        try {
          await callback(e);
        } finally {
          this.animationFrameId = null;
          resolve();
        }
      });
    });
  };
}

export class MEPByTime implements MultipleExecutionPreventer {
  private lastExecutedAt = 0;
  private readonly interval: number;
  constructor(interval: number) {
    this.interval = interval;
  }
  exec = async <T extends Event>(callback: (e?: T) => Promise<void>, e?: T) => {
    const now = Date.now();
    if (now - this.lastExecutedAt < this.interval) return;
    this.lastExecutedAt = now;
    await callback(e);
  };
}
