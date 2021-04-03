export interface ITransactionLogMessageFormProps {
  type: string;
  message: string;
  portfolioId: number;
}

export interface ITransactionLogMessage extends ITransactionLogMessageFormProps {
  id: string;
  creationDate: string;
}
