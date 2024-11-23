import { Address, toNano } from '@ton/core';
import { HatJetton } from '../wrappers/HatJetton';
import { NetworkProvider } from '@ton/blueprint';
import { buildOnchainMetadata } from '../utils/jetton-helpers';

export async function run(provider: NetworkProvider) {
    const jettonParams = {
        name: "5DHub-Hat",
        description: "5DHub Hat jetton for Hat application in Telegram market",
        symbol: "5DHa",
        image: "https://static.tildacdn.net/tild3038-6637-4832-b530-643933356137/5dh_logo_b.png",
    };

    // Create content Cell
    let content = buildOnchainMetadata(jettonParams);

    const hatJetton = provider.open(await HatJetton.fromInit(provider.sender().address as Address, content, 1000000000000000000n));

    await hatJetton.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Mint',
            amount: 100000000000000000n,
            receiver: provider.sender().address as Address
        }
    );

    await provider.waitForDeploy(hatJetton.address);

    // run methods on `hatJetton`
}