import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { HatJetton } from '../wrappers/HatJetton';
import '@ton/test-utils';

describe('HatJetton', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let hatJetton: SandboxContract<HatJetton>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        hatJetton = blockchain.openContract(await HatJetton.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await hatJetton.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: hatJetton.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and hatJetton are ready to use
    });
});