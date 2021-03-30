import {Component, OnInit} from '@angular/core';
import {MessageService} from 'primeng/api';

declare var solver: any;

@Component({
  selector: 'app-lp-solver-test',
  templateUrl: './lp-solver-test.component.html',
  styleUrls: ['./lp-solver-test.component.css']
})
export class LpSolverTestComponent implements OnInit {

  constructor(public messageService: MessageService) {
  }


  readonly probleme = {
    variables: {
      s1: {
        p1: 5,
        p2: 8,
        p3: 5,
        benefice: 4.2
      },
      s2: {
        p1: 7,
        p2: 3,
        p3: 8,
        benefice: 5.1
      }
    },
    ints: {s1: 1, s2: 1},
    binaries: {},
    constraints: {
      p1: {max: 200},
      p2: {max: 250},
      p3: {max: 220}
    },
    opType: 'max',
    optimize: 'benefice'
  };

  readonly sacAdoc = {
    variables: {
      O1: {
        weight: 12,
        profit: 10
      },
      O2: {
        weight: 11,
        profit: 10
      },
      O3: {
        weight: 7,
        profit: 15
      },
      O4: {
        weight: 25,
        profit: 32
      },
      O5: {
        weight: 10,
        profit: 7
      },
      O6: {
        weight: 5,
        profit: 7
      },
    },
    ints: {},
    binaries: {
      O1: 1,
      O2: 1,
      O3: 1,
      O4: 1,
      O5: 1,
      O6: 1
    },
    constraints: {
      weight: {
        max: 40
      }
    },
    opType: 'max',
    optimize: 'profit'
  };

  ngOnInit(): void {
  }

  resolutionProbleme(): void {
    const resultat = solver.Solve(this.probleme);
    console.log(resultat);
    const nbS1 = resultat.s1;
    const nbS2 = resultat.s2;
    const beneficeTotal = resultat.result;
    const affiche = `Solution : Sachets S1 :  ${nbS1}, Sachets S2 : ${nbS2}, Bénéfice : ${beneficeTotal}`;
    this.messageService.add({
      key: 'main',
      severity: 'info',
      detail: `${affiche}`,
    });
  }


  resolutionSacADos(): void{
    const resultat = solver.Solve(this.sacAdoc);
    console.log(resultat);
    let message = '[';
    if (resultat.O1) { message += 'Objet 1,'; }
    if (resultat.O2) { message += 'Objet 2,'; }
    if (resultat.O3) { message += 'Objet 3,'; }
    if (resultat.O4) { message += 'Objet 4,'; }
    if (resultat.O5) { message += 'Objet 5,'; }
    if (resultat.O6) { message += 'Objet 6,'; }

    message = message.slice(0, -1);
    message += `] Profit: ${resultat.result}`;

    this.messageService.add({
      key: 'main',
      severity: 'info',
      detail: message,
    });
  }

}
