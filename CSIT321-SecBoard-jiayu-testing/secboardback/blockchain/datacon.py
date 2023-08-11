import json
import block

#test
#reads the chain from the database
def readChain():
    with open('database.json', 'r', encoding='utf-8') as database:
        data = json.load(database)
        return data

#writes the chains to the database
def WriteMainChain(chain):
    blocks = []
    cBlocks = []
    
    #builds all the main chain blocks and adds them to a list
    for i in chain.chainList:
        if not i:
            print("block doesnt exist")
            blocks.append(None)
        else:
            block = {"Previous Hash":i.previousHash, "Data": i.data, "Proof of work": i.proofOfWork, "Correction hash": i.correctionHash}
            print(block)
            blocks.append(block)
    
    #builds all the correction chain blocks and adds them to a list
    for i in chain.correctionList:
        if not i:
            print("block doesnt exist")
            cBlocks.append(None)
        else:
            block = {"Previous hash": i.previousHash, "Data": i.data, "Proof of work": i.proofOfWork, "Election hash": i.electionHash, "Standard head hash": i.standardHeadHash, "Successor hash": i.successorHash}
            print(block)
            cBlocks.append(block)    
            
    #creates the full object with both chains and converts it to json
    jsonchain = json.dumps({"Main chain":blocks, "Correction chain": cBlocks}, indent=4)
    
    #writes the data to the database
    with open("database.JSON", 'w', encoding='utf-8') as data:
        data.write(jsonchain)