# libraries
from solcx import compile_source, install_solc
from web3 import Web3
import json

install_solc("0.8.0")  # compiler version

# connection
ganache_url = "http://127.0.0.1:7545"
web3 = Web3(Web3.HTTPProvider(ganache_url))
web3.eth.default_account = web3.eth.accounts[0]

#read contract
with open("app/blockchain/MedicalRecord.sol", "r") as file:
    source_code = file.read()

compiled_sol = compile_source(source_code, solc_version="0.8.0")
contract_id, contract_interface = compiled_sol.popitem()
bytecode = contract_interface['bin']
abi = contract_interface['abi']

#deploy
MedicalRecord = web3.eth.contract(abi=abi, bytecode=bytecode)
tx_hash = MedicalRecord.constructor().transact()
tx_receipt = web3.eth.wait_for_transaction_receipt(tx_hash)

contract_address = tx_receipt.contractAddress
print("Contract deployed at:", contract_address)


# save abi + address
with open("app/blockchain/contract_info.json", "w") as f:
    json.dump({
        "address": contract_address,
        "abi": abi
    }, f)
