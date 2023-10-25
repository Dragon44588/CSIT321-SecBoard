from block import *
from datacon import *
import sys
import json

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
            #print(block)
            blocks.append(block)
    
    #builds all the correction chain blocks and adds them to a list
    for i in chain.correctionList:
        if not i:
            print("block doesnt exist")
            cBlocks.append(None)
        else:
            block = {"Previous hash": i.previousHash, "Data": i.data, "Proof of work": i.proofOfWork, "Election hash": i.electionHash, "Standard head hash": i.standardHeadHash, "Successor hash": i.successorHash, "Block replace number": i.blockReplaceNumber}
            print(block)
            cBlocks.append(block)    
            
    #creates the full object with both chains and converts it to json
    jsonchain = json.dumps({"Main chain":blocks, "Correction chain": cBlocks}, indent=4)
    
    #writes the data to the database
    #with open("database.JSON", 'w', encoding='utf-8') as data:
    #    data.write(jsonchain)
    with open("../secboardfront/public/files/database.JSON", 'w', encoding='utf-8') as data:
        data.write(jsonchain)


# Step 1: Load existing chain from JSON file
# uncomment the following for use in node js
chainFile = open('../secboardfront/public/files/database.JSON')

# uncomment the following for IDLE debugging
#chainFile = open('database.JSON')

chainData = json.load(chainFile)

testChain = standardChain() # initialise standard chain

# load standard blocks
counter = 0
for i in chainData['Main chain']:
    if counter == 0: # skip stored genesis hash
        counter += 1
        continue
    if i == None:
        print('null')
        testChain.loadNullBlock()
        continue
    print(i['Data'])
    testChain.loadStandardBlock(str(i['Previous Hash']), str(i['Data']), str(i['Proof of work']), str(i['Correction hash']))

# load correction blocks
counter = 0
for i in chainData['Correction chain']:
    print(i['Data'])
    testChain.loadCorrectionBlock(str(i['Previous hash']), str(i['Data']), str(i['Proof of work']), str(i['Election hash']), str(i['Standard head hash']), str(i['Successor hash']), str(i['Block replace number']))

chainFile.close()




# Step 2: Create the new block to add to the chain
print ("Number of arguments:", len(sys.argv), "arguments")
print ("Argument List:", str(sys.argv))
testChain.createStandardBlock(sys.argv[1])
#testChain.createStandardBlock("testing code")

# Step 3: Update the JSON file with the new block
WriteMainChain(testChain)
print('block added')

