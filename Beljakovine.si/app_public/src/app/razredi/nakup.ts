import { Kupon } from './kupon';
import { Uporabnik } from './uporabnik';
import { Izdelki } from './izdelki';

export class Nakup {
	_id: string;
	datum: string;
	kupon: Kupon;
	uporabnik: Uporabnik;
	izdelki: Izdelki[];
	skupnaCena: number;
}
