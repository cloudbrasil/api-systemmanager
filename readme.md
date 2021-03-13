### README
<p>Requisitos para uso da API System Manager e ter os acessos para super usuário para chamadas e saber o endereço URI do servidor</p>
<p>Verifique sua versão do nodejs esperamos que tenha a versão v12+ </p>

### COMEÇANDO
<p>Para instalar o pacote primeiro verifique se tens permissão do pacote no NPM caso ainda não tiver fale com Augusto Pissarra e peça liberação.
<p>Tendo a liberação no NPM vamos a instalação e uso do pacote:</p>
1. npm i @docbrasil/api-systemmanager

```javascript
const APISystemManager = require('@docbrasil/api-systemmanager');
const api = new APISystemManager();
```
<p>Feito agora você já pode chamar os methos e fazer a interação com system manager</p>

### API
Abaixo temos o link para documentação da API, [CLIQUE AQUI!](https://github.com/abernardobr/api-systemmanager/blob/develop/doc/api.md)

### Events
Abaixo temos a documentação dos eventos que poder ser escutados com a instâmcia da API.
