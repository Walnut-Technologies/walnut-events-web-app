import { Component } from '@angular/core';

@Component({
  selector: 'app-venues',
  imports: [],
  templateUrl: './venues.component.html',
  styleUrl: './venues.component.scss'
})
export class VenuesComponent {
  venues = [
    { name: 'Arboleda Susurrante', address: 'Patricio Sáinz 14, Col. Del Valle', capacity: '10-50', agency: 'Agencia Devon', contact: '+526290578762' },
    { name: 'Cascadas Carmesí', address: 'AV LOPEZ PORTILLO SN', capacity: '10-50', agency: 'Agencia Devon', contact: '663 406 4625' },
    { name: 'Festive Flair Events', address: 'Patricio Sáinz 14, Col. Del Valle', capacity: '10-50', agency: 'Agencia Devon', contact: '+529165417785' },
    { name: 'Grand Event', address: '16 DE SEPBRE NO. 513 S/N', capacity: '10-50', agency: 'Agencia Devon', contact: '+528886900400' },
    { name: 'Celebration Strands', address: 'AV MORELOS SUR NO. 114', capacity: '10-50', agency: 'Agencia Devon', contact: '315 799 5554' },
    { name: 'The After Party Blowout', address: 'FRAY SERVANDO T DE MIER SN', capacity: '10-50', agency: 'Agencia Devon', contact: '588 482 3639' },
  ];
}
