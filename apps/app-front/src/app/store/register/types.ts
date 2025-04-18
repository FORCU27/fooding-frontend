export type WaitingRegisterData = {
  terms: {
    service: boolean;
    privacy: boolean;
    privacy2: boolean;
    marketing: boolean;
  };
  members: {
    adult: number;
    child: number;
    childChair: number;
  };
  name: string;
};

export type UpdateWaitingRegisterData = <K extends keyof WaitingRegisterData>(
  key: K,
  value: WaitingRegisterData[K],
) => void;
