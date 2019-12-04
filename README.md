# Necessidade a ser resolvida
Desafio:

Tela inicial de Login

Mostrar os campos e-mail e senha, e um botão ENTRAR. Ao clicar em ENTRAR, realizar a autenticação via API:

Tela principal (Logado)

A tela principal do app, será um mapa (google maps ou mapbox), e o usuário poderá realizar 2 tipos de ações: Adicionar Anotações de Campo, e sincronizar os dados com a API.

Crie um menu ou algum mecanismo de navegação para que o usuário possa criar suas Anotações de Campo, visualizar os pontos das anotações no mapa e, posteriormente, sincronizar todos os dados com a API.

Criar anotações de campo

Para criar uma anotação de campo, o usuário precisa digitar um texto, com a opção de Cancelar ou Salvar.

Ao salvar o texto, pegar a localização de GPS do app e a data/hora do momento; Salvar no banco local do app e voltar para o Mapa. Esta operação de Adicionar deve funcionar 100% ofﬂine, onde o usuário pode registrar anotações sem ter sinal de internet.

Exibição dos dados no Mapa

Para cada anotação registrada pelo usuário, deve ser exibido um pino no mapa, no ponto exato da localização capturada no momento em que a anotação foi registrada.

Os pinos de anotações já sincronizadas (já enviadas para api com retorno de sucesso) , devem ser pintados de verde, e os pinos de anotações não sincronizadas, devem ser pintados de amarelo.

Os pinos do mapa devem ser exibidos mesmo que não tenha internet, e que o fundo do mapa não mostre a imagem de satélite do google/mapbox.

Sincronizar

Ao tocar em sincronizar, demonstrar para o usuário que a sincronização está em andamento, e executar o seguinte procedimento:

Para cada Anotação registrada e que ainda não tenha sido sincronizada, enviar um post para a API.

Não enviar anotações já sincronizadas.

Aguardar o retorno de sucesso e sinalizar em verde o ponto da Anotação de Campo no mapa.

# Especificação técnica

#### 1 - Tela de Login

 Tela inicial de login com e-mail e senha com armazenamento do token.

#### 2 - Autenticação

Visando que será utilizado da api para autenticação de usuários via aplicativo foi escolhido a tecnologia Json Web Token.
Sua facilidade em autenticar varios clientes e não ter a complexidade de armazenar tokens no banco de dados.

#### 3 - Tela principal

Foi utilizado a ferramenta MapBox para visualização de pontos marcados no mapa e localização atual do usuário.
Solução escolhida pela facilidade de utilização e configuração, além de ter um ótimo desempenho.

#### 4 - Criação de anotações de campo

Implementado uma pagina para realizar anotações.
No momento do envio é gravado em uma base local no dispositivo do usuário e enviado para a api caso tenha conexão.

#### 5 - Exibição de dados no Mapa

As anotações enviadas para a api são gravadas localmente com uma indicação sinalizando que está sincronizada, essa indicação diferencia a cor dos pontos no mapa.

* Verde(Anotação sincronizada);
* Amarelo(Anotação ainda não sincronizada);

Com um clique nos pontos é aberto uma tela com as informações da anotação.

#### 6 - Sincronização

Os dados são sincronizados com a api na tela 'Sincronizar', após a solicitação é feito uma busca na base local com todas as anotações sinalizadas com sincronização negativa.
Após o envio, todas as anotações são sinalizadas como sincronizadas. Não é feito o envio de anotações já sincronizadas.

#### 7 - Redux e Redux-saga

Foi utilizado as ferramentas redux e redux saga para realizar o gerencimento do estado na aplicação, tal solução foi de muita utilidade para gravar os dados de autenticação do usuário.

[React-redux](https://github.com/reduxjs/react-redux)
[Redux-saga](https://github.com/redux-saga/redux-saga)

#### 8 - RealmJS (Banco de dados)

Utilizado a ferramenta Realm para banco de dados móvel, devido a sua fácil utilizada e manipulação de dados offline foi escolhido essa solução para armazenamento de anotações quando não á conexão com a internet.

[Realm](https://realm.io/)

## Configuraçes do ambiente

* React-native version: 0.59.4

* Node version: v8.16.2

## Ambiente de desenvolvimento

* Clone este repositorio

* Set as variaveis de ambiente no arquivo .env

    `URL_API=Endereco da api`

    `MAP_BOX_TOKEN=Map box token`

* Rode `yarn install`, instalação de todas as dependências.
     
    Link de Dependências nativas:
    
    `react-native link @mapbox/react-native-mapbox-gl`
    
    `react-native link @react-native-community/async-storage`
    
    `react-native link @react-native-community/geolocation`
    
    `react-native link @react-native-community/netinfo`
    
    `react-native link react-native-gesture-handler`
    
    `react-native link react-native-reanimated`
    
    `react-native link react-native-vector-icons`
    
    `react-native link realm`
    
    ### iOS
      
    1. Rode `pod install` em `FieldNoteMobile/ios`
    2. Inicie a aplicação com `react-native run-ios`
    
    ### Android
    
    1. Inicie a aplicação com `react-native run-android`

