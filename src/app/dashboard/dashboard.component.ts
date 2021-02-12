import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  formCalculadora: FormGroup;
  resultado;
  constructor() { }

  ngOnInit(): void {

    this.formCalculadora = new FormGroup(
      {
        valor1 : new FormControl(null, Validators.required),
        valor2 : new FormControl(null, Validators.required),
        operador : new FormControl(null, Validators.required)
      }
    );
  }

  calcular(){
    this.resultado = "";

    if(this.formCalculadora.valid){
      let valor1 = this.passarParaDecimal(this.formCalculadora.value.valor1);
      let valor2 = this.passarParaDecimal(this.formCalculadora.value.valor2);
      let operador = parseInt(this.formCalculadora.value.operador,10);

      if(this.validaValor(valor1,1) && this.validaValor(valor2,2)){
        switch(operador){
          case 1:
            this.resultado = valor1 + valor2;
          break;

          case 2:
            if(valor1 >= valor2)
              this.resultado = valor1 - valor2;
            else
              this.resultado = "Valor1 deve ser maior que Valor2"
          break;

          case 3:
            this.resultado = valor1 * valor2;
          break;

          case 4:
            if(valor2 <= 0){
              this.resultado = "Operação ilegal"
            }else
            this.resultado = valor1 / valor2;
          break;

          case 5:
            this.resultado = valor1 % valor2;
          break;

          default:
            this.resultado = "Operação Ilegal";
            break
        }
      }
      if(!isNaN(this.resultado)){
        this.resultado = this.passarParaBinario(Math.round(this.resultado));
      }
    }
  }

  passarParaBinario(valor){
    return valor.toString(2).padStart(8, '0');
  }

  passarParaDecimal(valor){
    return parseInt(valor, 2);
  }

  onKeyPressValidator(element){
      return element.keyCode === 8 || element.keyCode === 46 ? true : !isNaN(Number(element.key)) && (Number(element.key) == 0 || Number(element.key) == 1);
  }

  validaValor(valor, posicao){
    if(valor > 255 || valor < 0){
      this.resultado += "Valor "+posicao+"inválido. Informe um valor de 0 a 255"
      return false;
    }
    return true;
  }
}


