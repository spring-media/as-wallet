import { RequestForAttestation } from '@kiltprotocol/core';
import { ITerms } from '@kiltprotocol/types';

export interface ClaimInput extends ITerms {
  attester: string;
}

export type ClaimOutput = RequestForAttestation;