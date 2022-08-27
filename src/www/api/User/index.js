import { usePlug } from '@hooks';
import { Config } from '@config';
import API from '@api';
import Axios from 'axios';
import { stringToSlug, randomStr } from '@utils';
import { Principal } from '@dfinity/principal';

const { actor } = usePlug();

export const User = {
    get: async (principalId) => {
        let hero = await actor;

        return await hero.getUserInfo(Principal.fromText(principalId));
    }
}