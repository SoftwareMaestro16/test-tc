import React from 'react';
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Address, beginCell } from '@ton/ton';

function App() {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();

  const sendTon = async () => {
    if (!wallet) {
      alert('Сначала подключите кошелек.');
      return;
    }

    const payload = beginCell()
      .storeUint(0x5, 32)
      .storeAddress(Address.parse("UQC3aNO4krkuA7ZUiF5D6MuG1vfxHUDdoXYV8odp0sJZbqch"))
    .endCell().toBoc().toString('base64')

    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 60, // 60 секунд
      messages: [
        {
          address: 'EQD2x8uU-iwSJBuUVOaF3SWE5jbvYSkg5TUhiBoEp2BhDa8_', // Замените на адрес получателя
          amount: '10000000', // 0.01 TON в нанотонах
          payload
        },
      ],
    };

    try {
      const result = await tonConnectUI.sendTransaction(transaction);
      console.log('Транзакция отправлена:', result);
    } catch (error) {
      console.error('Ошибка при отправке транзакции:', error);
    }
  };

  return (
    <div>
      <TonConnectButton />
      <button onClick={sendTon}>Отправить 0.01 TON</button>
    </div>
  );
}

export default App;