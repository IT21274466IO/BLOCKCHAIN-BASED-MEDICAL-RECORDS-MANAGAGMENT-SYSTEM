# libraries
from web3 import Web3
import json

# connection
ganache_url = "http://127.0.0.1:7545"
web3 = Web3(Web3.HTTPProvider(ganache_url))
web3.eth.default_account = web3.eth.accounts[0]

# load contract 
with open("app/blockchain/contract_info.json") as f:
    contract_info = json.load(f)

address = contract_info["address"]
abi = contract_info["abi"]

# access contract
contract = web3.eth.contract(address=address, abi=abi)

# store function
def store_record(patient_name, diagnosis, file_path_hash):
    tx_hash = contract.functions.addRecord(patient_name, diagnosis, file_path_hash).transact()
    receipt = web3.eth.wait_for_transaction_receipt(tx_hash)
    return tx_hash.hex()
