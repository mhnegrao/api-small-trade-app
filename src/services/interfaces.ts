export interface IServico {
  id?: number;
  idUser?: string;
  servico?: string;
  descricao?: string;
  cliente?: string;
  fone?: string;
  email?: string;
  dataSolicitacao?: Date;
  dataPrevista?: Date;
  valor?: number;
  observacao?: string;
  finalizado?: boolean;
  pago?: boolean;
  dataPagamento?: Date;
  tipoPagamento?: "Dinheiro" | "Débito" | "Crédito" | "PIX";
  completed_At?: Date;
  created_At?: Date;
}
export interface ILancamento {
  id?: number;
  idUser?: string;
  descricao?: string;
  dataLancamento?: Date;
  valor?: number;
  observacao?: string;
  tipoPlancamento?: "Débito" | "Crédito" | "Estorno";
  created_At?: Date;
  updated_At?: Date;
}

export interface IMensalidade {
  id?: number;
  idUser?: string;
  tipoServico?: string;
  dataVencimento?: Date;
  valorParcela?: number;
  created_At?: Date;
  updated_At?: Date;
}
export interface ITask {
  id?: number;
  idUser?: string;
  titulo?: string;
  descricao?: string;
  dataTarefa?: Date;
  prioridade?: string;
  completed?: boolean;
  completed_At?: Date;
  created_At?: Date;
}

export interface IUser {
  id?: string;
  email?: string;
  name?: string;
  password?: string;
  token?:string;
  tokenExpires?:string;
  created_At?: Date;
  update_At?: Date;
}
