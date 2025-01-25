export interface IOptions {
  locale?: string;
  timezone?: string;
  offset?: string;
  value: Date | number;
}

export const format = (options: IOptions) => {
  return new Intl.DateTimeFormat(options?.locale ?? 'id-ID').format(options.value)
};
