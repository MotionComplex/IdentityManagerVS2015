import { Scope } from './scope';
import { Claim } from '../claims/claim';

export const SCOPES = [
    new Scope('1', 'Scope1', 'Scope 1', 'Resource', false, new Array<Claim>()),
    new Scope('2', 'Scope2', 'Scope 2', 'Identity', false, new Array<Claim>()),
    new Scope('3', 'Scope3', 'Scope 3', 'Resource', false, new Array<Claim>()),
    new Scope('4', 'Scope4', 'Scope 4', 'Identity', false, new Array<Claim>()),
    new Scope('5', 'Scope5', 'Scope 5', 'Resource', true, new Array<Claim>()),
    new Scope('6', 'Scope6', 'Scope 6', 'Resource', false, new Array<Claim>()),
    new Scope('7', 'Scope7', 'Scope 7', 'Identity', true, new Array<Claim>()),
    new Scope('8', 'Scope8', 'Scope 8', 'Identity', false, new Array<Claim>()),
    new Scope('9', 'Scope9', 'Scope 9', 'Resource', false, new Array<Claim>()),
    new Scope('10', 'Scope10', 'Scope 10', 'Resource', true, new Array<Claim>())
]