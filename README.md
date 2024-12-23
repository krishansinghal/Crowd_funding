# crowdFunding
steps to setup the code:

# step1:
-Clone or Copy the Github Repository.</br>
-open it in any IDE(like VScode).</br>


# step2:
-Run the followind command in backend and frontend folder separately to install the node module of the project:
    "npm i"

# step3:
-After the succesfull installation of node modules. create the ".env" file in backend and frontend.</br>

-In the backend in ".env" file paste the following code:</br>
for sepolia network:</br>
PRIVATE_KEY= your wallet private key</br>
SEPOLIA_URL= Infura RPC url</br>

for ganache:</br>
WALLET_ADDRESS= your wallet address</br>
-make sure that the default network is set as per your requirement in the"hardhat.config.js" file.</br>

-In the frontend in ".env" file paste the following code:</br>
VITE_CONTRACT_ADDRESS=your contract address after deployment</br>
VITE_PINATA_API_KEY=your pinata api key</br>
VITE_PINATA_API_SECRET= your pinata api secret key</br>
VITE_PINATA_JWT_TOKEN= your pinata jwt token</br>
VITE_IPFS_URL='https://your ipfs gateway url/ipfs'</br>

# step4:
Run the following command in terminal</br>
-To complie the contract: "npx hardhat compile"</br>
-To deploy the contract: "npx hardhat ignition deploy ./ignition/modules/crowdfunding.js"</br>

After the successfull deployment you'll get the contract address. Copy the contract address and paste it in "VITE_CONTRACT_ADDRESS=" in the ".env" file in frontend folder.

# step5:
-Now in the frontend directory run the following command:</br>
"npm run dev"</br>

After this the Dapp is ready to run on local host.


