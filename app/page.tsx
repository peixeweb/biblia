"use client";
import { useState } from "react";

const questions = [
  { id: 1, question: "Qual foi o primeiro milagre de Jesus?", options: ["Multiplicar pães e peixes", "Curar um cego", "Transformar água em vinho", "Andar sobre as águas"], answer: 2 },
  { id: 2, question: "Quem foi o Pai da fé?", options: ["Abraão", "Moisés", "Davi", "Paulo"], answer: 0 },
  { id: 3, question: "Quantos princípios tem o Credo de Niceia?", options: ["7", "8", "9", "10"], answer: 1 },
  { id: 4, question: "O que é a Shekinah?", options: ["Um anjo", "A presença de Deus", "Um demônio", "Um objeto sagrado"], answer: 1 },
  { id: 5, question: "Qual livro da Biblia tem mais Salmos?", options: ["Salmos", "Isaías", "Gênesis", "Êxodo"], answer: 0 },
  { id: 6, question: "Quantas espécies de animais habían na arca de Noé?", options: ["2 de cada", "7 de cada", "Indefinido", "Nenhuma"], answer: 0 },
  { id: 7, question: "Quantos livros tem o Novo testamento?", options: ["27", "30", "40", "50"], answer: 0 },
  { id: 8, question: "O que significa 'Jeová'?", options: ["O Salvador", "O Eterno", "O Poderoso", "O Rei"], answer: 1 },
  { id: 9, question: "Qual o primeiro livro da Biblia?", options: ["Gênesis", "Êxodo", "Levítico", "Números"], answer: 0 },
  { id: 10, question: "O que é o 'Konós'?", options: ["Uma lei", "Uma ordem", "Uma doença", "Umohan"], answer: 3 },
  { id: 11, question: "Quem escreveu o Salmo 23?", options: ["Davi", "Salomão", "Moisés", "Isaías"], answer: 0 },
  { id: 12, question: "O que é a 'Torá'?", options: ["Os primeiros 5 livros", "O evangelho", "As cartas", "O Apocalipse"], answer: 0 },
  { id: 13, question: "Qual a lingua original do Novo testamento?", options: ["Latim", "Grego", "Hebraico", "Aramaico"], answer: 1 },
  { id: 14, question: "O que é 'Messias'?", options: ["Profeta", "Rei ungido", "Sacerdote", "Anjo"], answer: 1 },
  { id: 15, question: "Quantos anos Jesus viveu?", options: ["30 anos", "33 anos", "35 anos", "40 anos"], answer: 1 },
  { id: 16, question: "O que é a Eucaristia?", options: ["Um sacramento", "Uma oração", "Um jejum", "Uma festa"], answer: 0 },
  { id: 17, question: "Quantos dias durou odilúvio?", options: ["30", "40", "50", "60"], answer: 1 },
  { id: 18, question: "Quem foi o primeiro homem?", options: ["Adão", "Abel", "Noé", "Enoc"], answer: 0 },
  { id: 19, question: "O que significa 'Aleluia'?", options: ["Deus太好了", "Povo de Deus", "Louvai ao Senhor", "Amém"], answer: 2 },
  { id: 20, question: "Qual livro começa com 'No princípio'?", options: ["Êxodo", "Gênesis", "Levítico", "Números"], answer: 1 },
  { id: 21, question: "Quantas pragas teve no Egito?", options: ["7", "9", "10", "12"], answer: 2 },
  { id: 22, question: "O que é o Shabat?", options: ["Um jejum", "Um dia santo", "Uma festa", "Uma oração"], answer: 1 },
  { id: 23, question: "Quantos mandamentos existem?", options: ["7", "8", "9", "10"], answer: 3 },
  { id: 24, question: "Quem cantou para as aguas do mar vermelho?", options: ["Davi", "Moisés", "Aarão", "Josué"], answer: 1 },
  { id: 25, question: "O que é o 'Pão da Presença'?", options: ["Pão comum", "Pão da proposição", "Pão ázimo", "Pão sagrado"], answer: 1 },
  { id: 26, question: "O que é a 'Glória de Deus'?", options: ["O templo", "A Shekinah", "O credo", "A biblia"], answer: 1 },
  { id: 27, question: "Qual anjo anunciou o nascimento de Jesus?", options: ["Gabriel", "Miguel", "Rafael", "Uriel"], answer: 0 },
  { id: 28, question: "O que é o 'Cálice'?", options: ["Um prato", "Uma taça", "Um kalice", "Um objeto"], answer: 1 },
  { id: 29, question: "Qual o livro mais curto da Biblia?", options: ["Filémon", "Judas", "2 João", "Todas"], answer: 3 },
  { id: 30, question: "O que é 'Evangelho'?", options: ["Uma historia", "Boas novas", "Um salmo", "Uma lei"], answer: 1 },
  { id: 31, question: "Quantos profetas mayores ha?", options: ["4", "5", "6", "7"], answer: 1 },
  { id: 32, question: "O que é 'Apocalipse'?", options: ["Revelação", "Destruição", "Criação", "Paz"], answer: 0 },
  { id: 33, question: "Quem foi decapitado?", options: ["João Batista", "Pedro", "Paulo", "Estêvão"], answer: 0 },
  { id: 34, question: "Quantas этаvas de fé ha?", options: ["3", "5", "7", "9"], answer: 2 },
  { id: 35, question: "O que é a 'Graça'?", options: ["Um dom", "Um pecado", "Uma lei", "Uma obra"], answer: 0 },
  { id: 36, question: "Em que lingua foi escrito o'Antigo testamento'?", options: ["Grego", "Latim", "Hebraico", "Aramaico"], answer: 2 },
  { id: 37, question: "O que é a 'Fé'?", options: ["Crença", "Dúvida", "Sabença", "Poder"], answer: 0 },
  { id: 38, question: "Quantos livros tem a Biblia?", options: ["46", "60", "66", "73"], answer: 2 },
  { id: 39, question: "Quem foi o último rei de Israel?", options: ["Saul", "Davi", "Salomão", "Oséias"], answer: 2 },
  { id: 40, question: "O que é 'Satanás'?", options: ["Um demônio", "Um anjo caído", "Um falso deus", "Um homem"], answer: 1 },
  { id: 41, question: "Quantos filhos Jacó teve?", options: ["10", "11", "12", "13"], answer: 2 },
  { id: 42, question: "O que é o 'Batismo'?", options: ["Casamento", "Unção", "Mergulho", "Sacramento"], answer: 2 },
  { id: 43, question: "Quantos livros tem o Pentateuco?", options: ["5", "6", "7", "8"], answer: 0 },
  { id: 44, question: "Quem compôs o hino 'Amazing Grace'?", options: ["John Newton", "Charles Wesley", "Martin Luther", "Isaac Watts"], answer: 0 },
  { id: 45, question: "O que é a 'Cruz'?", options: ["Um símbolo", "Um martírio", "O instrumento da salvação", "Uma arma"], answer: 2 },
  { id: 46, question: "Quantos Salmos são?", options: ["50", "100", "150", "200"], answer: 2 },
  { id: 47, question: "O que é o 'Espírito Santo'?", options: ["Um poder", "Uma pessoa", "Uma força", "Um anjo"], answer: 1 },
  { id: 48, question: "Qual o primeiro milagre de Jesus?", options: ["Curar um paralítico", "Multiplicar pães", "Curar um cego", "Andar sobre as águas"], answer: 1 },
  { id: 49, question: "O que é a 'Ressurreição'?", options: ["Morte", "Vida após a morte", "Nascimento", "Casamento"], answer: 1 },
  { id: 50, question: "Quantas mulheres acompañaron aJesus?", options: ["1", "2", "3", "Nenhuma"], answer: 3 },
];

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
    setShowResult(true);
    
    if (optionIndex === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setShowScore(true);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (showScore) {
    return (
      <main>
        <div className="quiz-container">
          <div className="score-section">
            <h2>O Grande Colapso</h2>
            <p>Você acertou {score} de {questions.length} perguntas!</p>
            <p className="score-message">
              {score >= 40 ? "Você é um verdadeiro专家 da Bíblia!" :
               score >= 30 ? "Muito bem! Você conhece bem as Escrituras!" :
               score >= 20 ? "Bom trabalho! Continue estudando!" :
               "Estude mais a Bíblia e tente novamente!"}
            </p>
            <button onClick={resetQuiz} className="reset-button">
              Jogar Novamente
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="quiz-container">
        <div className="question-section">
          <h2 className="quiz-title">O Grande Colapso</h2>
          <div className="question-count">
            <span>Pergunta {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div className="question-text">
            {questions[currentQuestion].question}
          </div>
        </div>
        
        <div className="answer-section">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showResult}
              className={`answer-button ${
                showResult 
                  ? index === questions[currentQuestion].answer 
                    ? "correct" 
                    : selectedAnswer === index 
                      ? "wrong" 
                      : ""
                  : ""
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="score-display">
          Pontuação: {score}
        </div>
      </div>
    </main>
  );
}