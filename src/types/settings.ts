export interface ISettingsForm {
  databasePath: string;
  language: string;
}

export interface ISettings extends ISettingsForm {
  selectedPortfolio: string;
  collapsed: boolean;
  defaultCompanyDisplayMode: string;
}
