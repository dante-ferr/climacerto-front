"use client"

import styles from "./firstpage.module.scss";
function anotherpage() {
  alert("abacaxi");
}
export default function Firstpage() {
  return (
    <>
      <div className={styles.upperPart}>
        <h1 className={styles.upperPart}>ClimaCerto</h1>
        <h4>Planejamento Inteligente de Atividades ao Ar Livre</h4>
        <h5>
          Desenvolvido com dados de observação da Terra da Nasa para o Hackathon
          Brasil
        </h5>
        <button onClick={anotherpage}>Começar análise climática</button>
      </div>
      <div className={styles.middle_upperPart}>
        <div className={styles.grid}>
          <div className={styles.middlePart_square}>
            <h4>Dados da nasa</h4>
            <p>
              Utilizamos dados históricos de observação da Terra da Nasa para
              análise precisa
            </p>
          </div>
          <div className={styles.middlePart_square}>
            <h4>Probablidades climáticas</h4>
            <p>
              Calcule as Probablidades de condições adversas para seu local e
              data
            </p>
          </div>
          <div className={styles.middlePart_square}>
            <h4>Múltiplas Variáveis</h4>
            <p>
              Analise temperatura, precipitação, vento, umidade e qualidade do
              ar
            </p>
          </div>

          <div className={styles.middlePart_square}>
            <h4>Qualquer Localização</h4>
            <p>Selecione qualquer ponto no mapa ou digite o nome do local</p>
          </div>
          <div className={styles.middlePart_square}>
            <h4>Tendências Históricas</h4>
            <p>Veja como as condições mudaram ao longo das décadas</p>
          </div>
          <div className={styles.middlePart_square}>
            <h4>Sugestões Inteligentes</h4>
            <p>
              IA recomenda locais alternativos quando o clima não está ideal
            </p>
          </div>
        </div>
      </div>
      <div className={styles.bottomPart_square}>
        <h4>Sobre o projeto</h4>
        <p>
          O ClimaCerto utiliza décadas de dados de observação da Terra da NASA
          para fornecer informações sobre a probabilidade de condições
          climáticas específicas em qualquer localização e época do ano
        </p>
        <p>
          Diferente de previsões meteorológicas, nosso sistema analisa dados
          históricos para determinar as chances de condições extremas como:
          calor intenso, frio extremo, ventors fortes, chuvas intensas ou
          condições desconfortáveis
        </p>
        <b>
          Planeje suas atividades ao ar livre com confiança, sabendo exatamente
          quais são as probabilidade climáticas para o local e data escolhidos.
        </b>
      </div>
    </>
  );
};
