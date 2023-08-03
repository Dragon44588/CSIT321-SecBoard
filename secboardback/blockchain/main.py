from block import *
from datacon import *
import sys

if __name__ == "__main__": # apparently this is cool

    #Function testing shenanigans
    testChain = standardChain()
    testChain.createStandardBlock("Hello world!")
    testChain.createStandardBlock("another message")
    testChain.createStandardBlock('test 3')
    testChain.createStandardBlock('test 4')
    print(testChain)
    testChain.validateChain()
    
    #Election
    print()
    print("========================")
    print("ELECTION TESTING")
    testElectionHash = 'test election'
    newElection = testChain.createElection('corrected message', 2)
    print("========================")
    testChain.processElection(newElection)
    print("========================")
    print()
    # note to self: a correction block cannot be created until the election succeeds

    #Correction Chain
    testChain.createCorrectionBlock('New message!', testElectionHash, 2)
    testChain.createCorrectionBlock('New message 2!', testElectionHash, 5)
    #testChain.printCorrectionList()

    testChain.createStandardBlock('test 5')
    
    #Print chain after corrections
    #print("========================")
    #print("NEW BLOCKCHAIN")
    #print("========================")
    #testChain.printTrueList()
    
    #Write changes to the database (this should be put after every block is created probably)
    #WriteMainChain(testChain)

    testChain.validateChain()

    outputToNodeTest = "This string was sent from the python script."
    print(outputToNodeTest)
    sys.stdout.flush()
    
