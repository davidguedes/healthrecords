import React, {Component} from 'react';
import {View} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {Dialogflow_V2} from 'react-native-dialogflow';

import {dialogflowConfig} from './env';

const botAvatar = require('./assets/images/robo.png');

const BOT = {
  _id: 2,
  name: 'Mr. BotHealth',
  avatar: botAvatar,
};

class App extends Component {
  state = {
    messages: [
      {
        _id: 2,
        text: 'Meu nome é Mr. Health 🤖',
        createdAt: new Date(),
        user: BOT,
      },
      {_id: 1, text: 'Olá!', createdAt: new Date(), user: BOT},
    ],
    id: 1,
    name: '',
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_PORTUGUESE_BRAZIL,
      dialogflowConfig.project_id,
    );
  }

  handleGoogleResponse(result) {
    console.log('result: ', result);
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];

    this.sendBotResponse(text);
  }

  sendBotResponse(text) {
    let binaryOpt = 'binary-opt';
    let qualityOpt = 'quality-opt';
    let specialtyOpt = 'specialty-opt';
    let msg;

    /*if (text == 'tavel') {
      msg = {
        _id: this.state.messages.length + 1,
        text,
        image: 'https://www.state.gov/wp-content/uploads/2020/11/shutterstock_186964970-scaled.jpg',
        createdAt: new Date(),
        user: BOT,
      };
    } else */
    if (text.indexOf(binaryOpt) != -1) {
      text = text.replace(binaryOpt, '');

      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: [
            {
              title: 'Sim',
              value: 'Sim',
              bColor: '#005C23',
              bgColor: '#005C23',
            },
            {
              title: 'Não',
              value: 'Não',
              bColor: '#5C0000',
              bgColor: '#5C0000',
            },
          ],
        },
        user: BOT,
      };

      console.log('Valor de mensagem: ', msg);
    } else if (text.indexOf(specialtyOpt) != -1) {
      text = text.replace(specialtyOpt, '');

      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: [
            {
              title: 'Ortopedista',
              value: 'Ortopedista',
              bColor: '#FF5DE4',
              bgColor: '#FF5DE4',
            },
            {
              title: 'Cardiologista',
              value: 'Cardiologista',
              bColor: '#FFE25C',
              bgColor: '#FFE25C',
            },
            {
              title: 'Dermatologista',
              value: 'Dermatologista',
              bColor: '#009665',
              bgColor: '#009665',
            },
            {
              title: 'Pediatra',
              value: 'Pediatra',
              bColor: '#00B3FF',
              bgColor: '#00B3FF',
            },
            {
              title: 'Ginecologista',
              value: 'Ginecologista',
              bColor: '#FF0097',
              bgColor: '#FF0097',
            },
            {
              title: 'Urologista',
              value: 'Urologista',
              bColor: '#547735',
              bgColor: '#547735',
            },
            {
              title: 'Clínico Geral',
              value: 'Clínico Geral',
              bColor: '#005E7A',
              bgColor: '#005E7A',
            },
          ],
        },
        user: BOT,
      };

      console.log('Valor de mensagem: ', msg);
    } else if (text.indexOf(qualityOpt) != -1) {
      text = text.replace(qualityOpt, '');

      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: [
            {
              title: 'Bom',
              value: 'Bom',
              bColor: '#005C23',
              bgColor: '#005C23',
            },
            {
              title: 'Regular',
              value: 'Regular',
              bColor: '#B3A700',
              bgColor: '#B3A700',
            },
            {
              title: 'Ruim',
              value: 'Ruim',
              bColor: '#5C0000',
              bgColor: '#5C0000',
            },
          ],
        },
        user: BOT,
      };

      console.log('Valor de mensagem: ', msg);
    } else {
      msg = {
        _id: this.state.messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT,
      };
    }

    this.setState(previouseState => ({
      messages: GiftedChat.append(previouseState.messages, [msg]),
    }));
  }

  onSend(messages = []) {
    this.setState(previouseState => ({
      messages: GiftedChat.append(previouseState.messages, messages),
    }));

    let message = messages[0].text;

    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error),
    );
  }

  onQuickReply(quickReply) {
    let message = quickReply[0].value;

    let msg = {
      _id: this.state.messages.length + 1,
      text: message,
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    };

    console.log('quickReply: ', message);
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg]),
    }));

    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),
      error => console.log(error),
    );
  }

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        textStyle={{right: {color: 'white'}}}
        wrapperStyle={{
          left: {bakgroundColor: 'yellow'},
          right: {bakgroundColor: 'pink'},
        }}
      />
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <GiftedChat
          messages={this.state.messages}
          onSend={message => this.onSend(message)}
          onQuickReply={quickReply => this.onQuickReply(quickReply)}
          renderBubble={this.renderBubble}
          user={{_id: 1}}
        />
      </View>
    );
  }
}

export default App;
