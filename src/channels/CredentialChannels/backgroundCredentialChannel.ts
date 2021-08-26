import { browser } from 'webextension-polyfill-ts';
import {
  IMessage,
  IPublicIdentity,
  IRejectTerms,
  IRequestAttestationForClaim,
  IRequestClaimsForCTypes,
  ISubmitAttestationForClaim,
  ISubmitClaimsForCTypes,
  ISubmitTerms,
  MessageBodyType,
} from '@kiltprotocol/types';
import Message from '@kiltprotocol/messaging';

import { BrowserChannel } from '../base/BrowserChannel/BrowserChannel';
import { CredentialInput, CredentialOutput } from './types';
import { contentCredentialChannel } from './contentCredentialChannel';
import { claimChannel } from '../claimChannel/claimChannel';
import { saveChannel } from '../saveChannel/saveChannel';
import { getAttestedClaims } from '../shareChannel/shareChannel';

export const backgroundCredentialChannel = new BrowserChannel<
  CredentialInput,
  CredentialOutput
>('credential');

type SenderType = Parameters<
  Parameters<typeof browser.runtime.onMessage.addListener>[0]
>[1];

async function processSubmitTerms(
  messageBody: ISubmitTerms,
  sporranIdentity: IPublicIdentity,
  dAppIdentity: IPublicIdentity,
  dAppName: string,
  sender: SenderType,
): Promise<IMessage> {
  try {
    const requestForAttestation = await claimChannel.get(
      {
        ...messageBody.content,
        attester: dAppName,
      },
      sender,
    );

    const requestForAttestationBody: IRequestAttestationForClaim = {
      content: { requestForAttestation },
      type: MessageBodyType.REQUEST_ATTESTATION_FOR_CLAIM,
    };
    const request = new Message(
      requestForAttestationBody,
      sporranIdentity,
      dAppIdentity,
    );
    return request;
  } catch (error) {
    const { claim, legitimations, delegationId } = messageBody.content;

    const rejectionBody: IRejectTerms = {
      content: { claim, legitimations, delegationId },
      type: MessageBodyType.REJECT_TERMS,
    };
    const rejection = new Message(rejectionBody, sporranIdentity, dAppIdentity);
    return rejection;
  }
}

async function processSubmitCredential(
  messageBody: ISubmitAttestationForClaim,
  sender: SenderType,
): Promise<void> {
  await saveChannel.get(messageBody.content.attestation, sender);
}

async function processShareCredential(
  messageBody: IRequestClaimsForCTypes,
  sporranIdentity: IPublicIdentity,
  dAppIdentity: IPublicIdentity,
  sender: SenderType,
): Promise<IMessage> {
  const attestedClaims = await getAttestedClaims(messageBody.content, sender);

  const credentialsBody: ISubmitClaimsForCTypes = {
    content: attestedClaims,
    type: MessageBodyType.SUBMIT_CLAIMS_FOR_CTYPES,
  };
  const request = new Message(credentialsBody, sporranIdentity, dAppIdentity);

  return request;
}

async function showCredentialPopup(
  input: CredentialInput,
  sender: SenderType,
): Promise<IMessage | void> {
  const { message, dAppName, dAppIdentity, sporranIdentity } = input;

  // TODO: errorCheckMessageBody(message.body);

  if (message.body.type === MessageBodyType.SUBMIT_TERMS) {
    return await processSubmitTerms(
      message.body as ISubmitTerms,
      sporranIdentity,
      dAppIdentity,
      dAppName,
      sender,
    );
  }
  if (message.body.type === MessageBodyType.SUBMIT_ATTESTATION_FOR_CLAIM) {
    await processSubmitCredential(
      message.body as ISubmitAttestationForClaim,
      sender,
    );
  }
  if (message.body.type === MessageBodyType.REQUEST_CLAIMS_FOR_CTYPES) {
    return await processShareCredential(
      message.body as IRequestClaimsForCTypes,
      sporranIdentity,
      dAppIdentity,
      sender,
    );
  }
}

export function initBackgroundCredentialChannel(): void {
  contentCredentialChannel.produce(showCredentialPopup);
}