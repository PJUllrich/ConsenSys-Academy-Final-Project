const PhotoRights = artifacts.require("PhotoRights");

contract('PhotoRights', async (accounts) => {

    let instance, hash_random, owner;

    const deploy = async () => {
        instance = await PhotoRights.new();
        owner = await instance.owner();
    };

    const registerImage = async () => {
        await deploy();
        hash_random = randomHash();
        await instance.register(hash_random, {from: owner});
    };

    // This function was taken from the CryptoKitties project
    // https://github.com/dapperlabs/cryptokitties-bounty/blob/master/test/util.js
    const expectThrow = async promise => {
        try {
            await promise;
        } catch (err) {
            const outOfGas = err.message.includes("out of gas");
            const invalidOpcode = err.message.includes("invalid opcode");
            const revert = err.message.includes("revert");
            assert.ok(
                outOfGas || invalidOpcode || revert,
                "Expected throw, got `" + err + "` instead"
            );
            return;
        }
        assert.fail("Expected throw not received");
    };

    describe("CRUD operations on Image", () => {
        beforeEach(registerImage);

        it('should register an image hash', async () => {
            let hash_stored = await instance.registry(0);
            assert.equal(web3.toHex(hash_stored[0]), web3.sha3(hash_random), 'Hashes do not match');
        });

        it('should check registration of image hash', async () => {
            let result = await instance.checkRegistration(hash_random);

            assert.ok(result[0], 'Registration check not successful')
        });

        it('should remove an image registration', async () => {
            let check_registered = await instance.checkRegistration(hash_random);
            await instance.remove(check_registered[1]);

            let check_removed = await instance.checkRegistration(hash_random);
            assert.ok(!check_removed[0], 'Hash was not successfully removed')
        });

        it('should transfer an image ownership', async () => {
            let account_to = accounts[1];

            await instance.transfer(0, account_to);

            let hash_stored = await instance.registry(0);
            assert.equal(account_to, hash_stored[1], 'Hash owner not equal to expected address')
        });
    });

    describe("Contract Modifiers", () => {
        beforeEach(deploy);

        it('should fail to register an empty hash', async () => {
            await expectThrow(
                instance.register('')
            );
        });

        it('should fail if non-owner removes image', async () => {
            await registerImage();
            await expectThrow(
                instance.remove(0, {from: accounts[1]})
            );
        });

        it('should fail if non-existent image is removed', async () => {
            await expectThrow(
                instance.remove(randomInteger(1, 100))
            );
        });

        it('should fail if negative index is used', async () => {
            await expectThrow(
                instance.remove(randomInteger(-1, -100))
            );
        })
    });

    describe("Pausable Contract", () => {
        beforeEach(deploy);

        it('should pause the contract', async () => {
            await instance.pause();

            let isPaused = await instance.paused();
            assert.ok(isPaused, 'Contract not paused successfully');
        });

        it('should unpause the contract', async () => {
            await instance.pause();
            await instance.unpause();

            let isPaused = await instance.paused();
            assert.ok(!isPaused, 'Contract not unpaused successfully');
        });
    });

    describe("Pausable Contract Modifiers", () => {
        beforeEach(deploy);

        it('should fail to register an image when contract is paused', async () => {
            await instance.pause();

            await expectThrow(
                instance.register(randomHash())
            );
        });

        it('should fail to remove an image when contract is paused', async () => {
            await instance.register(randomHash());
            await instance.pause();

            await expectThrow(
                instance.remove(0)
            );
        });

        it('should fail to transfer an image when contract is paused', async () => {
            await instance.register(randomHash());
            await instance.pause();

            await expectThrow(
                instance.transfer(0, accounts[1])
            );
        })
    })
});

function randomHash() {
    return Math.random().toString(36).replace(/[^A-Za-z0-9]+/g, '').substr(0, 64);
}

function randomInteger(min = 0, max = 1) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}