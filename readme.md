![Foto da tela inicial](./src/img/Capa%20VR%20Timer.png)

# VR Timer ([Link do site](https://viniroveri.github.io/VrTimer/))


## O que é isso?

Um timer focado na prática do Cubo Mágico seguindo as regras oficiais de competições.


## Por que isso?

Pra ter um timer de simples usabilidade e design limpo que ofereça, sem muita complexidade, tudo que é preciso pra prática do esporte.


## Quais desafios eu tive que superar?

- ### Armazenamento de tempos

Os tempos são armazenados mesmo que o usuário feche ou recarregue a página. Pra isso a solução óbvia é usar o `Local Storage`, porém existe um problema que o JavaScript não lê as `entries` de um objeto na ordem, tornando impossível o display dos tempos da forma que eu queria. Por tanto a solução que eu encontrei foi criar um `State` que consiste em um `Array` com os tempos, e ler este `Array` pra ter todos os tempos armazenados e mostrados na ordem. E por fim, pra que os tempos não se percam ao recarregar a página, cada vez que um tempo é adicionado no `Array` eu crio uma cópia deste `Array` no `Local Storage` usando um `JSON.parse` deste como `value`, assim os tempos ficam armazenados no navegador e eu posso fazer o processo inverso cada vez que o usuário abre a página pra recriar o `Array` de tempos, puxando o valor do `Local Storage`, para o site voltar a funcionar normalmente.


- ### Comandos individuais pra cada tempo

Ao clicar em cada tempo são mostrados em um pop-up: o tempo, o embaralhamento, a data que ele foi feito e opções como adicionar uma penalidade ou excluí-lo. Pra isso eu precisei criar um pop-up genérico e cada vez que um tempo fosse clicado passar ao pop-up suas informações via `props`. Pra isso ser possível eu fiz com que na confecção de cada tempo fosse criado um `Objeto` que herda uma `Classe` que armazena cada uma das informações a serem demonstradas e/ou alteradas.


- ### Calculo automático de médias

As médias (exceto a Geral) são calculada usando as regras oficiais das competições, onde o melhor e pior tempo são ignorados e é feita uma média dos que sobrarem. A lógica de calculo só envolve a matemática básica e a manipulação do array de tempos, o real desafio foi fazer o display das médias atualizar cada vez que um tempo fosse adicionado, removido ou modificado. Pra isso eu usei o `useEffect` pra acompanhar cada vez que o `Array` ou um tempo específico fosse alterado, e executar os comandos de calculo de médias.


- ### Timer que funciona tanto no teclado quanto no touch screen

Pra não ter repetição de código eu criei um função genérica que identifica em qual momento o timer está (Antes de iniciar, durante inspeção, durante tempo ou após término) e toma a ação correta baseada nisso. O próximo passo foi encontrar um ponto comum entre o teclado e o touch screen, e após muitos teste a melhor correspondência que eu encontrei foi o `onkeyup/onkeydown` pro teclado e o `onTouchStart/onTouchEnd` para o touch screen. Após isso apenas adicionei a função genérica criada a cada um desses eventos com alguns pequenos ajustes que eu julguei necessários e o cronômetro já funcionava 100%.


- ### Gerador de embaralhamentos

Este desafio foi separado em duas etapas, a primeira era descobrir como computadores geram embaralhamentos, e a segunda replicar isto. O desafio se tornou maior por não ter na internet nenhum gerador de embaralhamento escrito em JavaScript para eu me basear, por isso eu fui atrás de entender a lógica teórica por trás de toda a geração, e com minhas própias palavras (ou meus própios códigos) eu consegui recriar perfeitamente os geradores usados profissionalmente.