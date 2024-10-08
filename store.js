import { atom } from 'jotai';
import api from './services/api';

export const userAtom = atom('');

export const appointmentAtom = atom((async () => {
    const res = await api.get('/appointments');
    return res.data;
})());

export const profileAtom = atom('');
export const serviceAtom = atom('');
export const dateTimeAtom = atom([new Date(), '']); 
export const customerAtom = atom('');
export const customerNoLoginAtom = atom({
    email: '',
    name: '',
    phone: '',
    address: ''
});
export const servicesListAtom = atom((async () => {
    const res = await api.get('/services');
    return res.data;
})());