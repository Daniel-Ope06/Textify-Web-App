import { Component, OnInit, Renderer2 } from '@angular/core';
import { TextifyService } from 'src/app/services/textify.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  textInput: string = "";
  characterInput: string = "";
  textOutput: string = "";
  isAlertHidden = true;

  constructor(private renderer: Renderer2) { 
    this.textOutput = TextifyService.convertWord("TEXTIFY", "*::*");
  }

  ngOnInit(): void {
  }

  clipBoardCopy(): void{
    const content1 = document.createElement("textarea");
    content1.style.position = "fixed";
    content1.style.left = "0";
    content1.style.top = "0";
    content1.style.opacity = "0";
    content1.value = this.textOutput;
    document.body.appendChild(content1);
    content1.focus();
    content1.select();
    document.execCommand("copy")
    document.body.removeChild(content1);
    this.showCopiedAlert();
  }

  async showCopiedAlert(): Promise<void>{
    this.isAlertHidden = false;
    await this.delay(2000);
    this.isAlertHidden = true;
  }

  async delay(ms: number): Promise<void> {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms));
  }

  submit(): void {
    if (this.characterInput.length == 0 && this.textInput.length == 0){
      this.textOutput = TextifyService.convertWord("TEXTIFY", "*::*");
    }
    else if (this.characterInput.length == 0 && this.textInput.length > 0){
      this.textOutput = TextifyService.convertWord(this.textInput, "*::*");
    }
    else if (this.characterInput.length == 4 && this.textInput.length == 0){
      this.textOutput = TextifyService.convertWord("TEXTIFY", this.characterInput);
    }
    else if (this.validateInput()) {
      this.textOutput = TextifyService.convertWord(this.textInput, this.characterInput);
    }
  }

  validateInput(): boolean {
    if (this.characterInput.length > 0 && this.characterInput.length < 4){
      alert("There must be 4 characters to draw with")
      return false;
    }
    return true;
  }
}
