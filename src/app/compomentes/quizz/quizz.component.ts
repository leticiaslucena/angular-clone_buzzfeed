import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {
  title: string = ""

  questions: any  //primeiras perguntas que está no json
  questionSelected: any

  answers: string[] = [] //respostas do questionário
  answerSelected: string =""

  questionIndex: number = 0
  questionMaxIndex: number =0

  finished: boolean = false

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){ 
      this.finished = false
      this.title =  quizz_questions.title  //titulo do quastionário
    
    //salvar 
    this.questions = quizz_questions.questions
    this.questionSelected = this.questions[this.questionIndex]
    
      //configurar os ponteiros
      this.questionIndex = 0
      //pegar a posição maxima de questões
      this.questionMaxIndex = this.questions.length

  }
   
  }

  //ao clicar ele irar armazenar a resposta
  playerChoose(value: string){
    this.answers.push(value)
    this.nextStep()
  }

    //criação de um novo comonda para partir para próxima pergunta ou exibir o resultado
    async nextStep(){
      this.questionIndex+=1

      if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questions[this.questionIndex]
      }else {
        //constante para resposta final
        const finalAnswer:string = await this.checkresult(this.answers)
        this.finished = true
        this.answerSelected = quizz_questions.results [finalAnswer as keyof typeof quizz_questions.results]
      }
    }
     

    async checkresult(answers:string[]) {
     
      const resultado = answers.reduce((previous, current, i ,arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length 
        ){
            return previous
        }else{
            return current
        }
      })
      return resultado
    }

}
