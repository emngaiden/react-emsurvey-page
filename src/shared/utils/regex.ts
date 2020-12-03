export const BLANK_SPACES_ONLY = /\s+/g;
export const EMAIL = /^([0-9]|[a-z]|[\-_])+@([0-9]|[a-z]|[\-_])+.([0-9]|[a-z]|[\-_])+(.([0-9]|[a-z])+)+$/gi;
export const PASSWORD = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{1,})\S$/gs