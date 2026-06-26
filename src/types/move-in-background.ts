export type MoveInBackground = {
  college: string;
  workplace: string;
  isSelfEmployed: boolean;
  workEmail: string;
  workEmailVerified: boolean;
};

export const EMPTY_MOVE_IN_BACKGROUND: MoveInBackground = {
  college: '',
  workplace: '',
  isSelfEmployed: false,
  workEmail: '',
  workEmailVerified: false,
};
